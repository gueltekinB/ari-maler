<?php

/**
 * Cookie-Consent-Banner für Google Analytics.
 *
 * Wird von page-footer.php nur eingebunden, wenn GA4_MEASUREMENT_ID gesetzt
 * ist. Der Banner selbst erscheint auf allen Hosts (Kontrolle auf der
 * Vorschau möglich); das GA-Script lädt das JS aber nur bei
 * data-ga-active="1", also auf der Live-Domain.
 */

$gaHttpHost = strtolower($_SERVER['HTTP_HOST'] ?? '');
$gaIsLiveHost = in_array($gaHttpHost, ['ari-maler.ch', 'www.ari-maler.ch'], true);
?>
<div data-cookie-banner
     data-ga-id="<?= e(GA4_MEASUREMENT_ID) ?>"
     data-ga-active="<?= $gaIsLiveHost ? '1' : '0' ?>"
     role="region" aria-label="Cookie-Hinweis"
     class="hidden fixed bottom-0 inset-x-0 z-50 bg-navy border-t border-white/10 text-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
    <p class="text-sm text-white/85 text-center sm:text-left">
      Wir verwenden Cookies für die Besucherstatistik (Google Analytics), um unsere Website zu verbessern.
      Details finden Sie in der <a href="/datenschutz" class="underline hover:text-white transition-colors">Datenschutzerklärung</a>.
    </p>
    <div class="flex gap-3 flex-shrink-0">
      <button type="button" data-cookie-decline class="border border-white/40 hover:border-white text-white font-semibold px-4 py-2 rounded transition-colors text-sm">Ablehnen</button>
      <button type="button" data-cookie-accept class="bg-cta hover:bg-cta-hover text-white font-semibold px-4 py-2 rounded transition-colors text-sm">Akzeptieren</button>
    </div>
  </div>
</div>
