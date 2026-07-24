(function () {
  'use strict';

  // Header: auf der Startseite blendet er ins Hero, beim Scrollen wird er navy.
  var header = document.querySelector('[data-header]');
  if (header) {
    var isHome = header.hasAttribute('data-home');

    var updateHeader = function () {
      var scrolled = window.scrollY > 20;
      header.classList.toggle('is-scrolled', scrolled);
      if (isHome) {
        header.classList.toggle('is-home-top', !scrolled);
      }
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Logo-Klick auf der Startseite: sanft nach oben scrollen statt neu laden.
    var logo = header.querySelector('[data-logo-link]');
    if (logo && isHome) {
      logo.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // Mobile-Menü
  var menuButton = document.querySelector('[data-menu-button]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuButton && mobileMenu) {
    var iconOpen = menuButton.querySelector('[data-icon-open]');
    var iconClose = menuButton.querySelector('[data-icon-close]');

    menuButton.addEventListener('click', function () {
      var open = !mobileMenu.classList.toggle('hidden');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      iconOpen.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);
    });

    var submenuButton = mobileMenu.querySelector('[data-submenu-button]');
    var submenu = mobileMenu.querySelector('[data-submenu]');
    if (submenuButton && submenu) {
      submenuButton.addEventListener('click', function () {
        var open = !submenu.classList.toggle('hidden');
        submenuButton.querySelector('svg').classList.toggle('rotate-180', open);
      });
    }
  }

  // Vorher/Nachher-Slider
  document.querySelectorAll('[data-ba-slider]').forEach(function (slider) {
    var afterWrap = slider.querySelector('[data-ba-after]');
    var handle = slider.querySelector('[data-ba-handle]');
    var labelAfter = slider.querySelector('[data-ba-label-after]');
    var labelBefore = slider.querySelector('[data-ba-label-before]');

    function setPosition(clientX) {
      var rect = slider.getBoundingClientRect();
      var pos = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      afterWrap.style.clipPath = 'inset(0 ' + (100 - pos) + '% 0 0)';
      handle.style.left = pos + '%';
      labelAfter.style.opacity = pos > 14 ? '1' : '0';
      labelBefore.style.opacity = 100 - pos > 14 ? '1' : '0';
    }

    function onTouch(e) {
      if (e.touches && e.touches[0]) {
        setPosition(e.touches[0].clientX);
      }
    }

    slider.addEventListener('mousemove', function (e) {
      setPosition(e.clientX);
    });
    slider.addEventListener('mousedown', function (e) {
      setPosition(e.clientX);
    });
    slider.addEventListener('touchstart', onTouch, { passive: true });
    slider.addEventListener('touchmove', onTouch, { passive: true });
  });

  // Cookie-Consent + Google Analytics (GA4).
  // gtag.js wird erst nach «Akzeptieren» geladen; vorher geht kein Request
  // an Google. data-ga-active="1" nur auf der Live-Domain (siehe
  // includes/cookie-banner.php).
  var cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner) {
    var gaId = cookieBanner.getAttribute('data-ga-id');
    var gaActive = cookieBanner.getAttribute('data-ga-active') === '1';
    var gaLoaded = false;
    var gaScriptInjected = false;

    var getConsent = function () {
      var match = document.cookie.match(/(?:^|;\s*)cookie_consent=(granted|denied)/);
      return match ? match[1] : null;
    };

    var setConsent = function (value) {
      var cookie = 'cookie_consent=' + value + '; max-age=31536000; path=/; SameSite=Lax';
      if (location.protocol === 'https:') {
        cookie += '; Secure';
      }
      document.cookie = cookie;
    };

    // GA-Cookies beim Widerruf löschen (auf Host- und Domain-Ebene).
    var deleteGaCookies = function () {
      document.cookie.split(';').forEach(function (part) {
        var name = part.split('=')[0].trim();
        if (name === '_ga' || name.indexOf('_ga_') === 0) {
          document.cookie = name + '=; max-age=0; path=/';
          document.cookie = name + '=; max-age=0; path=/; domain=.' + location.hostname.replace(/^www\./, '');
        }
      });
    };

    var gaConsentSignals = function (state) {
      return {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state
      };
    };

    var loadAnalytics = function () {
      if (gaLoaded || !gaActive || !gaId) {
        return;
      }
      gaLoaded = true;
      if (gaScriptInjected) {
        // Re-Aktivierung nach Widerruf auf derselben Seite: nur die
        // Consent-Signale wieder erteilen, Script nicht erneut laden.
        window.gtag('consent', 'update', gaConsentSignals('granted'));
        return;
      }
      gaScriptInjected = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      // Consent Mode v2: alle Signale granted — das Script lädt ohnehin
      // erst nach ausdrücklicher Zustimmung (Basic Consent Mode).
      window.gtag('consent', 'default', gaConsentSignals('granted'));
      window.gtag('js', new Date());
      window.gtag('config', gaId);
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
      document.head.appendChild(gaScript);
    };

    // Conversion-Events — feuern nur, wenn GA geladen ist.
    var track = function (name) {
      if (gaLoaded && typeof window.gtag === 'function') {
        window.gtag('event', name);
      }
    };

    // Formular-Erfolg (/kontakt?gesendet=1); sessionStorage verhindert
    // Doppelzählung beim Aktualisieren der Erfolgsseite. Wird beim Laden
    // UND nach «Akzeptieren» geprüft, damit auch zählt, wer erst auf der
    // Erfolgsseite zustimmt. Bewusste Einschränkung: eine echte zweite
    // Anfrage in derselben Browser-Session ist vom blossen Aktualisieren
    // nicht unterscheidbar und wird daher nicht erneut gezählt.
    var trackLeadOnce = function () {
      if (gaLoaded && document.querySelector('[data-ga-lead]') && !sessionStorage.getItem('gaLeadTracked')) {
        track('generate_lead');
        sessionStorage.setItem('gaLeadTracked', '1');
      }
    };

    var applyConsent = function (value) {
      setConsent(value);
      cookieBanner.classList.add('hidden');
      if (value === 'granted') {
        loadAnalytics();
        trackLeadOnce();
      } else {
        // Widerruf: Tracking sofort stoppen, Consent-Signale entziehen,
        // vorhandene GA-Cookies löschen.
        if (gaLoaded && typeof window.gtag === 'function') {
          window.gtag('consent', 'update', gaConsentSignals('denied'));
        }
        gaLoaded = false;
        deleteGaCookies();
      }
    };

    cookieBanner.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      applyConsent('granted');
    });
    cookieBanner.querySelector('[data-cookie-decline]').addEventListener('click', function () {
      applyConsent('denied');
    });

    // Footer-Link «Cookie-Einstellungen»: Banner zum Ändern der Wahl öffnen.
    var cookieSettings = document.querySelector('[data-cookie-settings]');
    if (cookieSettings) {
      cookieSettings.addEventListener('click', function () {
        cookieBanner.classList.remove('hidden');
      });
    }

    var consent = getConsent();
    if (consent === 'granted') {
      loadAnalytics();
    } else if (consent === null) {
      cookieBanner.classList.remove('hidden');
    }

    trackLeadOnce();

    document.addEventListener('click', function (e) {
      var contactLink = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
      if (contactLink) {
        track(contactLink.getAttribute('href').indexOf('tel:') === 0 ? 'phone_click' : 'email_click');
      }
    });
  }
})();
