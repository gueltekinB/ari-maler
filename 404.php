<?php
require __DIR__ . '/includes/bootstrap.php';

http_response_code(404);

$page = [
    'title' => 'Seite nicht gefunden',
    'canonical' => '/404',
    'noindex' => true,
];

require __DIR__ . '/includes/page-header.php';
?>

<section class="min-h-[60vh] flex items-center justify-center bg-white">
  <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
    <p class="text-cta text-sm font-semibold uppercase tracking-widest mb-3">Fehler 404</p>
    <h1 class="text-3xl md:text-4xl font-bold text-navy mb-4">Diese Seite gibt es nicht (mehr)</h1>
    <p class="text-gray-600 leading-relaxed mb-8">
      Möglicherweise wurde die Seite verschoben oder existiert nicht mehr. Nutzen Sie einen der
      folgenden Links, um weiterzukommen.
    </p>
    <div class="flex flex-wrap gap-4 justify-center items-center">
      <?php render_button('/', 'Zur Startseite', 'primary'); ?>
      <a href="/dienstleistungen" class="text-navy font-semibold hover:underline">Dienstleistungen ansehen</a>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/page-footer.php';
