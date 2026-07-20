<?php
require __DIR__ . '/includes/bootstrap.php';

$page = [
    'title' => 'Dienstleistungen',
    'description' => 'Professionelle Malerarbeiten und Sanierungen: Innenmalerei, Aussenmalerei, Betonkosmetik, Dekorationsarbeiten und mehr.',
    'canonical' => '/dienstleistungen',
];

require __DIR__ . '/includes/page-header.php';

render_page_hero([
    'subtitle' => 'Professionell & zuverlässig',
    'title' => 'Dienstleistungen',
    'description' => 'Haben Sie eine Vision? Lassen Sie uns zusammenarbeiten, um sie Wirklichkeit werden zu lassen. Ihre persönlichen Wünsche sind bei uns in besten Händen.',
]);
?>

<section class="py-20 bg-off-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <?php foreach ($services as $service) : ?>
        <?php render_service_card($service, 'h2'); ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php render_call_to_action(); ?>

<?php require __DIR__ . '/includes/page-footer.php';
