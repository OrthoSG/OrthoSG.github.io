(() => {
  'use strict';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.getElementById('motion-toggle');
  if (!toggle || !window.IntersectionObserver || !Element.prototype.animate) return;
  let paused = preference.matches;
  const active = new Set();
  function sync() {
    document.documentElement.classList.toggle('motion-paused', paused);
    toggle.textContent = paused ? 'Enable animations' : 'Pause animations';
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) { active.forEach(animation => animation.cancel()); active.clear(); }
  }
  toggle.hidden = false;
  const onToggle = () => { paused = !paused; sync(); };
  const onPreference = event => { paused = event.matches; sync(); };
  toggle.addEventListener('click', onToggle);
  preference.addEventListener('change', onPreference);
  sync();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (paused || preference.matches) continue;
      const animation = entry.target.animate(
        [{ opacity: .55, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
      active.add(animation);
      animation.onfinish = () => active.delete(animation);
    }
  }, { threshold: .12 });
  document.querySelectorAll('.hero h1,.section-title,.launcher,.pathway li,.passport-grid article,.three article,.about-grid article,.timeline article').forEach(element => observer.observe(element));
  window.addEventListener('pagehide', () => {
    observer.disconnect();
    active.forEach(animation => animation.cancel());
    active.clear();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) { paused = preference.matches || paused; sync(); }
  });
})();
