# GA4 + Cookie-Consent-Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google Analytics 4 mit Opt-in-Cookie-Banner und aktualisierter Datenschutzerklärung auf der Plain-PHP-Website einbauen.

**Architecture:** Ein PHP-Partial (`includes/cookie-banner.php`) rendert den Banner in den gemeinsamen Footer; die gesamte Consent-Logik lebt als neuer Abschnitt in `assets/js/main.js` (Vanilla JS, `data-*`-Hooks wie der Rest der Seite). `gtag.js` wird erst nach Zustimmung dynamisch nachgeladen — vor Zustimmung geht kein einziger Request an Google. Die Wahl wird im Cookie `cookie_consent` gespeichert.

**Tech Stack:** Plain PHP 8 (shared hosting, **kein Node.js auf dem Server**), Tailwind CSS v4 (lokal vorkompiliert), Vanilla JS.

**Spec:** `docs/superpowers/specs/2026-07-24-ga4-cookie-consent-design.md`

## Global Constraints

- Kein Node.js auf dem Server: alles PHP-Include + statisches JS; `npm run build:css` läuft nur lokal, das kompilierte `assets/css/styles.css` wird committet.
- Measurement-ID: `G-YQ7NJ5RM5Q`. Leerer String in `GA4_MEASUREMENT_ID` ⇒ kein Banner, kein Tracking, keine Regression.
- `gtag.js` lädt nur auf `ari-maler.ch` / `www.ari-maler.ch` (Host-Check wie Auto-noindex in `page-header.php`); der Banner erscheint auf allen Hosts.
- JS-Stil wie `assets/js/main.js`: `var`, benannte `function`s, IIFE, keine Arrow-Functions, `data-*`-Attribute als Hooks.
- Copy auf Deutsch (Schweizer Register: «»-Anführungszeichen, „ss" statt „ß").
- Kein Test-Framework im Projekt: Jeder Task endet mit `php -l`-Lint bzw. Curl-Checks gegen den lokalen Dev-Server als Verifikation.
- Commit-Messages: Format wie bisherige Historie (imperativer Einzeiler, Englisch); Harness-Trailer (Co-Authored-By) anhängen.
- Dev-Server für Verifikation: `php -S localhost:3000 scripts/dev-router.php` (im Hintergrund starten, nach den Checks beenden).

---

### Task 1: Konfiguration, Banner-Partial und Footer-Einbindung (Markup)

**Files:**
- Modify: `includes/config.php` (ans Dateiende)
- Create: `includes/cookie-banner.php`
- Modify: `includes/page-footer.php:43-46` (Footer-Linkzeile) und `:49-51` (vor `</body>`)

**Interfaces:**
- Produces für Task 2 (JS): Element `[data-cookie-banner]` mit Attributen `data-ga-id` (Measurement-ID) und `data-ga-active` (`"1"` nur auf Live-Host), Buttons `[data-cookie-accept]` und `[data-cookie-decline]`, Footer-Button `[data-cookie-settings]`. Banner ist per `hidden`-Klasse standardmässig unsichtbar.
- Consumes: `e()` aus `includes/helpers.php`, Konstante `GA4_MEASUREMENT_ID`.

- [ ] **Step 1: Konstante in `includes/config.php` ergänzen**

Ans Ende der Datei anfügen:

```php

// Google Analytics 4: Measurement-ID der GA4-Property.
// Leerer String deaktiviert Cookie-Banner und Tracking vollständig.
// Das gtag.js-Script lädt zusätzlich nur auf der Live-Domain
// (ari-maler.ch/www), damit Vorschau- und lokale Besuche die
// Statistik nicht verfälschen (siehe includes/cookie-banner.php).
define('GA4_MEASUREMENT_ID', 'G-YQ7NJ5RM5Q');
```

- [ ] **Step 2: `includes/cookie-banner.php` erstellen**

Kompletter Dateiinhalt:

```php
<?php

/**
 * Cookie-Consent-Banner für Google Analytics.
 *
 * Wird von page-footer.php nur eingebunden, wenn GA4_MEASUREMENT_ID gesetzt
 * ist. Der Banner selbst erscheint auf allen Hosts (Kontrolle auf der
 * Vorschau möglich); das GA-Script lädt das JS aber nur bei
 * data-ga-active="1", also auf der Live-Domain.
 */

$gaHttpHost = strtolower($_SERVER['HTTP_HOST'] ?? '');
$gaIsLiveHost = in_array($gaHttpHost, ['ari-maler.ch', 'www.ari-maler.ch'], true);
?>
<div data-cookie-banner
     data-ga-id="<?= e(GA4_MEASUREMENT_ID) ?>"
     data-ga-active="<?= $gaIsLiveHost ? '1' : '0' ?>"
     role="region" aria-label="Cookie-Hinweis"
     class="hidden fixed bottom-0 inset-x-0 z-50 bg-navy border-t border-white/10 text-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
    <p class="text-sm text-white/85 text-center sm:text-left">
      Wir verwenden Cookies für die Besucherstatistik (Google Analytics), um unsere Website zu verbessern.
      Details finden Sie in der <a href="/datenschutz" class="underline hover:text-white transition-colors">Datenschutzerklärung</a>.
    </p>
    <div class="flex gap-3 flex-shrink-0">
      <button type="button" data-cookie-decline class="border border-white/40 hover:border-white text-white font-semibold px-4 py-2 rounded transition-colors text-sm">Ablehnen</button>
      <button type="button" data-cookie-accept class="bg-cta hover:bg-cta-hover text-white font-semibold px-4 py-2 rounded transition-colors text-sm">Akzeptieren</button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Footer-Link und Banner-Einbindung in `includes/page-footer.php`**

Die Linkzeile (bisher Impressum/Datenschutz) erweitern — aus

```php
        <div class="flex gap-4">
          <a href="/impressum" class="hover:text-white transition-colors">Impressum</a>
          <a href="/datenschutz" class="hover:text-white transition-colors">Datenschutz</a>
        </div>
```

wird

```php
        <div class="flex gap-4">
          <a href="/impressum" class="hover:text-white transition-colors">Impressum</a>
          <a href="/datenschutz" class="hover:text-white transition-colors">Datenschutz</a>
          <?php if (GA4_MEASUREMENT_ID !== '') : ?>
            <button type="button" data-cookie-settings class="hover:text-white transition-colors">Cookie-Einstellungen</button>
          <?php endif; ?>
        </div>
```

Und direkt vor `</body>` (nach `</footer>`) den Banner einbinden — aus

```php
  </footer>
</body>
</html>
```

wird

```php
  </footer>
  <?php if (GA4_MEASUREMENT_ID !== '') {
      require __DIR__ . '/cookie-banner.php';
  } ?>
</body>
</html>
```

- [ ] **Step 4: PHP-Lint**

Run: `php -l includes/config.php && php -l includes/cookie-banner.php && php -l includes/page-footer.php`
Expected: dreimal `No syntax errors detected`

- [ ] **Step 5: Dev-Server-Check (Banner im Markup, Standard versteckt)**

Run (Server im Hintergrund starten, dann):
```bash
php -S localhost:3000 scripts/dev-router.php &
sleep 1
curl -s http://localhost:3000/ | grep -c 'data-cookie-banner'          # Expected: 1
curl -s http://localhost:3000/ | grep -o 'data-ga-active="0"'          # Expected: data-ga-active="0" (localhost ist kein Live-Host)
curl -s http://localhost:3000/ | grep -o 'data-cookie-settings'        # Expected: data-cookie-settings
curl -s http://localhost:3000/kontakt | grep -c 'data-cookie-accept'   # Expected: 1
```
Danach Server-Prozess beenden.

- [ ] **Step 6: Commit**

```bash
git add includes/config.php includes/cookie-banner.php includes/page-footer.php
git commit -m "Add cookie consent banner markup and GA4 config"
```

---

### Task 2: Consent-Logik und Conversion-Events in `assets/js/main.js`

**Files:**
- Modify: `assets/js/main.js` (neuer Abschnitt vor dem schliessenden `})();`, also nach dem Vorher/Nachher-Slider-Block, Zeile 84)
- Modify: `kontakt.php:133-137` (Success-Meldung bekommt `data-ga-lead`)

**Interfaces:**
- Consumes (aus Task 1): `[data-cookie-banner]` mit `data-ga-id`/`data-ga-active`, `[data-cookie-accept]`, `[data-cookie-decline]`, `[data-cookie-settings]`.
- Produces: Cookie `cookie_consent` = `granted` | `denied` (12 Monate, `SameSite=Lax`, `Secure` auf HTTPS). GA4-Events `generate_lead`, `phone_click`, `email_click`.

- [ ] **Step 1: `data-ga-lead` an die Erfolgsmeldung in `kontakt.php` hängen**

Aus

```php
          <?php if ($formSuccess) : ?>
            <div class="bg-green-50 border border-green-200 rounded p-4 text-green-800 text-sm">
```

wird

```php
          <?php if ($formSuccess) : ?>
            <div data-ga-lead class="bg-green-50 border border-green-200 rounded p-4 text-green-800 text-sm">
```

- [ ] **Step 2: Consent-Abschnitt in `assets/js/main.js` einfügen**

Direkt vor dem schliessenden `})();` (nach dem Vorher/Nachher-Slider-Block) einfügen:

```js

  // Cookie-Consent + Google Analytics (GA4).
  // gtag.js wird erst nach «Akzeptieren» geladen; vorher geht kein Request
  // an Google. data-ga-active="1" nur auf der Live-Domain (siehe
  // includes/cookie-banner.php).
  var cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner) {
    var gaId = cookieBanner.getAttribute('data-ga-id');
    var gaActive = cookieBanner.getAttribute('data-ga-active') === '1';
    var gaLoaded = false;

    var getConsent = function () {
      var match = document.cookie.match(/(?:^|;\s*)cookie_consent=(granted|denied)/);
      return match ? match[1] : null;
    };

    var setConsent = function (value) {
      var cookie = 'cookie_consent=' + value + '; max-age=31536000; path=/; SameSite=Lax';
      if (location.protocol === 'https:') {
        cookie += '; Secure';
      }
      document.cookie = cookie;
    };

    // GA-Cookies beim Widerruf löschen (auf Host- und Domain-Ebene).
    var deleteGaCookies = function () {
      document.cookie.split(';').forEach(function (part) {
        var name = part.split('=')[0].trim();
        if (name === '_ga' || name.indexOf('_ga_') === 0) {
          document.cookie = name + '=; max-age=0; path=/';
          document.cookie = name + '=; max-age=0; path=/; domain=.' + location.hostname.replace(/^www\./, '');
        }
      });
    };

    var loadAnalytics = function () {
      if (gaLoaded || !gaActive || !gaId) {
        return;
      }
      gaLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      // Consent Mode v2: alle Signale granted — das Script lädt ohnehin
      // erst nach ausdrücklicher Zustimmung (Basic Consent Mode).
      window.gtag('consent', 'default', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
      window.gtag('js', new Date());
      window.gtag('config', gaId);
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
      document.head.appendChild(gaScript);
    };

    var applyConsent = function (value) {
      setConsent(value);
      cookieBanner.classList.add('hidden');
      if (value === 'granted') {
        loadAnalytics();
      } else {
        deleteGaCookies();
      }
    };

    cookieBanner.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      applyConsent('granted');
    });
    cookieBanner.querySelector('[data-cookie-decline]').addEventListener('click', function () {
      applyConsent('denied');
    });

    // Footer-Link «Cookie-Einstellungen»: Banner zum Ändern der Wahl öffnen.
    var cookieSettings = document.querySelector('[data-cookie-settings]');
    if (cookieSettings) {
      cookieSettings.addEventListener('click', function () {
        cookieBanner.classList.remove('hidden');
      });
    }

    var consent = getConsent();
    if (consent === 'granted') {
      loadAnalytics();
    } else if (consent === null) {
      cookieBanner.classList.remove('hidden');
    }

    // Conversion-Events — feuern nur, wenn GA geladen ist.
    var track = function (name) {
      if (gaLoaded && typeof window.gtag === 'function') {
        window.gtag('event', name);
      }
    };

    // Formular-Erfolg (/kontakt?gesendet=1); sessionStorage verhindert
    // Doppelzählung beim Aktualisieren der Erfolgsseite.
    if (document.querySelector('[data-ga-lead]') && gaLoaded && !sessionStorage.getItem('gaLeadTracked')) {
      track('generate_lead');
      sessionStorage.setItem('gaLeadTracked', '1');
    }

    document.addEventListener('click', function (e) {
      var contactLink = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
      if (contactLink) {
        track(contactLink.getAttribute('href').indexOf('tel:') === 0 ? 'phone_click' : 'email_click');
      }
    });
  }
```

- [ ] **Step 3: Lint/Verifikation**

Run: `php -l kontakt.php`
Expected: `No syntax errors detected`

Run: `node --check assets/js/main.js` (Node ist lokal vorhanden)
Expected: kein Output, Exit-Code 0

- [ ] **Step 4: Browser-Smoke-Test (lokal)**

Dev-Server starten (`php -S localhost:3000 scripts/dev-router.php`), im Browser `http://localhost:3000/` öffnen:
1. Banner erscheint unten. Netzwerk-Tab: keine Requests an `googletagmanager.com`.
2. «Ablehnen» klicken → Banner weg, Cookie `cookie_consent=denied` (DevTools → Application), nach Reload bleibt der Banner weg.
3. Footer-Link «Cookie-Einstellungen» → Banner erscheint wieder; «Akzeptieren» → Cookie `granted`. (Kein gtag-Request auf localhost — `data-ga-active="0"` ist hier korrekt.)

Expected: Verhalten wie beschrieben; keine Konsolen-Fehler.

- [ ] **Step 5: Commit**

```bash
git add assets/js/main.js kontakt.php
git commit -m "Add consent logic, GA4 loader and conversion events"
```

---

### Task 3: Datenschutzerklärung ergänzen

**Files:**
- Modify: `datenschutz.php:40-74` (neuer Abschnitt 3 nach «2. Datenerfassung», bisherige Abschnitte 3–7 werden zu 4–8)

**Interfaces:**
- Consumes: Footer-Button «Cookie-Einstellungen» aus Task 1 (wird im Text referenziert).

- [ ] **Step 1: Neuen Abschnitt einfügen**

Nach dem `</div>` des Abschnitts «2. Datenerfassung auf dieser Website» (nach Zeile 39) einfügen:

```php

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">3. Cookies und Webanalyse (Google Analytics)</h2>
      <p>
        Diese Website verwendet Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland («Google»). Google Analytics kommt nur zum Einsatz, wenn Sie beim Besuch der Website über den Cookie-Hinweis ausdrücklich einwilligen («Akzeptieren»). Ohne Ihre Einwilligung werden keine Analyse-Cookies gesetzt und keine Daten an Google übermittelt.
      </p>
      <p class="mt-2">
        Bei erteilter Einwilligung setzt Google Analytics Cookies (u. a. «_ga», «_ga_*», Speicherdauer bis zu 24 Monate), die eine Auswertung Ihrer Nutzung der Website ermöglichen (z. B. besuchte Seiten, Verweildauer, ungefähre Herkunft, verwendetes Gerät). Die erhobenen Informationen werden an Server von Google übertragen und dort verarbeitet; eine Übermittlung in die USA ist möglich. Google LLC ist nach dem Swiss–U.S. Data Privacy Framework zertifiziert, das ein angemessenes Datenschutzniveau gewährleistet. IP-Adressen werden in Google Analytics 4 nicht gespeichert.
      </p>
      <p class="mt-2">
        Daneben setzt die Website das technisch notwendige Cookie «cookie_consent», das ausschliesslich Ihre Cookie-Entscheidung speichert (Speicherdauer 12 Monate).
      </p>
      <p class="mt-2">
        Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder ändern, indem Sie am Seitenende auf «Cookie-Einstellungen» klicken.
      </p>
    </div>
```

- [ ] **Step 2: Folgeabschnitte umnummerieren**

Die bestehenden Überschriften anpassen (nur die Nummer ändert sich):
- `3. Zweck der Datenbearbeitung` → `4. Zweck der Datenbearbeitung`
- `4. Aufbewahrung` → `5. Aufbewahrung`
- `5. Ihre Rechte` → `6. Ihre Rechte`
- `6. SSL-Verschlüsselung` → `7. SSL-Verschlüsselung`
- `7. Änderungen dieser Datenschutzerklärung` → `8. Änderungen dieser Datenschutzerklärung`

- [ ] **Step 3: Lint und Nummerierungs-Check**

Run: `php -l datenschutz.php`
Expected: `No syntax errors detected`

Run: `grep -o '[0-9]\. [A-ZÄÖÜ]' datenschutz.php | sort`
Expected: lückenlose Nummern 1–8, keine Duplikate

- [ ] **Step 4: Commit**

```bash
git add datenschutz.php
git commit -m "Document Google Analytics and cookies in privacy policy"
```

---

### Task 4: CSS-Build und Gesamtverifikation

**Files:**
- Modify: `assets/css/styles.css` (generiert durch Build)

**Interfaces:**
- Consumes: Tailwind-Klassen aus dem Banner-Markup von Task 1 (`fixed`, `bottom-0`, `inset-x-0`, `z-50`, `shadow-lg`, …); die `@source`-Globs in `assets/css/input.css` erfassen die PHP-Dateien automatisch.

- [ ] **Step 1: CSS neu bauen**

Run: `npm run build:css`
Expected: Build läuft ohne Fehler durch, `assets/css/styles.css` ändert sich.

- [ ] **Step 2: Neue Utility-Klassen im Build prüfen**

Run: `grep -c 'inset-x-0' assets/css/styles.css && grep -c 'z-50' assets/css/styles.css`
Expected: jeweils ≥ 1

- [ ] **Step 3: Gesamt-Smoke-Test**

Dev-Server starten, alle Kernszenarien einmal durchklicken (Browser, `http://localhost:3000/`):
1. Erstbesuch (Cookies gelöscht): Banner sichtbar, korrekt gestylt (Navy-Leiste unten, zwei Buttons), keine Google-Requests.
2. «Ablehnen» → Banner weg, übersteht Reload und Seitenwechsel (z. B. /kontakt).
3. «Cookie-Einstellungen» im Footer → Banner wieder da; «Akzeptieren» → Cookie `granted`.
4. `GA4_MEASUREMENT_ID` testweise auf `''` setzen → kein Banner, kein Footer-Link, Seite wie vorher; danach ID zurücksetzen.
5. Mobile-Breite (DevTools): Banner-Layout bricht sauber um (Text oben, Buttons darunter).

Expected: alles wie beschrieben, keine Konsolen-Fehler.

- [ ] **Step 4: Commit**

```bash
git add assets/css/styles.css
git commit -m "Rebuild CSS for cookie consent banner"
```

---

## Nach dem Merge / Go-Live (manuell, ausserhalb des Codes)

- Auf der Live-Domain prüfen: Nach «Akzeptieren» erscheinen Requests an `googletagmanager.com` und Daten im GA4-Echtzeitbericht (Property `G-YQ7NJ5RM5Q`).
- In GA4 die Events `generate_lead`, `phone_click`, `email_click` als Key Events (Conversions) markieren.
- Später für Google Ads: Konto verknüpfen und Conversions importieren.
