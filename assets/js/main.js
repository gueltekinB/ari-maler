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
})();
