<?php
require __DIR__ . '/includes/bootstrap.php';

// Wird über .htaccess als /sitemap.xml ausgeliefert.
header('Content-Type: application/xml; charset=UTF-8');

// Letzte tatsächliche Änderung der Seiten statt "heute" – ein täglich
// wechselndes lastmod ohne Inhaltsänderung wertet Google ab.
$sourceFiles = array_merge(glob(__DIR__ . '/*.php') ?: [], glob(__DIR__ . '/includes/*.php') ?: []);
$lastmod = date('Y-m-d', max(array_map('filemtime', $sourceFiles)));

$routes = [
    ['path' => '/', 'changefreq' => 'monthly', 'priority' => '1.0'],
    ['path' => '/dienstleistungen', 'changefreq' => 'monthly', 'priority' => '0.9'],
    ['path' => '/referenzen', 'changefreq' => 'monthly', 'priority' => '0.8'],
    ['path' => '/ueber-uns', 'changefreq' => 'yearly', 'priority' => '0.6'],
    ['path' => '/kontakt', 'changefreq' => 'yearly', 'priority' => '0.7'],
    ['path' => '/impressum', 'changefreq' => 'yearly', 'priority' => '0.2'],
    ['path' => '/datenschutz', 'changefreq' => 'yearly', 'priority' => '0.2'],
];

foreach ($services as $service) {
    $routes[] = [
        'path' => '/dienstleistungen/' . $service['slug'],
        'changefreq' => 'monthly',
        'priority' => '0.8',
    ];
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($routes as $route) : ?>
  <url>
    <loc><?= e(absolute_url($route['path'])) ?></loc>
    <lastmod><?= $lastmod ?></lastmod>
    <changefreq><?= $route['changefreq'] ?></changefreq>
    <priority><?= $route['priority'] ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
