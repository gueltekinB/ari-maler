# Design: Cloudflare Turnstile für das Kontaktformular

**Datum:** 2026-07-24
**Status:** Vom Auftraggeber abgenommen (inkl. Nachtrag Secret-Handling)

## Ziel

Das Kontaktformular auf ari-maler.ch zusätzlich zum bestehenden Honeypot mit Cloudflare Turnstile (Modus **Managed**) gegen Spam-Bots schützen. Kein DNS-/Hosting-Umbau: Die Domain bleibt bei Plesk, es wird nur das Widget eingebunden und serverseitig verifiziert.

## Entscheidungen (aus dem Brainstorming)

- **Ansatz:** Direkte Einbindung ins bestehende Formular (kein Cloudflare-Proxy, keine Eigenbau-Alternative).
- **Widget-Modus:** Managed — Cloudflare entscheidet pro Besucher, ob eine Interaktion nötig ist. Muss im Cloudflare-Dashboard so angelegt sein (Hostname `ari-maler.ch`).
- **Fail-open:** Ist Cloudflare vom Server aus nicht erreichbar (Netzwerkfehler/Timeout), wird die Anfrage angenommen — eine verlorene Kundenanfrage wiegt schwerer als eine Spam-Mail; der Honeypot bleibt als zweite Linie. Nur ein fehlendes/ungültiges/abgelaufenes Token wird abgelehnt.
- **Secret-Handling (Nachtrag):** Das GitHub-Repo ist öffentlich. Der Secret-Key wird deshalb **niemals committet** — weder in `config.php` noch in dieses Dokument. Er lebt ausschliesslich in `includes/secrets.php` (gitignoriert, einmalig per FTP hochgeladen). Der Site-Key ist öffentlich (steht im HTML) und darf committet werden.

## Komponenten

### 1. Konfiguration

- `includes/config.php` (committet):
  - `define('TURNSTILE_SITE_KEY', '0x4AAAAAAD8yjwZ_qxxsPN9q');`
  - danach `require` von `includes/secrets.php`, **nur falls die Datei existiert**; anschliessend Fallback `if (!defined('TURNSTILE_SECRET_KEY')) { define('TURNSTILE_SECRET_KEY', ''); }`
- `includes/secrets.php` (NICHT committet, in `.gitignore`): definiert `TURNSTILE_SECRET_KEY` mit dem echten Wert. Wird lokal erstellt und per FTP nach `httpdocs/includes/` hochgeladen.
- `includes/secrets.example.php` (committet): Template mit leerem Wert und Anleitung als Kommentar.
- **Kill-Switch:** Ist `TURNSTILE_SITE_KEY` oder `TURNSTILE_SECRET_KEY` leer, wird weder Widget gerendert noch serverseitig geprüft — Formular verhält sich exakt wie heute.

### 2. Formular — `kontakt.php`

- Turnstile-Script nur auf dieser Seite: `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>` (nur wenn Keys gesetzt).
- Widget zwischen Nachricht-Feld und Absenden-Button: `<div class="cf-turnstile" data-sitekey="<?= e(TURNSTILE_SITE_KEY) ?>" data-language="de"></div>`.
- Das Widget erzeugt ein Hidden-Field `cf-turnstile-response`, das mit dem POST mitkommt.

### 3. Serverprüfung — `includes/contact-mailer.php`

- Neue Funktion `verify_turnstile(string $token): bool`:
  - Leere Keys → `true` (Feature aus).
  - Leeres Token → `false` (Widget wurde umgangen).
  - POST an `https://challenges.cloudflare.com/turnstile/v0/siteverify` mit `secret`, `response`, `remoteip` (`$_SERVER['REMOTE_ADDR']`); Timeout 5 s; cURL, Fallback `file_get_contents` mit Stream-Context.
  - HTTP-/Netzwerkfehler oder unparsebare Antwort → `true` (**fail-open**).
  - Antwort `{"success": false}` → `false`.
- Aufruf in `handle_contact_form()` **nach** dem Honeypot, **vor** der Feld-Validierung. Bei `false`: `['success' => false, 'error' => 'Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.']` — Eingaben bleiben über den bestehenden `$old`-Mechanismus erhalten.

### 4. Datenschutzerklärung — `datenschutz.php`

Im Abschnitt «2. Datenerfassung auf dieser Website», Unterabschnitt Kontaktformular: neuer Absatz zu Cloudflare Turnstile — Zweck (Schutz vor automatisiertem Missbrauch), Anbieter Cloudflare Inc. (USA) bzw. deren EU-Niederlassung, dabei verarbeitete Daten (IP-Adresse, Browser-Merkmale), USA-Übermittlung unter dem Data Privacy Framework, Rechtsgrundlage berechtigtes Interesse (Spam-Abwehr), keine Tracking-Cookies. **Cookie-Banner bleibt unverändert** — keine Einwilligung nötig.

### 5. Fehlerbehandlung

- Keys leer → keinerlei Verhaltensänderung (Kill-Switch).
- JavaScript deaktiviert → kein Token → Ablehnung mit Fehlermeldung (bewusst: ohne JS funktioniert das Formular dann nicht mehr; akzeptiert, da JS auf der Seite ohnehin vorausgesetzt wird und Bots ohne JS genau so gestoppt werden).
- Cloudflare-Ausfall → fail-open (siehe oben).
- Adblocker blockiert Widget-Script → kein Token → Ablehnung. Die Fehlermeldung lautet einheitlich: «Sicherheitsprüfung fehlgeschlagen. Bitte laden Sie die Seite neu und versuchen Sie es erneut.»

### 6. Tests (lokal, Cloudflare-Test-Keys)

Cloudflare stellt offizielle Test-Keys bereit; damit lokal (Dev-Server + Headless-Browser wie beim Banner-Projekt):

1. Pass-Keys (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`): Formular absenden → Erfolg.
2. Block-Key (`2x00000000000000000000AB`) bzw. Fail-Secret (`2x0000000000000000000000000000000AA`): Absenden → Fehlermeldung, Eingaben bleiben erhalten.
3. Keys leer: Formular exakt wie heute, kein Widget im Markup.
4. Honeypot gefüllt: weiterhin stiller Fake-Erfolg (Reihenfolge Honeypot vor Turnstile).
5. `php -l` auf allen geänderten Dateien.

Nach FTP-Upload durch den User: Live-Test mit echten Keys (Widget erscheint, Anfrage kommt an).

## Nicht im Umfang

- Kein Rate-Limiting, keine weiteren Formulare (es gibt nur eines), kein CSP-Umbau.
- Turnstile-Analytics/Firewall-Regeln im Cloudflare-Dashboard.
