# Turnstile-Captcha Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cloudflare Turnstile (Managed-Modus) als Spam-Schutz ins Kontaktformular einbauen — Widget clientseitig, Token-Prüfung serverseitig, Secret-Key ausserhalb des öffentlichen Repos.

**Architecture:** Der Site-Key steht committet in `includes/config.php`; der Secret-Key lebt in der gitignorierten `includes/secrets.php` (per FTP deployt). `kontakt.php` rendert das Widget nur bei gesetzten Keys; `includes/contact-mailer.php` prüft das Token per `siteverify`-API (fail-open bei Netzwerkfehlern, Honeypot bleibt erste Verteidigungslinie).

**Tech Stack:** Plain PHP 8 (Shared Hosting, kein Node.js auf dem Server), cURL/`file_get_contents`, Cloudflare Turnstile.

**Spec:** `docs/superpowers/specs/2026-07-24-turnstile-captcha-design.md`

## Global Constraints

- **Der echte Secret-Key darf in KEINER committeten Datei auftauchen** (öffentliches GitHub-Repo!) — nicht in Code, Doku oder Commit-Messages. In diesem Plan stehen nur Cloudflares offizielle Test-Keys; den echten Key trägt der Controller nach Abschluss lokal in `includes/secrets.php` ein.
- Site-Key (öffentlich, committet): `0x4AAAAAAD8yjwZ_qxxsPN9q`.
- Kill-Switch: Ist `TURNSTILE_SITE_KEY` **oder** `TURNSTILE_SECRET_KEY` leer ⇒ kein Widget, keine Prüfung, Formular exakt wie heute.
- Fail-open: Netzwerkfehler/Timeout/unparsebare Antwort von Cloudflare ⇒ Anfrage durchlassen. Nur fehlendes oder abgelehntes Token ⇒ Fehlermeldung, exakter Text: `Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.`
- Reihenfolge in `handle_contact_form()`: Honeypot → Turnstile → Feld-Validierung → Mailversand.
- Copy Deutsch, Schweizer Register («», "ss" statt "ß").
- PHP ist nicht im PATH: immer `"C:/xampp/php/php.exe"` verwenden (Dev-Server: `"C:/xampp/php/php.exe" -S localhost:3000 scripts/dev-router.php`).
- Kein CSS-Rebuild nötig: `cf-turnstile` ist Cloudflares eigene Hook-Klasse, alle übrigen verwendeten Klassen existieren bereits im Build.
- Cloudflare-Test-Keys für lokale Tests: Site-Key pass `1x00000000000000000000AA`; Secret pass `1x0000000000000000000000000000000AA`; Secret fail `2x0000000000000000000000000000000AA`.
- Commit-Messages: imperativer englischer Einzeiler + Harness-Trailer (Co-Authored-By).

---

### Task 1: Konfiguration und Secrets-Infrastruktur

**Files:**
- Modify: `includes/config.php` (ans Dateiende)
- Create: `includes/secrets.example.php`
- Create: `includes/secrets.php` (wird durch .gitignore NICHT committet)
- Modify: `.gitignore`

**Interfaces:**
- Produces: Konstanten `TURNSTILE_SITE_KEY` (string) und `TURNSTILE_SECRET_KEY` (string, `''` wenn nicht konfiguriert) — von Task 2 (Serverprüfung) und Task 3 (Widget) konsumiert.

- [ ] **Step 1: `includes/config.php` ergänzen**

Ans Ende der Datei anfügen:

```php

// Cloudflare Turnstile (Spam-Schutz Kontaktformular).
// Der Site-Key ist öffentlich (steht im HTML). Der Secret-Key darf NICHT
// committet werden (öffentliches Repo!) und lebt in includes/secrets.php
// (gitignoriert; Vorlage: secrets.example.php, Deployment per FTP).
// Ist einer der beiden Keys leer, sind Widget und Prüfung deaktiviert.
define('TURNSTILE_SITE_KEY', '0x4AAAAAAD8yjwZ_qxxsPN9q');

if (is_file(__DIR__ . '/secrets.php')) {
    require __DIR__ . '/secrets.php';
}
if (!defined('TURNSTILE_SECRET_KEY')) {
    define('TURNSTILE_SECRET_KEY', '');
}
```

- [ ] **Step 2: `includes/secrets.example.php` erstellen**

Kompletter Dateiinhalt:

```php
<?php

/**
 * Vorlage für includes/secrets.php — NICHT ins Git committen!
 *
 * Einrichtung: Diese Datei nach includes/secrets.php kopieren, den echten
 * Turnstile-Secret-Key aus dem Cloudflare-Dashboard eintragen und die
 * Datei per FTP nach httpdocs/includes/ hochladen. includes/secrets.php
 * steht in .gitignore und bleibt dadurch lokal.
 */

define('TURNSTILE_SECRET_KEY', '');
```

- [ ] **Step 3: Lokale `includes/secrets.php` aus der Vorlage anlegen**

Identischer Inhalt wie `secrets.example.php` (Secret bleibt vorerst leer — der Controller trägt den echten Key nach Abschluss ein):

```bash
cp includes/secrets.example.php includes/secrets.php
```

- [ ] **Step 4: `.gitignore` ergänzen**

Ans Ende der Datei anfügen:

```

# Geheime Schlüssel (nur lokal und per FTP auf dem Server)
includes/secrets.php
```

- [ ] **Step 5: Verifikation**

```bash
"C:/xampp/php/php.exe" -l includes/config.php && "C:/xampp/php/php.exe" -l includes/secrets.example.php && "C:/xampp/php/php.exe" -l includes/secrets.php
git status --short   # includes/secrets.php darf NICHT erscheinen (ignoriert)
"C:/xampp/php/php.exe" -r "require 'includes/config.php'; var_export([TURNSTILE_SITE_KEY !== '', TURNSTILE_SECRET_KEY]);"
```
Expected: dreimal `No syntax errors detected`; `git status` zeigt `secrets.php` nicht; PHP-Ausgabe `array (0 => true, 1 => '')`.

- [ ] **Step 6: Commit**

```bash
git add includes/config.php includes/secrets.example.php .gitignore
git commit -m "Add Turnstile config with gitignored secret key file"
```

---

### Task 2: Serverseitige Token-Prüfung in `includes/contact-mailer.php`

**Files:**
- Modify: `includes/contact-mailer.php` (neue Funktion vor `handle_contact_form()`, Aufruf direkt nach dem Honeypot-Block)

**Interfaces:**
- Consumes: `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` aus Task 1.
- Produces: `verify_turnstile(string $token): bool` — `true` bei Erfolg, deaktiviertem Feature oder Cloudflare-Ausfall (fail-open); `false` bei fehlendem oder abgelehntem Token. POST-Feldname des Widgets: `cf-turnstile-response` (von Task 3 erzeugt).

- [ ] **Step 1: Funktion `verify_turnstile()` einfügen**

In `includes/contact-mailer.php` direkt vor `function handle_contact_form(...)` einfügen:

```php
/**
 * Serverseitige Prüfung des Cloudflare-Turnstile-Tokens.
 *
 * Fail-open: Ist Cloudflare nicht erreichbar (Netzwerkfehler, Timeout,
 * unparsebare Antwort), geben wir true zurück – eine verlorene
 * Kundenanfrage wiegt schwerer als eine Spam-Mail, und der Honeypot
 * bleibt als zweite Verteidigungslinie. Nur ein fehlendes oder von
 * Cloudflare abgelehntes Token führt zu false.
 */
function verify_turnstile(string $token): bool
{
    if (TURNSTILE_SITE_KEY === '' || TURNSTILE_SECRET_KEY === '') {
        return true; // Feature deaktiviert (Kill-Switch)
    }
    if ($token === '') {
        return false; // Widget umgangen oder blockiert
    }

    $payload = http_build_query([
        'secret' => TURNSTILE_SECRET_KEY,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $body = false;
    if (function_exists('curl_init')) {
        $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 5,
            CURLOPT_CONNECTTIMEOUT => 5,
        ]);
        $body = curl_exec($ch);
        curl_close($ch);
    } else {
        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $payload,
                'timeout' => 5,
            ],
        ]);
        $body = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    }

    if ($body === false || $body === '') {
        return true; // Fail-open: Cloudflare nicht erreichbar
    }

    $result = json_decode($body, true);
    if (!is_array($result) || !array_key_exists('success', $result)) {
        return true; // Fail-open: unerwartete Antwort
    }

    return $result['success'] === true;
}
```

- [ ] **Step 2: Aufruf in `handle_contact_form()` einbauen**

Direkt nach dem Honeypot-Block (`if (!empty($post['website'])) { … }`) und vor den `$name = trim(...)`-Zeilen einfügen:

```php
    // Turnstile: Captcha-Token serverseitig prüfen (nach Honeypot, vor Validierung).
    if (!verify_turnstile(trim((string) ($post['cf-turnstile-response'] ?? '')))) {
        return ['success' => false, 'error' => 'Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.'];
    }
```

- [ ] **Step 3: Verifikation (Kill-Switch, fehlendes Token, Honeypot-Vorrang)**

Temporäres Test-Script ins Scratchpad-Verzeichnis schreiben (Datei `turnstile-check.php`, kompletter Inhalt):

```php
<?php

// Temporärer Verifikations-Helfer für Task 2 (liegt im Scratchpad, nicht im Repo).
// Aufruf: php turnstile-check.php off|missing|honeypot
$mode = $argv[1] ?? 'off';
define('TURNSTILE_SITE_KEY', $mode === 'off' ? '' : 'sk');
define('TURNSTILE_SECRET_KEY', $mode === 'off' ? '' : 'sec');
define('SITE_NAME', 'x');
define('CONTACT_FROM_EMAIL', 'x@x.ch');
define('CONTACT_TO_EMAIL', 'x@x.ch');
function e(?string $v): string
{
    return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
}
require 'C:/Business/AriMaler/Ari Maler Webside/ari-maler/includes/contact-mailer.php';
if ($mode === 'honeypot') {
    var_export(handle_contact_form(['website' => 'bot']));
} else {
    var_export(verify_turnstile(''));
}
echo "\n";
```

Dann ausführen:

```bash
"C:/xampp/php/php.exe" -l includes/contact-mailer.php
"C:/xampp/php/php.exe" <SCRATCHPAD>/turnstile-check.php off
"C:/xampp/php/php.exe" <SCRATCHPAD>/turnstile-check.php missing
"C:/xampp/php/php.exe" <SCRATCHPAD>/turnstile-check.php honeypot
```
Expected: `No syntax errors detected`; dann `true` (Kill-Switch bei leeren Keys), `false` (Keys gesetzt, Token leer), `array ( 'success' => true, 'error' => NULL, )` (Honeypot greift VOR Turnstile — kein Token nötig, kein Netzwerk-Call).

- [ ] **Step 4: Commit**

```bash
git add includes/contact-mailer.php
git commit -m "Verify Turnstile token server-side in contact form"
```

---

### Task 3: Widget im Formular (`kontakt.php`)

**Files:**
- Modify: `kontakt.php` (Widget vor dem Absenden-Button, Script-Tag am Dateiende)

**Interfaces:**
- Consumes: `TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY` (Task 1); das Widget erzeugt das Hidden-Field `cf-turnstile-response`, das Task 2 serverseitig prüft.

- [ ] **Step 1: Widget-Markup einfügen**

In `kontakt.php` zwischen dem `$formError`-Block und dem Absenden-Button — aus

```php
          <button type="submit" class="w-full sm:w-auto bg-cta hover:bg-cta-hover disabled:opacity-60 text-white font-semibold px-8 py-3 rounded transition-colors cursor-pointer">
```

wird

```php
          <?php if (TURNSTILE_SITE_KEY !== '' && TURNSTILE_SECRET_KEY !== '') : ?>
            <div class="cf-turnstile" data-sitekey="<?= e(TURNSTILE_SITE_KEY) ?>" data-language="de"></div>
          <?php endif; ?>

          <button type="submit" class="w-full sm:w-auto bg-cta hover:bg-cta-hover disabled:opacity-60 text-white font-semibold px-8 py-3 rounded transition-colors cursor-pointer">
```

- [ ] **Step 2: Script-Tag am Dateiende einfügen**

Aus der letzten Zeile

```php
<?php require __DIR__ . '/includes/page-footer.php';
```

wird

```php
<?php if (TURNSTILE_SITE_KEY !== '' && TURNSTILE_SECRET_KEY !== '') : ?>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<?php endif; ?>
<?php require __DIR__ . '/includes/page-footer.php';
```

- [ ] **Step 3: Verifikation (beide Kill-Switch-Zustände)**

```bash
"C:/xampp/php/php.exe" -l kontakt.php
"C:/xampp/php/php.exe" -S localhost:3000 scripts/dev-router.php &
sleep 1
# Secret ist lokal noch leer => Feature aus:
curl -s http://localhost:3000/kontakt | grep -c 'cf-turnstile'          # Expected: 0
# Test-Secret temporär eintragen => Widget da:
sed -i "s/define('TURNSTILE_SECRET_KEY', '');/define('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA');/" includes/secrets.php
curl -s http://localhost:3000/kontakt | grep -c 'class="cf-turnstile"'  # Expected: 1
curl -s http://localhost:3000/kontakt | grep -c 'challenges.cloudflare.com/turnstile/v0/api.js'  # Expected: 1
curl -s http://localhost:3000/ | grep -c 'cf-turnstile'                 # Expected: 0 (nur Kontaktseite)
# zurück auf leer:
sed -i "s/define('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA');/define('TURNSTILE_SECRET_KEY', '');/" includes/secrets.php
```
Danach Dev-Server beenden. (`includes/secrets.php` ist gitignoriert — die sed-Änderungen berühren kein Git-Tracking.)

- [ ] **Step 4: Commit**

```bash
git add kontakt.php
git commit -m "Render Turnstile widget on contact form"
```

---

### Task 4: Datenschutzerklärung ergänzen

**Files:**
- Modify: `datenschutz.php` (Abschnitt «2. Datenerfassung auf dieser Website», Unterabschnitt Kontaktformular)

**Interfaces:**
- Consumes: nichts aus anderen Tasks (reiner Text).

- [ ] **Step 1: Absatz einfügen**

In `datenschutz.php` im Abschnitt 2 direkt nach dem bestehenden Kontaktformular-Absatz (`… Die Übertragung erfolgt per E-Mail über den Mailserver unseres Hosting-Anbieters.</p>`) einfügen:

```php
      <p class="mt-2">
        Zum Schutz vor automatisiertem Missbrauch (Spam) setzen wir beim Kontaktformular den Dienst «Turnstile» der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA, ein. Turnstile prüft anhand technischer Merkmale (u. a. IP-Adresse, Browser-Eigenschaften und Interaktionsverhalten), ob eine Anfrage von einem Menschen stammt. Dabei kann Ihre IP-Adresse an Server von Cloudflare, auch in den USA, übermittelt werden; Cloudflare ist nach dem Swiss–U.S. Data Privacy Framework zertifiziert. Turnstile setzt keine Cookies zu Werbe- oder Trackingzwecken und erfordert daher keine Einwilligung. Rechtsgrundlage ist unser berechtigtes Interesse an der Abwehr von automatisiertem Missbrauch unseres Kontaktformulars.
      </p>
```

- [ ] **Step 2: Verifikation**

```bash
"C:/xampp/php/php.exe" -l datenschutz.php
grep -c 'Turnstile' datenschutz.php   # Expected: >= 2
```

- [ ] **Step 3: Commit**

```bash
git add datenschutz.php
git commit -m "Document Turnstile in privacy policy"
```

---

### Task 5: End-to-End-Verifikation mit Cloudflare-Test-Keys

**Files:**
- Temporär (wird zurückgesetzt): `includes/config.php` (Site-Key → Test-Key), `includes/secrets.php` (Test-Secrets)
- Create (Scratchpad, nicht im Repo): Playwright-Testscript

**Interfaces:**
- Consumes: alles aus Task 1–3. Browser-Automatisierung wie beim GA4-Projekt: `playwright-core` im Scratchpad, Edge headless (`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`).

- [ ] **Step 1: Test-Keys aktivieren**

In `includes/config.php` temporär `0x4AAAAAAD8yjwZ_qxxsPN9q` durch `1x00000000000000000000AA` ersetzen; in `includes/secrets.php` das Secret auf `1x0000000000000000000000000000000AA` (always pass) setzen. Dev-Server starten.

- [ ] **Step 2: Happy Path (Token akzeptiert)**

Playwright: `/kontakt` öffnen, warten bis das Hidden-Field `[name="cf-turnstile-response"]` einen nicht-leeren Wert hat, Felder ausfüllen (Name «Testkunde», E-Mail «test@example.com», Betreff «E2E-Test», Nachricht ≥ 10 Zeichen), absenden.
Expected: Die Antwortseite zeigt KEINE Meldung «Sicherheitsprüfung fehlgeschlagen» — entweder Erfolgs-Redirect auf `/kontakt?gesendet=1` oder (lokal ohne Mailserver) die Meldung «E-Mail konnte nicht gesendet werden…». Beides beweist: Turnstile-Prüfung bestanden, Ablauf erreicht den Mailversand.

- [ ] **Step 3: Ablehnungs-Pfad (Token abgelehnt)**

In `includes/secrets.php` das Secret auf `2x0000000000000000000000000000000AA` (always fail) setzen, Formular erneut ausfüllen und absenden.
Expected: Fehlermeldung «Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.» erscheint UND die eingegebenen Werte stehen noch in den Feldern (`$old`-Mechanismus).

- [ ] **Step 4: Honeypot-Vorrang**

```bash
curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/kontakt --data "website=bot&name=x&email=x@x.ch&subject=abc&message=1234567890"
```
Expected: `303` (stiller Fake-Erfolg trotz fehlendem Turnstile-Token — Honeypot greift zuerst).

- [ ] **Step 5: Zurücksetzen und verifizieren**

Site-Key in `includes/config.php` zurück auf `0x4AAAAAAD8yjwZ_qxxsPN9q`; Secret in `includes/secrets.php` zurück auf `''` (der Controller trägt danach den echten Key ein). Dev-Server beenden.

```bash
git status --short   # Expected: leer (config.php unverändert committet, secrets.php ignoriert)
git diff includes/config.php   # Expected: leer
```

- [ ] **Step 6: Kein Commit nötig**

Task 5 erzeugt keine Repo-Änderungen (Testscript liegt im Scratchpad, Key-Wechsel wurden zurückgesetzt).

---

## Nach dem Merge (manuell durch den User)

1. Controller trägt den echten Secret-Key in `includes/secrets.php` ein (lokal, niemals committen).
2. FTP-Upload nach `httpdocs`: `kontakt.php`, `datenschutz.php`, `includes/config.php`, `includes/contact-mailer.php`, `includes/secrets.php`, `includes/secrets.example.php`.
3. Live-Test: `/kontakt` öffnen — Turnstile-Häkchen erscheint über dem Absenden-Button; Testanfrage senden; Eingang unter info@ari-maler.ch prüfen.
