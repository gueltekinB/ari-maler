# Design: Google Analytics 4 mit Cookie-Consent-Banner

**Datum:** 2026-07-24
**Status:** Vom Auftraggeber abgenommen

## Ziel

GA4 auf ari-maler.ch einbinden, um (a) Besucherzahlen und Seitenaufrufe, (b) Kontakt-Conversions (Formular, Telefon, E-Mail) zu messen und (c) eine spätere Google-Ads-Anbindung (Conversion-Import, Remarketing) vorzubereiten. Da GA4 Cookies setzt, wird ein Opt-in-Consent-Banner Pflicht; die Datenschutzerklärung wird ergänzt.

**Randbedingung:** Shared PHP/Apache-Hosting ohne Node.js auf dem Server. Alles läuft als PHP-Include + Vanilla-JS; `gtag.js` lädt der Browser direkt von Google. Node bleibt nur lokal für `npm run build:css`.

## Entscheidungen (aus dem Brainstorming)

- **Ansatz:** Eigener schlanker Banner (kein CMP-Dienst, keine Bibliothek). Bei genau einem Tracking-Dienst ausreichend; Googles CMP-Zertifizierungspflicht betrifft Publisher, nicht Werbetreibende.
- **Banner-Form:** Dezente fixierte Leiste am unteren Rand, Navy-Design der Seite.
- **Measurement-ID:** `G-YQ7NJ5RM5Q` (GA4-Property existiert bereits).
- **Consent-Modell:** Echtes Opt-in — vor Zustimmung wird kein einziger Google-Request abgesetzt. Bei Zustimmung werden alle vier Consent-Mode-v2-Signale auf `granted` gesetzt (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`), damit Remarketing/Ads später ohne Umbau möglich ist.

## Komponenten

### 1. Konfiguration — `includes/config.php`

- Neue Konstante `define('GA4_MEASUREMENT_ID', 'G-YQ7NJ5RM5Q');`
- Leerer String deaktiviert Banner **und** Tracking vollständig (Seite verhält sich wie heute).
- Das GA-Script lädt zusätzlich nur auf der Live-Domain (`ari-maler.ch`, `www.ari-maler.ch`) — gleiche Host-Erkennung wie der bestehende Auto-noindex in `includes/page-header.php`. Vorschau- (neu.ari-maler.ch) und localhost-Besuche verfälschen die Statistik nicht.
- Der Banner selbst erscheint auf allen Hosts (sofern ID gesetzt), damit er auf der Vorschau geprüft werden kann.

### 2. Banner — `includes/cookie-banner.php`

- Neues Partial, eingebunden in `includes/page-footer.php` (nur wenn `GA4_MEASUREMENT_ID` gesetzt).
- Fixierte Leiste unten (`position: fixed; bottom: 0`), Navy-Hintergrund, Tailwind-Klassen wie der Rest der Seite.
- Inhalt: kurzer Satz (Statistik-Cookies, Google Analytics), Link auf `/datenschutz`, zwei gleichwertige Buttons **«Ablehnen»** und **«Akzeptieren»** (gleiche visuelle Gewichtung: beide als echte Buttons, Akzeptieren in CTA-Farbe, Ablehnen als klar erkennbarer Sekundär-Button).
- Standardmässig versteckt (`hidden`); JS blendet ihn nur ein, wenn noch keine Wahl gespeichert ist (verhindert Aufblitzen bei Besuchern mit gespeicherter Wahl).
- Zugänglichkeit: `role="region"`, `aria-label`, Buttons fokussierbar.

### 3. Consent-Logik — `assets/js/main.js`

Gleiches Muster wie bestehende Interaktivität (`data-*`-Hooks, kein Framework):

- **Speicherung:** Cookie `cookie_consent` mit Wert `granted` oder `denied`, Laufzeit 12 Monate, `SameSite=Lax`, `Secure` (auf HTTPS), Pfad `/`.
- **Beim Laden:** Kein Cookie → Banner einblenden. `granted` → GA laden. `denied` → nichts tun.
- **«Akzeptieren»:** Cookie setzen, Banner ausblenden, GA sofort laden (kein Reload nötig).
- **«Ablehnen»:** Cookie `denied` setzen, Banner ausblenden. Es wird nichts geladen.
- **GA-Laden (nur Live-Host, per PHP-Flag ans JS übergeben):** `dataLayer`-Init, `gtag('consent', 'default', …)` mit allen vier v2-Signalen auf `granted`, dann `<script src="https://www.googletagmanager.com/gtag/js?id=G-…">` dynamisch einfügen, `gtag('js', …)` + `gtag('config', 'G-…')`.
- **Widerruf:** Footer-Link «Cookie-Einstellungen» (in `page-footer.php` neben Impressum/Datenschutz) öffnet den Banner erneut; eine geänderte Wahl überschreibt das Cookie. Wechsel von `granted` auf `denied` wirkt ab dem nächsten Seitenaufruf vollständig (bereits geladenes gtag wird nicht rückwirkend entfernt — Hinweis: GA-Cookies (`_ga*`) werden beim Widerruf per JS gelöscht, soweit möglich).

### 4. Conversion-Events (nur wenn GA geladen)

- **`generate_lead`:** Auf `/kontakt?gesendet=1` (Erfolgsmeldung des Formulars, erkennbar am bestehenden Success-Markup bzw. Query-Parameter) einmalig gefeuert.
- **`phone_click` / `email_click`:** Delegierter Click-Listener auf `a[href^="tel:"]` und `a[href^="mailto:"]`.
- Diese Events können in GA4 als Conversions markiert und später in Google Ads importiert werden.

### 5. Datenschutzerklärung — `datenschutz.php`

Neuer Abschnitt «Cookies und Webanalyse»:

- Welche Cookies gesetzt werden (`cookie_consent` als technisch notwendiges Cookie; `_ga`/`_ga_*` nur nach Einwilligung).
- Google Analytics 4: Zweck, Anbieter Google LLC / Google Ireland Ltd., Datenübermittlung in die USA unter dem Swiss–U.S. Data Privacy Framework.
- Speicherdauer, Rechtsgrundlage (Einwilligung), Widerruf jederzeit über den Footer-Link «Cookie-Einstellungen».

### 6. Styling & Build

- Tailwind-Klassen im PHP-Markup → einmal `npm run build:css`, kompiliertes `assets/css/styles.css` committen.
- Nur per JS umgeschaltete Klassen (falls über die bestehenden hinaus) via `@source inline(...)` safelisten; das vorhandene `hidden` ist bereits im Build.

## Fehlerbehandlung

- `GA4_MEASUREMENT_ID` leer → kein Banner, kein JS-Pfad aktiv, keine Regression.
- Blockiert ein Adblocker `gtag.js`, schlägt das Nachladen still fehl — Seite funktioniert uneingeschränkt weiter.
- JavaScript deaktiviert → Banner bleibt versteckt (`hidden`-Default), es wird nie getrackt: fail-safe in Richtung Datenschutz.

## Tests (manuell, lokaler Dev-Server)

1. Erstbesuch: Banner erscheint; ohne Klick keinerlei Google-Requests (Netzwerk-Tab).
2. «Ablehnen»: Banner verschwindet, Cookie `denied`, weiterhin keine Google-Requests, Wahl übersteht Reload und Seitenwechsel.
3. «Akzeptieren»: gtag-Requests sichtbar (lokal nur, wenn Live-Host-Check testweise überbrückt wird), Cookie `granted`.
4. Footer-Link öffnet Banner erneut; Wahlwechsel überschreibt Cookie, GA-Cookies werden bei Widerruf gelöscht.
5. Formular-Erfolgsseite und Tel-/Mail-Klicks feuern Events (im GA4-DebugView bzw. Netzwerk-Tab).
6. `GA4_MEASUREMENT_ID` leer: Seite identisch zu heute, kein Banner.

## Nicht im Umfang

- Kein Google Tag Manager, keine weiteren Tracking-Dienste, keine granulare Cookie-Kategorien-Auswahl (bei einem einzigen Dienst genügt Ja/Nein).
- Google-Ads-Konto-Verknüpfung und Conversion-Import in Ads selbst (späterer Schritt ausserhalb des Codes).
