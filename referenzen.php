<?php
require __DIR__ . '/includes/bootstrap.php';

$page = [
    'title' => 'Referenzen',
    'description' => 'Einblick in unsere Referenzen – überzeugen Sie sich von der Qualität unserer Malerarbeiten und Sanierungen.',
    'canonical' => '/referenzen',
];

$items = array_values(array_filter($beforeAfter, function ($item) use ($homeFeaturedIds) {
    return !in_array($item['id'], $homeFeaturedIds, true);
}));

require __DIR__ . '/includes/page-header.php';

render_page_hero([
    'subtitle' => 'Weil Bilder mehr als tausend Worte sagen',
    'title' => 'Referenzen',
    'description' => 'Nachfolgend erhalten Sie Einblick in unsere Referenzen. Lassen Sie sich von unserer Expertise überzeugen!',
]);

foreach ($items as $index => $item) :
?>
<section class="py-16 md:py-20 border-t border-gray-100 first:border-t-0 <?= $index % 2 === 0 ? 'bg-white' : 'bg-gray-100' ?>">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <div class="<?= $index % 2 === 1 ? 'md:order-2' : '' ?>">
        <?php render_before_after_slider($item['before'], $item['after']); ?>
      </div>
      <div class="<?= $index % 2 === 1 ? 'md:order-1' : '' ?>">
        <h3 class="text-xl sm:text-2xl font-bold text-navy mb-3"><?= e($item['title']) ?></h3>
        <p class="text-gray-600 leading-relaxed"><?= e($item['description']) ?></p>
      </div>
    </div>
  </div>
</section>
<?php endforeach; ?>

<?php render_call_to_action(); ?>

<?php require __DIR__ . '/includes/page-footer.php';
