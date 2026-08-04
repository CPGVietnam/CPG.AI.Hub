/* Microsoft 365 sign-in prototype. Real authentication must be wired to
   a CPG Entra ID app registration and validated server-side. */
function initMicrosoft365Prototype() {
  const navCta = document.querySelector('.nav-cta');
  if (!navCta || document.getElementById('m365SignInBtn')) return;

  const button = document.createElement('button');
  button.id = 'm365SignInBtn';
  button.className = 'm365-signin-btn';
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  navCta.prepend(button);

  const modal = document.createElement('div');
  modal.id = 'm365PrototypeModal';
  modal.className = 'm365-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'm365Title');
  modal.innerHTML = `<div class="m365-card">
    <button class="m365-close" type="button" aria-label="Close sign-in prototype">×</button>
    <span class="ms-mark ms-mark-lg" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <p class="m365-eyebrow">CPG AI HUB · PROTOTYPE</p>
    <h2 id="m365Title">Sign in with your CPG account</h2>
    <p class="m365-copy">Use your company Microsoft 365 account to unlock staff tools and internal actions.</p>
    <button class="m365-primary" type="button">Continue with Microsoft 365</button>
    <p class="m365-note">Demo only — no account data is collected or sent.</p>
  </div>`;
  document.body.appendChild(modal);

  const protectedSelector = '.need-pill, #home .btn-primary, #home .btn-ghost-lg, .btn-primary-sm, .nav-dd-trigger, .nav-dd-item, .footer-column a:not([target="_blank"])';
  let pendingDestination = '';
  const isAuthenticated = () => sessionStorage.getItem('cpg-demo-auth') === '1';

  const renderAuthState = () => {
    const signedIn = isAuthenticated();
    document.body.classList.toggle('demo-authenticated', signedIn);
    button.classList.toggle('is-authenticated', signedIn);
    button.setAttribute('aria-label', signedIn ? 'Signed in as CPG Employee' : 'Sign in with Microsoft 365');
    button.innerHTML = signedIn
      ? '<span class="auth-avatar" aria-hidden="true">CE</span><span>CPG Employee</span><span class="auth-status" aria-hidden="true"></span>'
      : '<span class="ms-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>Sign in</span>';
    document.querySelectorAll(protectedSelector).forEach(el => {
      el.classList.toggle('is-locked', !signedIn);
    });
  };

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const open = destination => {
    pendingDestination = destination || '';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.m365-close').focus();
  };

  button.addEventListener('click', () => {
    if (isAuthenticated()) {
      sessionStorage.removeItem('cpg-demo-auth');
      renderAuthState();
      return;
    }
    open('');
  });

  document.addEventListener('click', event => {
    const target = event.target.closest(protectedSelector);
    if (!target || isAuthenticated() || target.id === 'm365SignInBtn') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    document.querySelectorAll('.nav-dd-menu').forEach(menu => menu.classList.remove('open'));
    document.querySelectorAll('.nav-dd-trigger').forEach(trigger => trigger.classList.remove('active'));
    open(target.href || '');
  }, true);

  modal.querySelector('.m365-close').addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  modal.querySelector('.m365-primary').addEventListener('click', () => {
    sessionStorage.setItem('cpg-demo-auth', '1');
    renderAuthState();
    close();
    const destination = pendingDestination;
    pendingDestination = '';
    if (destination) window.location.href = destination;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  renderAuthState();
  if (!isAuthenticated() && !document.body.classList.contains('page-home')) open('');
}
