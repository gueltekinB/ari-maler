<?php

/**
 * HTML-Escaping für Ausgaben.
 */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/**
 * Absolute URL aus einem Pfad ("/kontakt" -> "https://ari-maler.ch/kontakt").
 */
function absolute_url(string $path): string
{
    return SITE_URL . $path;
}

/**
 * Versionierter Asset-Pfad für Cache-Busting.
 */
function asset_url(string $path): string
{
    $file = __DIR__ . '/..' . $path;
    $version = is_file($file) ? filemtime($file) : 1;

    return $path . '?v=' . $version;
}
