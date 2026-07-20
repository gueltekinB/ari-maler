<?php
require __DIR__ . '/includes/bootstrap.php';

$page = [
    'title' => 'Impressum',
    'canonical' => '/impressum',
];

require __DIR__ . '/includes/page-header.php';

render_page_hero(['title' => 'Impressum']);
?>

<section class="py-16 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700">
    <h2 class="text-navy font-bold text-xl mb-4">Unternehmensangaben</h2>
    <address class="not-italic mb-8 space-y-1">
      <p class="font-semibold">Ari Maler GmbH</p>
      <p>Therwilerstrasse 24</p>
      <p>4103 Bottmingen</p>
      <p>Schweiz</p>
      <p class="mt-3">
        <strong>Telefon:</strong>
        <a href="tel:0797996262" class="text-accent hover:underline">079 799 62 62</a>
      </p>
      <p>
        <strong>E-Mail:</strong>
        <a href="mailto:info@ari-maler.ch" class="text-accent hover:underline">info@ari-maler.ch</a>
      </p>
    </address>

    <h2 class="text-navy font-bold text-xl mb-4">Vertretungsberechtigte Person</h2>
    <p class="mb-8">Toylan Ari, Inhaber und Geschäftsführer</p>

    <h2 class="text-navy font-bold text-xl mb-4">Handelsregistereintrag</h2>
    <p class="mb-2">UID-Nummer: CHE-280.849.351</p>
    <p class="mb-8">Eingetragen im Handelsregister des Kantons Basel-Landschaft</p>

    <h2 class="text-navy font-bold text-xl mb-4">Haftungsausschluss</h2>
    <p class="mb-4 text-sm leading-relaxed">
      Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
    </p>
    <p class="mb-8 text-sm leading-relaxed">
      Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
    </p>

    <h2 class="text-navy font-bold text-xl mb-4">Urheberrechte</h2>
    <p class="text-sm leading-relaxed">
      Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich Ari Maler GmbH oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
    </p>
  </div>
</section>

<?php require __DIR__ . '/includes/page-footer.php';
