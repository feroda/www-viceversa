(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');

  document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.querySelector('.navbar');
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');

    // ── Menu mobile ──
    function closeMenu() {
      if (!links || !toggle) return;
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Apri menu');
    }
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
      });
      links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
      document.addEventListener('click', function (e) {
        if (links.classList.contains('open') && !links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
      });
      window.addEventListener('resize', function () { if (window.innerWidth > 980) closeMenu(); });
    }

    // ── Ombra navbar + voce attiva ──
    var navAnchors = links ? links.querySelectorAll('a[href^="#"]') : [];
    var sections = Array.prototype.map.call(navAnchors, function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    }).filter(Boolean);

    function onScroll() {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 8 || navbar.hasAttribute('data-solid'));
      var y = window.scrollY + window.innerHeight * 0.35;
      var current = '';
      sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
      navAnchors.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Comparsa sezioni ──
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      document.documentElement.classList.add('js-reveal');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    // ── Orari: evidenzia oggi e mostra "Aperto ora" (ora di Roma) ──
    var hoursList = document.querySelector('.hours');
    var status = document.querySelector('.open-status');
    if (hoursList) {
      try {
        var parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
        }).formatToParts(new Date());
        var get = function (t) { var p = parts.find(function (x) { return x.type === t; }); return p ? p.value : ''; };
        var dayIdx = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')];
        var mins = parseInt(get('hour'), 10) % 24 * 60 + parseInt(get('minute'), 10);
        var row = hoursList.querySelector('[data-day="' + dayIdx + '"]');
        if (row) {
          row.classList.add('today');
          if (status) {
            var o = row.getAttribute('data-open'), c = row.getAttribute('data-close');
            var toMin = function (s) { return parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(2), 10); };
            var isOpen = o && c && mins >= toMin(o) && mins < toMin(c);
            status.textContent = isOpen ? 'Aperto ora' : 'Chiuso ora';
            status.classList.toggle('is-open', !!isOpen);
            status.hidden = false;
          }
        }
      } catch (e) { /* browser senza Intl/timeZone: nessuna evidenziazione */ }
    }

    // ── Anno nel footer ──
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
  });
})();
