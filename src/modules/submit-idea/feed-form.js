/* ══════════════════
   FEED & FORM
══════════════════ */
const SEED_IDEAS = [
  { name: 'Cuong N.', dept: 'Architecture', time: '2h ago', text: 'Every project I spend 2 days manually extracting areas from PDFs and entering them into Excel. A tool that reads the drawing and fills the sheet automatically would save my whole week.', hours: '~8 hrs/week' },
  { name: 'Landscape Team', dept: 'Landscape', time: '5h ago', text: 'When clients ask for alternative plant palettes, I have to research each plant manually. An AI that could suggest plants based on climate zone and visual style would be incredibly useful.', hours: '~5 hrs/week' },
  { name: 'Anonymous', dept: 'QS & Contracts', time: '1d ago', text: 'Comparing BOQ specs against tender drawings takes forever. Sometimes we miss small discrepancies that cause rework. AI that cross-checks both documents would be a game-changer.', hours: '~12 hrs/week' },
  { name: 'Senior Architect', dept: 'Architecture', time: '2d ago', text: 'Meeting minutes, I attend 4+ meetings a week. Writing up accurate notes takes an hour each. I use Copilot now and it\'s already saving me 3 hours a week minimum.', hours: '~4 hrs/week' },
];

function initFeedAndForm() {
  const feed = document.getElementById('ideasFeed');
  if (!feed) return;

  function addToFeed(item, prepend = false) {
    const div = document.createElement('div');
    div.className = 'feed-item';
    div.innerHTML = `
      <div class="fi-top">
        <div>
          <span class="fi-name">${item.name}</span>
          <span class="fi-dept" style="margin-left:8px;">${item.dept}</span>
        </div>
        <span class="fi-time">${item.time}</span>
      </div>
      <div class="fi-text">${item.text}</div>
      ${item.hours ? `<div class="fi-hours"><i class="fa-solid fa-clock fa-xs"></i> ${item.hours}</div>` : ''}
    `;
    if (prepend && feed.firstChild) {
      feed.insertBefore(div, feed.firstChild);
    } else {
      feed.appendChild(div);
    }
  }

  SEED_IDEAS.forEach(i => addToFeed(i));

  // Duplicate the initial cards multiple times so the horizontal marquee
  // always has enough width to visibly move and loop smoothly.
  const originals = Array.from(feed.children);
  for (let round = 0; round < 2; round += 1) {
    originals.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      feed.appendChild(clone);
    });
  }

  const feedScroll = document.getElementById('ideasFeedScroll');
  const pauseBtn = document.getElementById('ideasPauseBtn');
  const livePill = document.querySelector('.live-pill');
  let marqueePaused = false;

  function setMarqueeState(paused) {
    marqueePaused = !!paused;
    if (feedScroll) feedScroll.classList.toggle('is-paused', marqueePaused);
    if (feed) feed.classList.toggle('is-paused', marqueePaused);
    if (pauseBtn) pauseBtn.textContent = marqueePaused ? 'Resume' : 'Pause';
    if (livePill) livePill.style.opacity = marqueePaused ? '0.72' : '1';
  }

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => setMarqueeState(!marqueePaused));
  }

  if (feedScroll) {
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    feedScroll.addEventListener('pointerdown', e => {
      if (!marqueePaused) return;
      isDown = true;
      startX = e.clientX;
      startScrollLeft = feedScroll.scrollLeft;
      feedScroll.classList.add('is-dragging');
    });

    window.addEventListener('pointermove', e => {
      if (!isDown || !marqueePaused) return;
      const walk = e.clientX - startX;
      feedScroll.scrollLeft = startScrollLeft - walk;
    });

    const endDrag = () => {
      isDown = false;
      feedScroll.classList.remove('is-dragging');
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  }

  // Form submit
  const form = document.getElementById('ideaForm');

  // Quick-select chips: clicking one fills the bottleneck textarea with a
  // ready-made starter phrase, so staff can just tap instead of typing from scratch.
  const bottleneckField = document.getElementById('bottleneck');
  document.querySelectorAll('#bottleneckChips .quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#bottleneckChips .quick-chip').forEach(c => c.classList.remove('chip-selected'));
      chip.classList.add('chip-selected');
      if (bottleneckField) {
        bottleneckField.value = chip.dataset.text;
        bottleneckField.focus();
      }
    });
  });

  // Collapsible "extra details" (hours per week + data type). Hidden by
  // default so the form looks short on mobile; staff can expand it if they want.
  const extraToggleBtn = document.getElementById('extraToggleBtn');
  const extraFields = document.getElementById('extraFields');
  extraToggleBtn?.addEventListener('click', () => {
    extraFields?.classList.toggle('hidden');
    extraToggleBtn.classList.toggle('open');
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name   = document.getElementById('empName').value.trim() || 'Anonymous';
    const dept   = document.getElementById('deptSelect').value;
    const text   = document.getElementById('bottleneck').value.trim();
    const hours  = document.getElementById('hoursSaved').value;

    addToFeed({ name, dept, time: 'Just now', text, hours: hours ? `~${hours} hrs/week` : null }, true);

    // Update dashboard counters
    const ideasEl = document.getElementById('totalIdeasCount');
    const hoursEl = document.getElementById('totalHoursSaved');
    if (ideasEl) ideasEl.textContent = parseInt(ideasEl.textContent) + 1;
    if (hoursEl && hours) hoursEl.textContent = parseInt(hoursEl.textContent) + parseInt(hours);

    form.reset();
    document.querySelectorAll('#bottleneckChips .quick-chip').forEach(c => c.classList.remove('chip-selected'));
    extraFields?.classList.add('hidden');
    extraToggleBtn?.classList.remove('open');

    // Short confirmation
    const btn = form.querySelector('.btn-submit-full');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent to leadership!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send to CPG Leadership';
      btn.style.background = '';
    }, 3000);
  });
}

