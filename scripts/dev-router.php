<?php

/**
 * Router für den eingebauten PHP-Server – bildet die .htaccess-Rewrites nach,
 * damit die schönen URLs auch lokal ohne Apache funktionieren.
 *
 * Aufruf aus dem Projekt-Root:
 *   php -S localhost:3000 scripts/dev-router.php
 */

$root = dirname(__DIR__);
$path = rtrim((string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

if ($path === '') {
    require $root . '/index.php';
    return true;
}

if ($path === '/sitemap.xml') {
    require $root . '/sitemap.php';
    return true;
}

if (preg_match('#^/dienstleistungen/([a-z0-9-]+)$#', $path, $m)) {
    $_GET['slug'] = $m[1];
    require $root . '/dienstleistung.php';
    return true;
}

// Echte Dateien (Bilder, CSS, JS, .php direkt) vom Server ausliefern lassen.
if (is_file($root . $path)) {
    return false;
}

if (preg_match('#^/([a-z0-9-]+)$#', $path, $m) && is_file($root . '/' . $m[1] . '.php')) {
    require $root . '/' . $m[1] . '.php';
    return true;
}

require $root . '/404.php';
return true;
