<?php
require __DIR__ . '/includes/bootstrap.php';

$page = [
    'title' => 'Datenschutzerklärung',
    'canonical' => '/datenschutz',
];

require __DIR__ . '/includes/page-header.php';

render_page_hero(['title' => 'Datenschutzerklärung']);
?>

<section class="py-16 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 text-sm leading-relaxed space-y-8">
    <p class="text-gray-500 italic">Zuletzt aktualisiert: Juli 2026</p>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">1. Verantwortliche Stelle</h2>
      <p>
        Verantwortlich für die Datenbearbeitung auf dieser Website ist:<br>
        <strong>Ari Maler GmbH</strong><br>
        Therwilerstrasse 24, 4103 Bottmingen<br>
        E-Mail: info@ari-maler.ch<br>
        Telefon: 079 799 62 62
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">2. Datenerfassung auf dieser Website</h2>
      <h3 class="font-semibold text-navy mb-2">Kontaktformular</h3>
      <p>
        Wenn Sie uns über das Kontaktformular eine Nachricht senden, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Betreff und Nachrichtentext) zur Bearbeitung Ihrer Anfrage erhoben und gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben. Die Übertragung erfolgt per E-Mail über den Mailserver unseres Hosting-Anbieters.
      </p>
      <h3 class="font-semibold text-navy mb-2 mt-4">Server-Logfiles</h3>
      <p>
        Der Hosting-Anbieter dieser Website erhebt automatisch Informationen, die Ihr Browser übermittelt. Dazu gehören Browsertyp, Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners und Uhrzeit der Serveranfrage. Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt.
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">3. Cookies und Webanalyse (Google Analytics)</h2>
      <p>
        Diese Website verwendet Google Analytics 4, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland («Google»). Google Analytics kommt nur zum Einsatz, wenn Sie beim Besuch der Website über den Cookie-Hinweis ausdrücklich einwilligen («Akzeptieren»). Ohne Ihre Einwilligung werden keine Analyse-Cookies gesetzt und keine Daten an Google übermittelt.
      </p>
      <p class="mt-2">
        Bei erteilter Einwilligung setzt Google Analytics Cookies (u. a. «_ga», «_ga_*», Speicherdauer bis zu 24 Monate), die eine Auswertung Ihrer Nutzung der Website ermöglichen (z. B. besuchte Seiten, Verweildauer, ungefähre Herkunft, verwendetes Gerät). Die erhobenen Informationen werden an Server von Google übertragen und dort verarbeitet; eine Übermittlung in die USA ist möglich. Google LLC ist nach dem Swiss–U.S. Data Privacy Framework zertifiziert, das ein angemessenes Datenschutzniveau gewährleistet. IP-Adressen werden in Google Analytics 4 nicht gespeichert.
      </p>
      <p class="mt-2">
        Daneben setzt die Website das technisch notwendige Cookie «cookie_consent», das ausschliesslich Ihre Cookie-Entscheidung speichert (Speicherdauer 12 Monate).
      </p>
      <p class="mt-2">
        Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder ändern, indem Sie am Seitenende auf «Cookie-Einstellungen» klicken.
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">4. Zweck der Datenbearbeitung</h2>
      <p>
        Wir verwenden Ihre Kontaktdaten ausschliesslich zur Beantwortung Ihrer Anfragen und zur Abwicklung von Aufträgen. Eine darüber hinausgehende Nutzung oder Weitergabe an Dritte findet nicht statt, sofern keine gesetzliche Pflicht dazu besteht.
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">5. Aufbewahrung</h2>
      <p>
        Personenbezogene Daten aus dem Kontaktformular werden nur so lange aufbewahrt, wie dies für die Bearbeitung Ihrer Anfrage erforderlich ist, oder soweit gesetzliche Aufbewahrungspflichten bestehen (z. B. für Vertragsunterlagen bis zu 10 Jahre).
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, auf Berichtigung, Löschung oder Einschränkung der Bearbeitung sowie auf Datenübertragbarkeit. Wenden Sie sich dazu bitte an info@ari-maler.ch.
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">7. SSL-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an «https://» in Ihrer Browserzeile.
      </p>
    </div>

    <div>
      <h2 class="text-navy font-bold text-xl mb-3">8. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar. Wir empfehlen, diese Seite regelmässig zu besuchen.
      </p>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/page-footer.php';
