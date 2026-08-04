/* ══════════════════════════════════════════════════
   SCROLL REVEAL — opexpark-style light animations
   Uses IntersectionObserver. Adds .is-revealed when
   elements with .reveal-up / .reveal-left /
   .stagger-children / .reveal-clip enter viewport.
══════════════════════════════════════════════════ */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything immediately
    document.querySelectorAll('.reveal-up, .reveal-left, .stagger-children, .reveal-clip')
      .forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // Fire once only
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-up, .reveal-left, .stagger-children, .reveal-clip')
    .forEach(el => observer.observe(el));
}



