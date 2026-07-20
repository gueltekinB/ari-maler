# Ari Maler GmbH

Marketing-Website der Ari Maler GmbH, einem Maler-/Sanierungsbetrieb in der Region Basel. Reines PHP (kein Framework) + statisches, vorkompiliertes Tailwind-CSS – läuft auf jedem Shared-Hosting mit PHP und Apache, ohne Node.js auf dem Server.

## Deployment

Den gesamten Repo-Inhalt (ausser `node_modules/`, `scripts/`, `assets/css/input.css` und den Markdown-Dateien – die schaden aber auch nicht) ins Webroot des Hosts hochladen (z. B. `htdocs/` oder `public_html/`). Voraussetzungen:

- PHP 8.x
- Apache mit `mod_rewrite` (schöne URLs) und idealerweise `mod_headers` (Sicherheits-Header) – auf Shared-Hosting Standard
- `.htaccess`-Dateien müssen mit hochgeladen werden (versteckte Dateien!)

## Kontaktformular / E-Mail

`includes/contact-mailer.php` versendet die Formular-Mails per PHP `mail()` über den Mailserver des Hosts – kein externer Dienst. Konfiguration in `includes/config.php`:

- `CONTACT_TO_EMAIL` – Empfänger (Standard: `info@ari-maler.ch`)
- `CONTACT_FROM_EMAIL` – Absender (Standard: `kontakt@ari-maler.ch`). **Wichtig:** Diese Adresse muss beim Host als Mailbox/Alias existieren bzw. zum Versand freigegeben sein, sonst landet die Mail im Spam oder wird abgelehnt.

## CSS neu bauen (nur lokal, nur bei Markup-Änderungen)

Das Stylesheet `assets/css/styles.css` ist eingecheckt und wird direkt ausgeliefert. Nur wenn Tailwind-Klassen im Markup geändert werden, muss es lokal neu kompiliert werden:

```bash
npm install        # einmalig
npm run build:css  # kompiliert assets/css/input.css -> assets/css/styles.css
```

## Lokal testen

```bash
php -S localhost:3000 scripts/dev-router.php
```

Der eingebaute PHP-Server wertet `.htaccess` nicht aus; `scripts/dev-router.php` bildet die Rewrites nach, damit die schönen URLs (`/kontakt`, `/dienstleistungen/innenmalerei`, `/sitemap.xml`) auch lokal funktionieren.

Siehe `CLAUDE.md` für Architektur-Notizen.
