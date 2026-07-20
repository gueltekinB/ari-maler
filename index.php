<?php
require __DIR__ . '/includes/bootstrap.php';

$page = [
    'title' => null,
    'description' => null,
    'canonical' => '/',
    'is_home' => true,
];

$featured = [];
foreach ($homeFeaturedIds as $id) {
    foreach ($beforeAfter as $item) {
        if ($item['id'] === $id) {
            $featured[] = $item;
        }
    }
}

require __DIR__ . '/includes/page-header.php';
?>

<section class="relative min-h-screen flex items-center">
  <img src="/images/hero/pinsel.webp" alt="Ari Maler GmbH – Professionelle Malerarbeiten" fetchpriority="high" class="absolute inset-0 w-full h-full object-cover">
  <div class="absolute inset-0 bg-navy/65"></div>
  <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <p class="text-cta text-sm font-semibold uppercase tracking-widest mb-4">
      Ihr Experte für Malerarbeiten und Sanierungen aus der Region
    </p>
    <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
      Willkommen bei<br>Ari Maler GmbH
    </h1>
    <p class="text-lg md:text-xl text-white/80 max-w-2xl mb-10">
      Wir stehen Ihnen mit unserer Expertise im Bereich Malerarbeiten und Sanierungen zur Seite. Ob Innen- oder Aussenmalerei, Betonkosmetik oder Brand- und Wasserschadensanierung – wir bieten Ihnen ein umfassendes Leistungsspektrum mit höchsten Qualitätsstandards.
    </p>
    <div class="flex flex-wrap gap-4">
      <?php render_button('/dienstleistungen', 'Unsere Dienstleistungen', 'primary'); ?>
      <?php render_button('/kontakt', 'Kontaktieren Sie uns', 'outline'); ?>
    </div>
  </div>
</section>

<section class="py-20 bg-gray-100 border-y border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-12">
      <?php render_section_header([
          'subtitle' => 'Vorher & Nachher',
          'title' => 'Unsere Arbeit spricht für sich',
          'description' => 'Ein Blick auf einige unserer Projekte – ziehen Sie den Regler, um die Verwandlung zu sehen.',
          'center' => true,
      ]); ?>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($featured as $item) : ?>
        <?php render_before_after_slider($item['before'], $item['after'], $item['title']); ?>
      <?php endforeach; ?>
    </div>
    <div class="mt-12 text-center">
      <?php render_button('/referenzen', 'Alle Referenzen ansehen', 'primary'); ?>
    </div>
  </div>
</section>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-12">
      <?php render_section_header([
          'subtitle' => 'Professionell & zuverlässig',
          'title' => 'Unsere Dienstleistungen',
          'description' => 'Haben Sie eine Vision? Lassen Sie uns zusammenarbeiten, um sie Wirklichkeit werden zu lassen. Ihre persönlichen Wünsche sind bei uns in besten Händen.',
      ]); ?>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($services as $service) : ?>
        <?php render_service_card($service, 'h3', true); ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="py-20 bg-off-white border-t border-gray-200">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <?php render_section_header([
        'subtitle' => 'Unser Einzugsgebiet',
        'title' => 'Ihr Malerbetrieb für Basel-Stadt und Baselland',
        'description' => 'Von unserem Standort in Bottmingen aus sind wir schnell und zuverlässig in der ganzen Region für Sie im Einsatz – unter anderem in:',
        'center' => true,
    ]); ?>
    <ul class="mt-8 flex flex-wrap justify-center gap-2">
      <?php foreach ($serviceAreas as $town) : ?>
        <li class="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-navy font-medium"><?= e($town) ?></li>
      <?php endforeach; ?>
    </ul>
    <p class="mt-6 text-gray-600 text-sm">… sowie in allen weiteren Gemeinden der Region Basel.</p>
  </div>
</section>

<?php render_call_to_action(); ?>

<?php require __DIR__ . '/includes/page-footer.php';
