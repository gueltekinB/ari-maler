<?php

/**
 * Seitenkopf: <head>, Header-Navigation, öffnet <main>.
 *
 * Erwartet ein $page-Array:
 *   title       – Seitentitel ohne Suffix (null = Standardtitel der Startseite)
 *   description – Meta-Description (null = Standard)
 *   canonical   – Pfad der Seite, z. B. '/kontakt'
 *   is_home     – true auf der Startseite (Header-Verhalten)
 *   noindex     – true für "noindex, follow"
 *   breadcrumbs – optional: Liste von ['name' => ..., 'path' => ...] für JSON-LD
 */

$pageTitle = isset($page['title']) && $page['title'] !== null
    ? $page['title'] . ' | ' . SITE_NAME
    : DEFAULT_TITLE;
$pageDescription = $page['description'] ?? DEFAULT_DESCRIPTION;
$canonical = absolute_url($page['canonical'] ?? '/');
$isHome = $page['is_home'] ?? false;

$localBusinessJsonLd = [
    '@context' => 'https://schema.org',
    '@type' => 'HomeAndConstructionBusiness',
    'name' => SITE_NAME,
    'image' => absolute_url('/images/logo/logo-original.webp'),
    'url' => SITE_URL,
    'telephone' => '+41797996262',
    'email' => 'info@ari-maler.ch',
    'address' => [
        '@type' => 'PostalAddress',
        'streetAddress' => 'Therwilerstrasse 24',
        'postalCode' => '4103',
        'addressLocality' => 'Bottmingen',
        'addressCountry' => 'CH',
    ],
    'areaServed' => array_merge(
        [
            ['@type' => 'AdministrativeArea', 'name' => 'Basel-Stadt'],
            ['@type' => 'AdministrativeArea', 'name' => 'Basel-Landschaft'],
        ],
        array_map(fn ($town) => ['@type' => 'City', 'name' => $town], $serviceAreas)
    ),
    'founder' => [
        '@type' => 'Person',
        'name' => 'Toylan Ari',
    ],
];

$breadcrumbJsonLd = null;
if (!empty($page['breadcrumbs'])) {
    $items = [];
    foreach ($page['breadcrumbs'] as $i => $crumb) {
        $items[] = [
            '@type' => 'ListItem',
            'position' => $i + 1,
            'name' => $crumb['name'],
            'item' => absolute_url($crumb['path']),
        ];
    }
    $breadcrumbJsonLd = [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => $items,
    ];
}
?>
<!DOCTYPE html>
<html lang="de" class="h-full scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($pageTitle) ?></title>
  <meta name="description" content="<?= e($pageDescription) ?>">
  <link rel="canonical" href="<?= e($canonical) ?>">
  <?php if (!empty($page['noindex'])) : ?>
  <meta name="robots" content="noindex, follow">
  <?php endif; ?>
  <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:locale" content="de_CH">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?= e(SITE_NAME) ?>">
  <meta property="og:title" content="<?= e($pageTitle) ?>">
  <meta property="og:description" content="<?= e($pageDescription) ?>">
  <meta property="og:url" content="<?= e($canonical) ?>">
  <meta property="og:image" content="<?= e(absolute_url('/images/hero/pinsel.webp')) ?>">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Ari Maler GmbH – Malerarbeiten &amp; Sanierungen">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= e($pageTitle) ?>">
  <meta name="twitter:description" content="<?= e($pageDescription) ?>">
  <meta name="twitter:image" content="<?= e(absolute_url('/images/hero/pinsel.webp')) ?>">
  <link rel="stylesheet" href="<?= e(asset_url('/assets/css/styles.css')) ?>">
  <script src="<?= e(asset_url('/assets/js/main.js')) ?>" defer></script>
  <script type="application/ld+json"><?= json_encode($localBusinessJsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>
  <?php if ($breadcrumbJsonLd) : ?>
  <script type="application/ld+json"><?= json_encode($breadcrumbJsonLd, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>
  <?php endif; ?>
</head>
<body class="min-h-full flex flex-col antialiased">
  <header data-header <?= $isHome ? 'data-home ' : '' ?>class="site-header <?= $isHome ? 'is-home-top ' : '' ?>sticky top-0 z-50 transition-colors duration-300 border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16 md:h-20">
        <a href="/" data-logo-link class="flex items-center gap-3 flex-shrink-0">
          <img src="/images/logo/logo-weiss.webp" alt="Ari Maler GmbH Logo" width="120" height="72" class="h-10 w-auto object-contain">
        </a>

        <nav class="hidden md:flex items-center gap-6">
          <ul class="flex items-center gap-6">
            <li class="relative group">
              <a href="/dienstleistungen" class="flex items-center gap-1 text-white/90 hover:text-white font-medium py-2 transition-colors">
                Dienstleistungen
                <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div class="absolute top-full left-0 hidden group-hover:block min-w-72 bg-navy-dark shadow-xl rounded-b z-50">
                <?php foreach ($services as $s) : ?>
                  <a href="/dienstleistungen/<?= e($s['slug']) ?>" class="block px-5 py-3 text-white/85 hover:text-white hover:bg-navy-light transition-colors text-sm border-b border-white/10 last:border-0"><?= e($s['navLabel']) ?></a>
                <?php endforeach; ?>
              </div>
            </li>
            <li>
              <a href="/referenzen" class="text-white/90 hover:text-white font-medium transition-colors py-2">Referenzen</a>
            </li>
            <li>
              <a href="/ueber-uns" class="text-white/90 hover:text-white font-medium transition-colors py-2">Über uns</a>
            </li>
          </ul>
          <a href="/kontakt" class="bg-cta hover:bg-cta-hover text-white font-semibold px-5 py-2 rounded transition-colors text-sm">Kontakt</a>
        </nav>

        <button data-menu-button aria-expanded="false" class="md:hidden text-white p-2 rounded focus:outline-none" aria-label="Navigation öffnen">
          <svg data-icon-open class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg data-icon-close class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div data-mobile-menu class="hidden md:hidden absolute top-full left-0 right-0 bg-navy-dark shadow-xl z-50">
          <nav class="px-4 py-4 flex flex-col">
            <button data-submenu-button class="flex items-center justify-between text-white/90 hover:text-white font-medium py-3 border-b border-white/10 w-full text-left">
              Dienstleistungen
              <svg class="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div data-submenu class="hidden bg-navy/50 rounded mb-1">
              <a href="/dienstleistungen" class="block px-4 py-2 text-white/70 hover:text-white text-sm border-b border-white/10">Alle Dienstleistungen</a>
              <?php foreach ($services as $s) : ?>
                <a href="/dienstleistungen/<?= e($s['slug']) ?>" class="block px-4 py-2 text-white/70 hover:text-white text-sm border-b border-white/10 last:border-0"><?= e($s['navLabel']) ?></a>
              <?php endforeach; ?>
            </div>
            <a href="/referenzen" class="text-white/90 hover:text-white font-medium py-3 border-b border-white/10 last:border-0">Referenzen</a>
            <a href="/ueber-uns" class="text-white/90 hover:text-white font-medium py-3 border-b border-white/10 last:border-0">Über uns</a>
            <a href="/kontakt" class="text-white/90 hover:text-white font-medium py-3 border-b border-white/10 last:border-0">Kontakt</a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <main class="flex-1">
