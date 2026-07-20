<?php
require __DIR__ . '/includes/bootstrap.php';

// Wird über .htaccess als /dienstleistungen/<slug> aufgerufen.
$slug = (string) ($_GET['slug'] ?? '');
$service = find_service($services, $slug);

if ($service === null) {
    require __DIR__ . '/404.php';
    exit;
}

$page = [
    'title' => $service['navLabel'] . ' in Basel & Region',
    'description' => $service['heroSubtitle'] . ' – Ari Maler GmbH, Ihr Malerbetrieb für Basel-Stadt und Baselland.',
    'canonical' => '/dienstleistungen/' . $service['slug'],
    'breadcrumbs' => [
        ['name' => 'Startseite', 'path' => '/'],
        ['name' => 'Dienstleistungen', 'path' => '/dienstleistungen'],
        ['name' => $service['navLabel'], 'path' => '/dienstleistungen/' . $service['slug']],
    ],
];

require __DIR__ . '/includes/page-header.php';

render_page_hero([
    'subtitle' => $service['heroSubtitle'],
    'title' => $service['title'],
    'bg_image' => $service['images'][0],
]);

foreach ($service['offerings'] as $i => $offering) :
    $image = $service['images'][$i + 1] ?? $service['images'][0];
?>
<section class="py-16 md:py-20 <?= $i > 0 ? 'border-t border-gray-100' : '' ?> <?= $i % 2 === 0 ? 'bg-white' : 'bg-gray-100' ?>">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row gap-10 items-center <?= $i % 2 === 1 ? 'md:flex-row-reverse' : '' ?>">
      <div class="flex-1">
        <?php render_section_header(['title' => $offering['title']]); ?>
        <p class="text-gray-600 leading-relaxed mt-2"><?= e($offering['description']) ?></p>
      </div>
      <div class="flex-1 w-full">
        <div class="relative aspect-[3/2] rounded-lg overflow-hidden shadow-md">
          <img src="<?= e($image) ?>" alt="<?= e($offering['title']) ?>" loading="lazy" class="w-full h-full object-cover">
        </div>
      </div>
    </div>
  </div>
</section>
<?php endforeach; ?>

<?php render_call_to_action(); ?>

<?php require __DIR__ . '/includes/page-footer.php';
