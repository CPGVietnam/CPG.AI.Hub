/* ══════════════════
   NAV
══════════════════ */
function initNav() {
  const toggle = document.getElementById('mobileToggle');
  const links  = document.getElementById('navLinks');

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // ── Back to Top button ──
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Vertical Scroll Progress Indicator (MAD Style) ──
  const progressBar = document.getElementById('scrollProgressBar');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && progressBar) {
      const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.height = `${progress}%`;
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ── Click-toggle dropdowns (fixes hover-gap bug) ──
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-dd-trigger');
    const menu    = dd.querySelector('.nav-dd-menu');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');

      // Close all other menus first
      document.querySelectorAll('.nav-dd-menu').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.nav-dd-trigger').forEach(t => t.classList.remove('active'));

      if (!isOpen) {
        menu.classList.add('open');
        trigger.classList.add('active');
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dd-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.nav-dd-trigger').forEach(t => t.classList.remove('active'));
  });

  // Prevent menu clicks from bubbling up and closing the menu
  document.querySelectorAll('.nav-dd-menu').forEach(menu => {
    menu.addEventListener('click', e => e.stopPropagation());
  });

  // Toggle scrolled state on navbar for glass blur backdrop transitions
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('home');
  const handleScroll = () => {
    if (navbar) {
      const threshold = heroSection ? (heroSection.offsetHeight - 70) : 500;
      navbar.classList.toggle('scrolled', window.scrollY > threshold);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Each HTML page is its own curtain. The footer stays fixed behind it.
  const footer = document.getElementById('site-footer');
  const pageCurtain = document.querySelector('.page-curtain');
  if (navbar && footer && pageCurtain) {
    const updateFooterNavState = () => {
      // Reveal begins when the bottom edge of this page's white curtain
      // rises above the bottom edge of the viewport.
      const curtainBottom = pageCurtain.getBoundingClientRect().bottom;
      const revealDepth = Math.max(0, window.innerHeight - curtainBottom);
      const hidden = revealDepth > 1;
      navbar.classList.toggle('footer-hidden', hidden);
      if (hidden) {
        document.querySelectorAll('.nav-dd-menu').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('.nav-dd-trigger').forEach(t => t.classList.remove('active'));
      }
    };
    window.addEventListener('scroll', updateFooterNavState, { passive: true });
    window.addEventListener('resize', updateFooterNavState);
    updateFooterNavState();
  }

  // highlight active section on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${cur}`);
    });
  });
}

