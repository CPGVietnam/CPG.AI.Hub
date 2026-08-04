/* ══════════════════
   TASK HELP — "What do you need help with today?"
   Tabbed section below Connected AI Workflow. Hero pills
   jump here and pre-select the matching tab.
══════════════════ */
const TASK_HELP_DATA = {
  write: {
    title: 'Write & Summarize',
    tool: 'Microsoft Copilot',
    safety: 'Internal OK — connected to your O365 account, safe for internal CPG data.',
    steps: [
      'Open Copilot inside Word, Outlook, or Teams.',
      'Paste your draft, notes, or meeting transcript.',
      'Ask Copilot to summarize, shorten, or turn it into a clear structure.'
    ],
    prompt: 'Summarize this meeting transcript into 5 bullet points. Highlight decisions made and action items with owners.'
  },
  design: {
    title: 'Design & Visualize',
    tool: 'Midjourney / Veras / D5',
    safety: 'Public images only — never upload confidential project files or client drawings.',
    steps: [
      'Export a rough massing view or sketch from Revit or SketchUp.',
      'Import it into Veras, D5, or Midjourney.',
      'Prompt for style, lighting, and materials to test the direction fast.'
    ],
    prompt: 'Photorealistic exterior render, tropical modern facade, warm evening lighting, landscaped courtyard, 4k architectural visualization.'
  },
  review: {
    title: 'Review & Compare',
    tool: 'Autodesk AI / Copilot',
    safety: 'Secure sandbox — use the approved environment for BIM and spec files.',
    steps: [
      'Upload both documents to the approved sandbox tool.',
      'Ask the AI to flag mismatches or missing items.',
      'Manually verify every flagged item before acting on it.'
    ],
    prompt: 'Compare these two BOQ sheets and list every line item where the quantity or unit price is different.'
  },
  research: {
    title: 'Research & Analyze',
    tool: 'ChatGPT',
    safety: 'No client data — keep project and client details out of the prompt.',
    steps: [
      'Describe the project context in general terms, no confidential details.',
      'Ask for precedent examples, comparisons, or a data summary.',
      'Cross-check any facts or figures before using them in real work.'
    ],
    prompt: 'List 5 award-winning mixed-use developments in tropical climates known for passive cooling strategies, with a brief description of each.'
  }
};

function initTaskHelp() {
  const tabs = Array.from(document.querySelectorAll('.need-tab'));
  const panel = document.getElementById('needPanelLight');
  const workflowSection = document.getElementById('design-workflow');
  if (!panel) return;

  // Only Architecture/technical work touches Revit, SketchUp, or AutoCAD.
  // The software workflow board lives here, one step below "Design & Visualize",
  // instead of standing alone as a section every department has to scroll past.
  const SOFTWARE_PICKS = [
    { tool: 'Revit', img: 'assets/images/revit.png' },
    { tool: 'SketchUp', img: 'assets/images/sketchup.png' },
    { tool: 'AutoCAD', img: 'assets/images/autocad.png' }
  ];

  function hideWorkflowBoard() {
    workflowSection?.classList.remove('is-revealed');
  }

  function revealWorkflowBoard(preselectTool) {
    if (!workflowSection) return;
    workflowSection.classList.add('is-revealed');
    // Board was display:none until now, so connector geometry couldn't be
    // measured. Redraw once it's actually laid out.
    requestAnimationFrame(() => {
      drawWorkflowConnectorsV2?.();
      setTimeout(() => drawWorkflowConnectorsV2?.(), 160);
    });
    if (preselectTool) {
      const btn = workflowSection.querySelector(`[data-tool="${preselectTool}"]`);
      btn?.click();
    }
    workflowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderPanel(key) {
    const data = TASK_HELP_DATA[key];
    if (!data) return;

    panel.innerHTML = `
      <div class="need-panel-head">
        <span class="need-panel-title">${data.title}</span>
        <span class="need-tool-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> ${data.tool}</span>
      </div>
      <p class="need-safety"><strong>Data safety:</strong> ${data.safety}</p>
      <ol class="need-steps">
        ${data.steps.map((step, i) => `<li><span class="step-n">${i + 1}</span><span>${step}</span></li>`).join('')}
      </ol>
      <p class="need-prompt-label">Sample prompt — copy and adapt it</p>
      <div class="need-prompt-box">
        <span class="need-prompt-text">${data.prompt}</span>
        <button class="need-copy-btn" type="button"><i class="fa-solid fa-copy"></i> Copy</button>
      </div>
      ${key === 'design' ? `
      <div class="need-software-picker">
        <span class="need-software-label">Which software are you working in? See its full workflow:</span>
        <div class="need-software-row">
          ${SOFTWARE_PICKS.map(s => `
            <button class="need-software-btn" type="button" data-software="${s.tool}">
              <img src="${s.img}" alt="${s.tool} logo"><span>${s.tool}</span>
            </button>`).join('')}
        </div>
      </div>` : ''}
    `;

    const copyBtn = panel.querySelector('.need-copy-btn');
    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(data.prompt).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy'; }, 2000);
      });
    });

    panel.querySelectorAll('.need-software-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.need-software-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        revealWorkflowBoard(btn.dataset.software);
      });
    });
  }

  function selectTab(key) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.need === key));
    renderPanel(key);
    // Software board only ever belongs to the Design & Visualize task.
    // Switching to any other tab collapses it again.
    if (key !== 'design') hideWorkflowBoard();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => selectTab(tab.dataset.need));
  });

  // Hero pills jump to #task-help and pre-select the matching tab.
  document.querySelectorAll('.need-pill').forEach(pill => {
    pill.addEventListener('click', () => selectTab(pill.dataset.need));
  });

  // Default tab on load: Check URL query parameter ?need= first, then fallback to hash or 'write'.
  const urlParams = new URLSearchParams(window.location.search);
  const needParam = urlParams.get('need');
  if (needParam && TASK_HELP_DATA[needParam]) {
    selectTab(needParam);
  } else if (window.location.hash === '#design-workflow') {
    selectTab('design');
    revealWorkflowBoard();
  } else {
    selectTab('write');
  }
}

