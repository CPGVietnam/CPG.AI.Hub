/* ══════════════════
   SLIDE MODAL
══════════════════ */
function initDataSafetyModal() {
  // Legacy modal intentionally disabled. The Data Safety Guide now uses
  // the single MAD-style centered overlay handled by initRulesSlidePanel().
}

/* ══════════════════════════════════════════════════
   RULES SLIDE PANEL — MAD-style right-side panel
   Triggered by "Read policy" button in hero banner
══════════════════════════════════════════════════ */
function initRulesSlidePanel() {
  const openBtn  = document.getElementById('arbReadMoreBtn');
  const panel    = document.getElementById('rulesSlidePanel');
  const overlay  = document.getElementById('rulesPanelOverlay');
  const closeBtn = document.getElementById('rspClose');

  if (!panel || !overlay) return;

  function openPanel() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (currentLanguage === 'vi') translateElement(panel);
  }

  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openPanel);
  closeBtn?.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });

  // Also wire the old card-modal-btn if it exists on this page
  document.getElementById('openDataSafetyBtn')?.addEventListener('click', openPanel);
}

