<?php

/**
 * Zentrale Konfiguration.
 */

define('SITE_URL', 'https://ari-maler.ch');
define('SITE_NAME', 'Ari Maler GmbH');

define('DEFAULT_TITLE', 'Ari Maler GmbH – Malerarbeiten & Sanierungen in der Region Basel');
define('DEFAULT_DESCRIPTION', 'Ihr Experte für Malerarbeiten und Sanierungen in Basel-Stadt und Baselland. Innen- und Aussenmalerei, Betonkosmetik, Dekorationsarbeiten und Schadensanierungen.');

// Kontaktformular: Empfänger und Absender.
// CONTACT_FROM_EMAIL muss eine Adresse der eigenen Domain sein, damit der
// Mailserver des Hosts den Versand zulässt (SPF). Die Adresse muss beim Host
// als Mailbox oder Alias existieren bzw. zum Versand freigegeben sein.
define('CONTACT_TO_EMAIL', 'info@ari-maler.ch');
define('CONTACT_FROM_EMAIL', 'kontakt@ari-maler.ch');

// Blindkopie jeder Formular-Anfrage (Archiv im Posteingang dieser Mailbox).
// Auf null setzen, um keine Kopie zu versenden.
define('CONTACT_BCC_EMAIL', 'kontakt@ari-maler.ch');

// Google Analytics 4: Measurement-ID der GA4-Property.
// Leerer String deaktiviert Cookie-Banner und Tracking vollständig.
// Das gtag.js-Script lädt zusätzlich nur auf der Live-Domain
// (ari-maler.ch/www), damit Vorschau- und lokale Besuche die
// Statistik nicht verfälschen (siehe includes/cookie-banner.php).
define('GA4_MEASUREMENT_ID', 'G-YQ7NJ5RM5Q');

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
