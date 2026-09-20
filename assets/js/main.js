/* MJS HTT PI — maquette Webminds */
(function () {
  var h = document.querySelector('.header');
  var onScroll = function () { if (h) h.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var b = document.querySelector('.burger'), n = document.querySelector('.nav');
  if (b && n) {
    b.addEventListener('click', function () { n.classList.toggle('open'); });
    n.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { n.classList.remove('open'); }); });
  }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px' });
  document.querySelectorAll('.rv').forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el);
  });

  /* compteurs */
  var ci = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      ci.unobserve(e.target);
      var el = e.target, to = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', t0 = null;
      var step = function (t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1100, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(function (el) { ci.observe(el); });

  /* onglets plans */
  document.querySelectorAll('[data-tab]').forEach(function (t) {
    t.addEventListener('click', function () {
      var id = t.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(function (x) { x.classList.toggle('is-on', x === t); });
      document.querySelectorAll('[data-pane]').forEach(function (p) { p.classList.toggle('is-on', p.dataset.pane === id); });
    });
  });

  /* formulaires (maquette) */
  document.querySelectorAll('form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = f.querySelector('[type=submit]');
      if (btn) { btn.textContent = 'Demande envoyée ✓'; btn.disabled = true; btn.style.opacity = '.75'; }
    });
  });
})();
