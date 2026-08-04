/* ══════════════════
   TIMELINE
══════════════════ */
const TIMELINE = {
  1950: {
    year: '1950s–60s', title: 'Foundations of Artificial Intelligence',
    desc: 'Alan Turing proposed the Turing Test in 1950.<br><br>In 1956, the Dartmouth Conference took place, where John McCarthy coined the term "Artificial Intelligence".<br><br>Early breakthroughs included Logic Theorist and LISP programming.<br><br>The dream of simulating human intelligence was born.',
    tags: ['Alan Turing', 'Dartmouth 1956', 'Logic Theorist', 'LISP Language', 'John McCarthy'],
  },
  1980: {
    year: '1980s–90s', title: 'Machine Learning & Expert Systems',
    desc: 'Rule-based Expert Systems emerged for commercial use, like XCON at Digital Equipment Corp, which saved $40M a year.<br><br>Backpropagation revived neural networks.<br><br>Support Vector Machines (SVM) and Random Forests became industry standards for structured data prediction.',
    tags: ['Expert Systems', 'Backpropagation', 'Machine Learning', 'SVM & Random Forest', 'Rule-Based AI'],
  },
  2000: {
    year: '2000s', title: 'Big Data & AI in the Background',
    desc: 'The explosive growth of the web generated massive datasets for the first time.<br><br>GPUs, originally built for graphics, were repurposed for parallel computing, letting machine learning scale to millions of parameters.<br><br>In 2006, Facebook\'s News Feed started using AI algorithms to decide what content each person sees.<br><br>This was AI quietly shaping what people saw online, working in the background, long before anyone talked to it directly.',
    tags: ['Big Data', 'GPU Computing', 'Facebook News Feed 2006', 'Recommendation Algorithms', 'Spatial Machine Learning'],
  },
  2010: {
    year: '2010s', title: 'Virtual Assistants & Deep Learning Revolution',
    desc: 'In 2011, Siri launched on the iPhone 4S, becoming the first popular virtual assistant people could actually talk to.<br><br>AlexNet (2012) shattered visual recognition error rates on ImageNet.<br><br>DeepMind\'s AlphaGo (2016) defeated the world Go champion, and ResNet enabled much deeper neural networks.<br><br>In 2017, the Transformer paper "Attention Is All You Need" set the stage for modern LLMs like ChatGPT.',
    tags: ['Siri 2011', 'AlexNet 2012', 'AlphaGo 2016', 'Transformer Architecture', 'Computer Vision & NLP'],
  },
  2020: {
    year: '2020s+', title: 'Generative AI & Autonomous Agents',
    desc: 'ChatGPT launched in late 2022 and started a global wave.<br><br>Then came GPT-4, Google Gemini, Anthropic Claude, xAI Grok, and Diffusion Models like Midjourney and DALL-E, bringing multimodal intelligence to the mainstream.<br><br>AI evolved from passive question and answer tools into autonomous Agents that execute complex multi-step workflows, write code, and optimize BIM spatial design.',
    tags: ['GPT-4 & Claude 3.5', 'Diffusion Models', 'Multimodal AI', 'Autonomous AI Agents', 'Copilot Studio'],
  },
  future: {
    year: 'Future & Beyond', title: 'The Future is Unwritten, Stay Curious! ',
    desc: '<strong>"Shaping the future through design innovation."</strong><br><br>From rule-based systems, to data-driven learning, to generative and multimodal intelligence.<br><br>AI isn\'t replacing human expertise, it multiplies design potential. What daily workflow will you transform next at CPG?',
    tags: ['Shaping the Future', 'Design Innovation', 'Stay Curious ', 'Human + AI Collaboration'],
  },
};

function initTimeline() {
  const display = document.getElementById('timelineDisplay');
  const fillBar = document.getElementById('ttrackFillBar');
  if (!display) return;

  const FILL_PERCENTS = {
    '1950': '5%',
    '1980': '23%',
    '2000': '41%',
    '2010': '59%',
    '2020': '77%',
    'future': '100%'
  };

  function selectEra(yKey) {
    const d = TIMELINE[yKey];
    if (!d) return;

    // Update fill bar
    if (fillBar && FILL_PERCENTS[yKey]) {
      fillBar.style.width = FILL_PERCENTS[yKey];
      fillBar.classList.toggle('is-future', yKey === 'future');
    }

    // Sync active classes
    document.querySelectorAll('.tyear-item').forEach(el => {
      el.classList.toggle('active', el.dataset.year === String(yKey));
    });
    document.querySelectorAll('.tpin-node').forEach(el => {
      el.classList.toggle('active', el.dataset.year === String(yKey));
    });
    document.querySelectorAll('.ttitle-item').forEach(el => {
      el.classList.toggle('active', el.dataset.year === String(yKey));
    });

    // Render detail card
    display.innerHTML = `
      <div class="tdisp-year${yKey === 'future' ? ' is-gold' : ''}">${d.year}${yKey === 'future' ? ' <span class="future-spark" aria-hidden="true">✦</span>' : ''}</div>
      <div class="tdisp-title">${d.title}</div>
      <p class="tdisp-desc">${d.desc}</p>
      <div class="tdisp-tags">${d.tags.map(t => `<span class="tdisp-tag">${t}</span>`).join('')}</div>
    `;
  }

  // Ordered list of eras, used for keyboard next/previous navigation
  const ERA_KEYS = ['1950', '1980', '2000', '2010', '2020', 'future'];
  let currentEraIndex = 0;

  // Click handlers on years, pins, titles
  const clickables = document.querySelectorAll('.tyear-item, .tpin-node, .ttitle-item');
  clickables.forEach(el => {
    el.addEventListener('click', () => {
      selectEra(el.dataset.year);
      currentEraIndex = ERA_KEYS.indexOf(String(el.dataset.year));
    });
  });

  // Keyboard navigation: ArrowRight = next era, ArrowLeft = previous era.
  // Only active while the timeline section is visible on screen, and never
  // while the user is typing into a form field elsewhere on the page.
  const timelineSection = document.getElementById('timeline');
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    const activeTag = document.activeElement.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

    if (timelineSection) {
      const rect = timelineSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;
    }

    e.preventDefault();
    if (e.key === 'ArrowRight') {
      currentEraIndex = Math.min(currentEraIndex + 1, ERA_KEYS.length - 1);
    } else {
      currentEraIndex = Math.max(currentEraIndex - 1, 0);
    }
    selectEra(ERA_KEYS[currentEraIndex]);
  });

  selectEra('1950');
}

