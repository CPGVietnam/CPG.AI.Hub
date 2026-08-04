/* Footer curtain reveal: content stays above a fixed footer without using
   transforms, so fixed dialogs and navigation keep their viewport position. */
function initFooterCurtainReveal() {
  const footer = document.querySelector('.footer');
  if (!footer || document.querySelector('.page-curtain')) return;
  const curtain = document.createElement('div');
  curtain.className = 'page-curtain';
  document.body.insertBefore(curtain, footer);
  [...document.body.children].forEach(node => {
    if (node === curtain || node === footer || node.tagName === 'SCRIPT' || node.classList.contains('scroll-progress-track')) return;
    curtain.appendChild(node);
  });
  const updateRevealState = () => {
    const revealStarted = curtain.getBoundingClientRect().bottom < window.innerHeight * 0.98;
    document.body.classList.toggle('footer-in-view', revealStarted);
  };
  window.addEventListener('scroll', updateRevealState, { passive: true });
  window.addEventListener('resize', updateRevealState);
  requestAnimationFrame(updateRevealState);
}
