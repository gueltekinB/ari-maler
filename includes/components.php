<?php

/**
 * Wiederverwendbare UI-Bausteine. Alle Funktionen geben HTML direkt aus.
 */

/**
 * Grosser Seitenkopf mit optionalem Hintergrundbild.
 *
 * $opts: title (Pflicht), subtitle, description, bg_image
 */
function render_page_hero(array $opts): void
{
    $subtitle = $opts['subtitle'] ?? null;
    $description = $opts['description'] ?? null;
    $bgImage = $opts['bg_image'] ?? null;
?>
<section class="relative py-24 md:py-32 overflow-hidden">
  <?php if ($bgImage) : ?>
    <img src="<?= e($bgImage) ?>" alt="<?= e($opts['title']) ?>" class="absolute inset-0 w-full h-full object-cover" fetchpriority="high">
    <div class="absolute inset-0 bg-navy/75"></div>
  <?php else : ?>
    <div class="absolute inset-0 bg-gradient-to-br from-navy to-navy-light"></div>
  <?php endif; ?>
  <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <?php if ($subtitle) : ?>
      <p class="text-cta text-sm font-semibold uppercase tracking-widest mb-3"><?= e($subtitle) ?></p>
    <?php endif; ?>
    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4"><?= e($opts['title']) ?></h1>
    <?php if ($description) : ?>
      <p class="text-lg text-white/80 max-w-2xl"><?= e($description) ?></p>
    <?php endif; ?>
  </div>
</section>
<?php
}

/**
 * Abschnittsüberschrift.
 *
 * $opts: title (Pflicht), subtitle, description, light (bool), center (bool)
 */
function render_section_header(array $opts): void
{
    $subtitle = $opts['subtitle'] ?? null;
    $description = $opts['description'] ?? null;
    $light = $opts['light'] ?? false;
    $center = $opts['center'] ?? false;
?>
<div class="<?= $center ? 'text-center' : '' ?>">
  <?php if ($subtitle) : ?>
    <p class="text-sm font-semibold uppercase tracking-widest mb-2 <?= $light ? 'text-cta' : 'text-accent' ?>"><?= e($subtitle) ?></p>
  <?php endif; ?>
  <h2 class="text-3xl md:text-4xl font-bold mb-4 <?= $light ? 'text-white' : 'text-navy' ?>"><?= e($opts['title']) ?></h2>
  <?php if ($description) : ?>
    <p class="text-lg max-w-2xl <?= $center ? 'mx-auto' : '' ?> <?= $light ? 'text-white/80' : 'text-gray-600' ?>"><?= e($description) ?></p>
  <?php endif; ?>
</div>
<?php
}

/**
 * Button-Link im CTA-Stil.
 */
function render_button(string $href, string $label, string $variant = 'primary', string $extraClass = ''): void
{
    $variants = [
        'primary' => 'bg-cta text-white hover:bg-cta-hover',
        'outline' => 'border-2 border-white text-white hover:bg-white hover:text-navy',
        'white' => 'bg-white text-navy hover:bg-off-white',
    ];
    $cls = 'inline-block px-6 py-3 rounded font-semibold text-sm transition-colors duration-200 cursor-pointer '
        . ($variants[$variant] ?? $variants['primary'])
        . ($extraClass !== '' ? ' ' . $extraClass : '');
?>
<a href="<?= e($href) ?>" class="<?= e($cls) ?>"><?= e($label) ?></a>
<?php
}

/**
 * "Bereit für Ihr nächstes Projekt?"-Block am Seitenende.
 */
function render_call_to_action(): void
{
?>
<section class="bg-navy py-16">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
    <div>
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Bereit für Ihr nächstes Projekt?</h2>
      <p class="text-white/75">Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot.</p>
      <p class="text-white font-semibold mt-2">
        <a href="tel:0797996262" class="hover:text-cta transition-colors">079 799 62 62</a>
      </p>
    </div>
    <div class="flex-shrink-0">
      <?php render_button('/kontakt', 'Jetzt Kontaktieren', 'primary', 'text-base px-8 py-4'); ?>
    </div>
  </div>
</section>
<?php
}

/**
 * Vorher/Nachher-Slider (interaktiv via assets/js/main.js).
 */
function render_before_after_slider(string $before, string $after, ?string $title = null): void
{
    $beforeAlt = $title ? $title . ' – Vorher' : 'Vorher';
    $afterAlt = $title ? $title . ' – Nachher' : 'Nachher';
?>
<div>
  <div data-ba-slider class="relative w-full aspect-4/3 overflow-hidden rounded-lg cursor-col-resize select-none bg-off-white shadow-md">
    <img src="<?= e($before) ?>" alt="<?= e($beforeAlt) ?>" draggable="false" loading="lazy" class="absolute inset-0 w-full h-full object-cover pointer-events-none">
    <div data-ba-after class="absolute inset-0 pointer-events-none" style="clip-path: inset(0 50% 0 0)">
      <img src="<?= e($after) ?>" alt="<?= e($afterAlt) ?>" draggable="false" loading="lazy" class="w-full h-full object-cover">
    </div>

    <div data-ba-label-after class="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-accent/85 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider pointer-events-none transition-opacity duration-150" style="opacity: 1">
      Nachher
    </div>
    <div data-ba-label-before class="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-navy/55 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider pointer-events-none transition-opacity duration-150" style="opacity: 1">
      Vorher
    </div>

    <div data-ba-handle class="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none" style="left: 50%; transform: translateX(-1px)">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] flex items-center justify-center gap-[3px]">
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M5 1L1 6L5 11" stroke="#1e3a5f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M3 1L7 6L3 11" stroke="#1e3a5f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
  <?php if ($title) : ?>
    <div class="mt-3 text-[15px] font-bold text-navy"><?= e($title) ?></div>
  <?php endif; ?>
</div>
<?php
}

/**
 * Karte einer Dienstleistung für die Übersichts-Grids.
 * $headingTag: 'h2' auf der Dienstleistungsübersicht, 'h3' auf der Startseite.
 * $clamp: Beschreibung auf drei Zeilen kürzen (Startseite).
 */
function render_service_card(array $service, string $headingTag = 'h3', bool $clamp = false): void
{
?>
<a href="/dienstleistungen/<?= e($service['slug']) ?>" class="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
  <div class="relative h-52 overflow-hidden">
    <img src="<?= e($service['images'][0]) ?>" alt="<?= e($service['navLabel']) ?>" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
  </div>
  <div class="p-6">
    <<?= $headingTag ?> class="text-navy font-bold text-lg mb-2 group-hover:text-accent transition-colors"><?= e($service['navLabel']) ?></<?= $headingTag ?>>
    <p class="text-gray-600 text-sm leading-relaxed<?= $clamp ? ' line-clamp-3' : '' ?>"><?= e($service['heroSubtitle']) ?></p>
    <span class="inline-block mt-4 text-sm font-semibold text-cta group-hover:underline">Mehr erfahren →</span>
  </div>
</a>
<?php
}
