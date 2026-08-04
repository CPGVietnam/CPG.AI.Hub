/* ══════════════════
   AIOS
══════════════════ */
const AIOS_LAYERS = [
  {
    num: 1, name: 'Core Identity',
    desc: 'The fixed personality, values, and purpose of the AI. For a CPG design assistant, this would be: "I help architects and urban designers. I never share confidential data. I always ask for clarification before generating."',
    example: 'Example: An AI told to always follow CPG\'s design standards and HQ guidelines.'
  },
  {
    num: 2, name: 'Rules & Guardrails',
    desc: 'The boundaries the AI must never cross, like data security policies, copyright rules, and brand guidelines. These are set by IT and CPG leadership (the DTSC).',
    example: 'Example: "Never paste this prompt into a public AI tool." "Do not generate images of real clients."'
  },
  {
    num: 3, name: 'Skills & Knowledge',
    desc: 'What the AI has been trained to do, analysing drawings, summarising documents, writing reports, comparing specs. This can be customised with CPG\'s own design documents.',
    example: 'Example: Upload CPG\'s design manual → AI now knows your firm\'s standards automatically.'
  },
  {
    num: 4, name: 'Agents',
    desc: 'Autonomous mini-workers that can complete multi-step tasks on their own. Instead of just answering, they can open files, run comparisons, send alerts, and write reports.',
    example: 'Example: An agent that checks every new drawing set against the client brief, overnight, and flags discrepancies before your morning standup.'
  },
  {
    num: 5, name: 'External Tools',
    desc: 'Connections to real-world apps: Revit, AutoCAD, Excel, SharePoint, email. The AI doesn\'t just talk, it can actually take action inside the tools your team uses every day.',
    example: 'Example: Autodesk Forma AI is a Layer 5 tool, it reads your BIM model and gives performance feedback inside the software.'
  },
];

function initAios() {
  const container = document.getElementById('aiosLayers');
  if (!container) return;

  AIOS_LAYERS.forEach((l, i) => {
    const div = document.createElement('div');
    div.className = `alayer${i === 0 ? ' active' : ''}`;
    div.dataset.layer = l.num;
    div.innerHTML = `
      <div class="alayer-top">
        <span class="alayer-num">LAYER ${l.num}</span>
        <span class="alayer-name">${l.name}</span>
      </div>
      <div class="alayer-desc">
        <p>${l.desc}</p>
        <p class="alayer-example"><span class="alayer-example-label">Example:</span> ${l.example.replace(/^Example:\s*/, '')}</p>
      </div>
    `;
    div.addEventListener('click', () => setActiveLayer(l.num));
    container.appendChild(div);
  });

  function setActiveLayer(num) {
    // Highlight detail panel
    document.querySelectorAll('.alayer').forEach((a, i) => {
      a.classList.toggle('active', i === num - 1);
    });
    // Highlight ring
    document.querySelectorAll('.cring').forEach(r => r.classList.remove('active'));
    const ring = document.querySelector(`.cring[data-layer="${num}"]`);
    if (ring) ring.classList.add('active');
    // Highlight label
    document.querySelectorAll('.clabel').forEach(l => l.classList.remove('active'));
    const lbl = document.querySelector(`.clabel[data-layer="${num}"]`);
    if (lbl) lbl.classList.add('active');
  }

  // Ring clicks
  document.querySelectorAll('.cring[data-layer]').forEach(ring => {
    ring.addEventListener('click', () => setActiveLayer(parseInt(ring.dataset.layer)));
  });

  // Label clicks
  document.querySelectorAll('.clabel[data-layer]').forEach(lbl => {
    lbl.addEventListener('click', () => setActiveLayer(parseInt(lbl.dataset.layer)));
  });

  // Default: Layer 5 (outermost) active on load
  setActiveLayer(5);
}

