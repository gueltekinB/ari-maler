  </main>
  <footer class="bg-navy text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <img src="/images/logo/logo-weiss.webp" alt="Ari Maler GmbH" width="140" height="84" loading="lazy" class="h-12 w-auto object-contain mb-4">
          <p class="text-white/70 text-sm leading-relaxed">
            Ihr zuverlässiger Partner für Malerarbeiten und Sanierungen in Basel-Stadt und Baselland. Qualität, Präzision und Kundenzufriedenheit stehen bei uns an erster Stelle.
          </p>
        </div>

        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Dienstleistungen</h3>
          <ul class="space-y-2">
            <?php foreach ($services as $s) : ?>
              <li>
                <a href="/dienstleistungen/<?= e($s['slug']) ?>" class="text-white/70 hover:text-white text-sm transition-colors"><?= e($s['navLabel']) ?></a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Kontakt</h3>
          <address class="not-italic text-white/70 text-sm space-y-2">
            <p>Ari Maler GmbH</p>
            <p>Therwilerstrasse 24</p>
            <p>4103 Bottmingen</p>
            <p class="pt-2">
              <a href="tel:0797996262" class="hover:text-white transition-colors">079 799 62 62</a>
            </p>
            <p>
              <a href="mailto:info@ari-maler.ch" class="hover:text-white transition-colors">info@ari-maler.ch</a>
            </p>
          </address>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-xs">
        <p>&copy; <?= date('Y') ?> Ari Maler GmbH. Alle Rechte vorbehalten.</p>
        <div class="flex gap-4">
          <a href="/impressum" class="hover:text-white transition-colors">Impressum</a>
          <a href="/datenschutz" class="hover:text-white transition-colors">Datenschutz</a>
          <?php if (GA4_MEASUREMENT_ID !== '') : ?>
            <button type="button" data-cookie-settings class="hover:text-white transition-colors">Cookie-Einstellungen</button>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </footer>
  <?php if (GA4_MEASUREMENT_ID !== '') {
      require __DIR__ . '/cookie-banner.php';
  } ?>
</body>
</html>
