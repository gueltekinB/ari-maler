<?php
require __DIR__ . '/includes/bootstrap.php';

$page = [
    'title' => 'Über uns',
    'description' => 'Lernen Sie Ari Maler GmbH kennen – seit 2022 Ihr zuverlässiger Malerpartner in der Region Basel.',
    'canonical' => '/ueber-uns',
];

$values = [
    [
        'icon' => '🔨',
        'title' => 'Fleiss',
        'text' => 'Jeder Auftrag wird mit vollem Einsatz und Sorgfalt ausgeführt – unabhängig von der Grösse des Projekts.',
    ],
    [
        'icon' => '🎯',
        'title' => 'Ehrgeiz',
        'text' => 'Wir setzen uns hohe Ziele und geben uns nicht mit dem Mittelmas zufrieden. Qualität ist für uns keine Option, sondern ein Versprechen.',
    ],
    [
        'icon' => '☀️',
        'title' => 'Optimismus',
        'text' => 'Wir begegnen jedem Projekt mit einer positiven Einstellung und der Überzeugung, dass für jede Herausforderung eine gute Lösung existiert.',
    ],
];

require __DIR__ . '/includes/page-header.php';

render_page_hero([
    'subtitle' => 'Seit 2022 für Sie im Einsatz',
    'title' => 'Über uns',
    'description' => 'Lernen Sie uns kennen – Ihr zuverlässiger Partner für Malerarbeiten und Sanierungen in der Region Basel.',
]);
?>

<section class="py-20 bg-white">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
      <div>
        <?php render_section_header([
            'subtitle' => 'Unser Unternehmen',
            'title' => 'Ari Maler GmbH',
        ]); ?>
        <p class="text-gray-600 leading-relaxed mt-4">
          Die Ari Maler GmbH wurde am 14. März 2022 gegründet mit dem Ziel, sich als zuverlässiger Malerpartner in der Region Basel zu etablieren. Was als Einzelunternehmen begann, hat sich seither zu einem kompetenten Malerbetrieb entwickelt, der für seine handwerkliche Qualität und Kundennähe bekannt ist.
        </p>
        <p class="text-gray-600 leading-relaxed mt-4">
          Unser Angebot umfasst das gesamte Spektrum an Malerarbeiten – von der Innenraumgestaltung bis zur Fassadenrenovierung, von der Betonkosmetik bis zur Sanierung nach Brand- oder Wasserschäden.
        </p>
      </div>
      <div class="bg-off-white rounded-lg p-8 border-l-4 border-cta">
        <p class="text-5xl font-bold text-navy mb-2">2022</p>
        <p class="text-gray-600">Gründungsjahr</p>
        <hr class="my-4 border-gray-200">
        <p class="text-navy font-semibold text-lg">Region Basel</p>
        <p class="text-gray-600 text-sm mt-1">Bottmingen &amp; Umgebung</p>
      </div>
    </div>

    <div class="mb-20">
      <?php render_section_header([
          'subtitle' => 'Unser Gründer',
          'title' => 'Toylan Ari',
          'description' => 'Inhaber und Geschäftsführer',
      ]); ?>
      <div class="mt-6 space-y-4 text-gray-600 leading-relaxed max-w-3xl">
        <p>
          Toylan Ari ist in Basel aufgewachsen und hat von Kindesbeinen an eine grosse Leidenschaft für das Malerhandwerk entwickelt. Nach seiner abgeschlossenen Malerausbildung und verschiedenen Weiterbildungskursen sammelte er wertvolle Erfahrung in renommierten Malerbetrieben der Region.
        </p>
        <p>
          Als verantwortlicher Leiter zahlreicher Bauprojekte erwarb er das notwendige Know-how, um anspruchsvolle Aufträge termingerecht und in höchster Qualität auszuführen. Diese Erfahrung fliesst heute direkt in die Arbeit der Ari Maler GmbH ein.
        </p>
        <p>
          Sein besonderes Fachwissen liegt im Bereich der Betonkosmetik sowie der dekorativen Wandgestaltung – zwei Disziplinen, die handwerkliches Können mit kreativem Gespür verbinden.
        </p>
      </div>
    </div>

    <div>
      <?php render_section_header([
          'subtitle' => 'Unsere Werte',
          'title' => 'Fleiss, Ehrgeiz und Optimismus',
      ]); ?>
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <?php foreach ($values as $value) : ?>
          <div class="bg-off-white rounded-lg p-6 text-center">
            <div class="text-4xl mb-4"><?= e($value['icon']) ?></div>
            <h3 class="text-navy font-bold text-lg mb-2"><?= e($value['title']) ?></h3>
            <p class="text-gray-600 text-sm leading-relaxed"><?= e($value['text']) ?></p>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="mt-10 text-center">
        <?php render_button('/kontakt', 'Kontaktieren Sie uns', 'primary', 'text-base px-8 py-4'); ?>
      </div>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/page-footer.php';
