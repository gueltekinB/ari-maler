<?php
require __DIR__ . '/includes/bootstrap.php';
require __DIR__ . '/includes/contact-mailer.php';

$formError = null;
$old = ['name' => '', 'email' => '', 'phone' => '', 'subject' => '', 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = handle_contact_form($_POST);
    if ($result['success']) {
        // Post/Redirect/Get: verhindert erneutes Senden beim Aktualisieren.
        header('Location: /kontakt?gesendet=1', true, 303);
        exit;
    }
    $formError = $result['error'];
    foreach ($old as $key => $_) {
        $old[$key] = trim((string) ($_POST[$key] ?? ''));
    }
}

$formSuccess = isset($_GET['gesendet']);

$page = [
    'title' => 'Kontakt',
    'description' => 'Nehmen Sie Kontakt mit Ari Maler GmbH auf – wir freuen uns auf Ihre Anfrage.',
    'canonical' => '/kontakt',
];

require __DIR__ . '/includes/page-header.php';

render_page_hero([
    'subtitle' => 'Haben Sie Fragen oder sind Sie an unseren Dienstleistungen interessiert?',
    'title' => 'Kontakt',
    'description' => 'Verwenden Sie das untenstehende Formular, um uns eine direkte Nachricht zu senden oder eine gezielte Angebotsanfrage zu stellen. Wir werden uns umgehend bei Ihnen melden.',
]);

$inputClass = 'w-full border border-gray-300 rounded px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors';
$labelClass = 'block text-sm font-medium text-navy mb-1';
?>

<section class="py-16 md:py-20 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-12">
      <div class="md:col-span-2">
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-navy mb-4">Kontaktangaben</h2>
            <p class="text-gray-600 leading-relaxed">
              Wir freuen uns auf Ihre Anfrage und melden uns so schnell wie möglich bei Ihnen.
            </p>
          </div>

          <div class="space-y-5">
            <div class="flex gap-4 items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white mt-1">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-navy">Adresse</p>
                <address class="not-italic text-gray-600 text-sm mt-1">
                  Therwilerstrasse 24<br>
                  4103 Bottmingen<br>
                  Schweiz
                </address>
              </div>
            </div>

            <div class="flex gap-4 items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white mt-1">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-navy">Telefon</p>
                <a href="tel:0797996262" class="text-gray-600 text-sm mt-1 block hover:text-accent transition-colors">079 799 62 62</a>
              </div>
            </div>

            <div class="flex gap-4 items-start">
              <div class="flex-shrink-0 w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white mt-1">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-navy">E-Mail</p>
                <a href="mailto:info@ari-maler.ch" class="text-gray-600 text-sm mt-1 block hover:text-accent transition-colors">info@ari-maler.ch</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-3">
        <h2 class="text-2xl font-bold text-navy mb-6">Nachricht senden</h2>
        <form method="post" action="/kontakt" class="space-y-5">
          <!-- Honeypot gegen Spam-Bots – für echte Nutzer unsichtbar, siehe contact-mailer.php -->
          <div class="absolute -left-[9999px] top-auto" aria-hidden="true">
            <label for="website">Website</label>
            <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label for="name" class="<?= $labelClass ?>">Name <span class="text-cta">*</span></label>
              <input id="name" name="name" type="text" required minlength="2" maxlength="100" value="<?= e($old['name']) ?>" class="<?= $inputClass ?>" placeholder="Ihr vollständiger Name">
            </div>
            <div>
              <label for="email" class="<?= $labelClass ?>">E-Mail <span class="text-cta">*</span></label>
              <input id="email" name="email" type="email" required value="<?= e($old['email']) ?>" class="<?= $inputClass ?>" placeholder="ihre@email.ch">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label for="phone" class="<?= $labelClass ?>">Telefon <span class="text-gray-400">(optional)</span></label>
              <input id="phone" name="phone" type="tel" maxlength="50" value="<?= e($old['phone']) ?>" class="<?= $inputClass ?>" placeholder="079 000 00 00">
            </div>
            <div>
              <label for="subject" class="<?= $labelClass ?>">Betreff <span class="text-cta">*</span></label>
              <input id="subject" name="subject" type="text" required minlength="3" maxlength="150" value="<?= e($old['subject']) ?>" class="<?= $inputClass ?>" placeholder="z.B. Anfrage Innenmalerei">
            </div>
          </div>

          <div>
            <label for="message" class="<?= $labelClass ?>">Ihre Nachricht <span class="text-cta">*</span></label>
            <textarea id="message" name="message" required minlength="10" maxlength="2000" rows="6" class="<?= $inputClass ?> resize-none" placeholder="Beschreiben Sie Ihr Vorhaben..."><?= e($old['message']) ?></textarea>
          </div>

          <?php if ($formSuccess) : ?>
            <div class="bg-green-50 border border-green-200 rounded p-4 text-green-800 text-sm">
              Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns so schnell wie möglich bei Ihnen.
            </div>
          <?php endif; ?>

          <?php if ($formError) : ?>
            <div class="bg-red-50 border border-red-200 rounded p-4 text-red-800 text-sm">
              <?= e($formError) ?>
            </div>
          <?php endif; ?>

          <button type="submit" class="w-full sm:w-auto bg-cta hover:bg-cta-hover disabled:opacity-60 text-white font-semibold px-8 py-3 rounded transition-colors cursor-pointer">
            Nachricht senden
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/page-footer.php';
