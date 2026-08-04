/* ── CPG AI Hub – app.js ── */
function initConnectedWorkflow() {
  const detail = document.getElementById('workflowDetail');
  const tools = document.querySelectorAll('#workflowStage [data-tool]');
  if (!detail || !tools.length) return;

  tools.forEach(tool => {
    tool.addEventListener('click', () => {
      tools.forEach(item => item.classList.remove('active'));
      tool.classList.add('active');
      detail.classList.add('is-updating');
      window.setTimeout(() => {
        detail.innerHTML = `
          <span class="workflow-detail-kicker">${tool.dataset.stage || 'WORKFLOW ROLE'}</span>
          <h3>${tool.dataset.tool}</h3>
          <p>${tool.dataset.detail || ''}</p>
        `;
        detail.classList.remove('is-updating');
        if (currentLanguage === 'vi') translateElement(detail);
      }, 140);
    });
  });
}



/* Draw perfectly straight, orthogonal workflow connectors from the actual
   rendered card centres. This removes fixed-coordinate drift and keeps the
   source panel, junction, and all three output cards precisely aligned. */
function drawWorkflowConnectorsV2() {
  const stage = document.getElementById('workflowStage');
  const map = stage?.querySelector('.workflow-map-v2');
  const svg = stage?.querySelector('.workflow-connectors-v2');
  const group = document.getElementById('workflowConnectorGroupV2');
  const source = stage?.querySelector('.workflow-source-panel-v2');
  const branches = [
    { el: stage?.querySelector('.workflow-branch-render-v2'), gradient: 'wfRenderGradient', delay: 0, duration: 4.2 },
    { el: stage?.querySelector('.workflow-branch-motion-v2'), gradient: 'wfMotionGradient', delay: -1.4, duration: 4.6 },
    { el: stage?.querySelector('.workflow-branch-deck-v2'), gradient: 'wfDeckGradient', delay: -2.8, duration: 5.0 }
  ].filter(item => item.el);

  if (!stage || !map || !svg || !group || !source || branches.length !== 3) return;

  if (window.innerWidth <= 860) {
    group.innerHTML = '';
    return;
  }

  const mapRect = map.getBoundingClientRect();
  const sourceRect = source.getBoundingClientRect();
  const sourceX = sourceRect.right - mapRect.left;
  const sourceY = sourceRect.top + sourceRect.height / 2 - mapRect.top;

  const targets = branches.map(({ el, gradient, delay, duration }) => {
    const rect = el.getBoundingClientRect();
    return {
      gradient,
      delay,
      duration,
      x: rect.left - mapRect.left,
      y: rect.top + rect.height / 2 - mapRect.top
    };
  });

  const nearestTargetX = Math.min(...targets.map(t => t.x));
  const junctionX = sourceX + (nearestTargetX - sourceX) * 0.52;

  svg.setAttribute('viewBox', `0 0 ${mapRect.width} ${mapRect.height}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  const setGradient = (id, x1, y1, x2, y2) => {
    const gradient = svg.querySelector(`#${id}`);
    if (!gradient) return;
    gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    gradient.setAttribute('x1', x1);
    gradient.setAttribute('y1', y1);
    gradient.setAttribute('x2', x2);
    gradient.setAttribute('y2', y2);
  };

  // Each animated gradient is mapped across the full route, beginning at the
  // 3D source panel and ending at its output card.
  targets.forEach(target => {
    setGradient(target.gradient, sourceX, sourceY, target.x, target.y);
  });

  const f = n => Number(n).toFixed(1);

  // Builds one continuous path through a list of waypoints, easing every
  // interior corner into a short quadratic curve instead of a hard right
  // angle. This is what gives the line its smooth, rounded-elbow look.
  const CORNER_RADIUS = 15;
  const smoothPath = rawPoints => {
    // Drop consecutive duplicate waypoints first. This matters for the
    // middle branch (02), whose card sits at the same height as the
    // source panel: its route is a single straight line with no actual
    // turn, so the junction waypoint and the "turn toward target" waypoint
    // land on the exact same coordinate. Feeding that duplicate into the
    // corner-rounding math below produced a zero-length curve sitting
    // exactly at the junction, which broke rendering of everything past
    // it for that branch (the gray stub the middle line "vẫn bị chặn").
    const points = rawPoints.filter((p, i) => i === 0 || Math.hypot(p[0] - rawPoints[i - 1][0], p[1] - rawPoints[i - 1][1]) > 0.01);
    let d = `M ${f(points[0][0])} ${f(points[0][1])}`;
    for (let i = 1; i < points.length - 1; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const inLen = Math.hypot(x1 - x0, y1 - y0) || 1;
      const outLen = Math.hypot(x2 - x1, y2 - y1) || 1;
      const r = Math.min(CORNER_RADIUS, inLen / 2, outLen / 2);
      const beforeX = x1 - ((x1 - x0) / inLen) * r;
      const beforeY = y1 - ((y1 - y0) / inLen) * r;
      const afterX = x1 + ((x2 - x1) / outLen) * r;
      const afterY = y1 + ((y2 - y1) / outLen) * r;
      d += ` L ${f(beforeX)} ${f(beforeY)} Q ${f(x1)} ${f(y1)} ${f(afterX)} ${f(afterY)}`;
    }
    const last = points[points.length - 1];
    d += ` L ${f(last[0])} ${f(last[1])}`;
    return d;
  };

  // Each branch gets one smooth, rounded-corner route from the source to
  // its output card: a soft neutral rail, a solid smooth gradient line on
  // top of it, and one travelling highlight that runs the ENTIRE route in
  // one continuous animation — starting at the source panel, passing
  // through the shared middle (junction) segment, then out to the branch
  // card — so motion always visibly originates from the source, not the
  // middle.
  //
  // IMPORTANT paint-order fix: all three branches share the exact same
  // source→junction segment. Previously each branch appended its
  // rail+colour+highlight together before moving to the next branch, so
  // branch #2's plain gray rail was painted ON TOP of branch #1's colour
  // line along that shared stretch (since SVG paints later elements over
  // earlier ones) — which is why the middle looked flat gray no matter
  // what colour/motion was underneath. Fix: draw ALL rails first, then
  // ALL colour lines, then ALL highlights, so colour and motion are
  // always the topmost layer everywhere, including the shared segment.
  const routes = targets.map(target => ({
    target,
    d: smoothPath([
      [sourceX, sourceY],
      [junctionX, sourceY],
      [junctionX, target.y],
      [target.x, target.y]
    ])
  }));

  let html = '';
  routes.forEach(({ d }) => {
    html += `<path class="workflow-rail-v2" d="${d}"></path>`;
  });
  routes.forEach(({ target, d }) => {
    html += `<path class="workflow-gradient-line-v2" d="${d}" stroke="url(#${target.gradient})"
            stroke-dasharray="6 5"></path>`;
  });
  routes.forEach(({ target, d }) => {
    html += `
      <path class="workflow-flow-highlight-v2" d="${d}" pathLength="1" stroke="url(#${target.gradient})"
            stroke-dasharray="0.22 0.78" stroke-dashoffset="1">
        <animate attributeName="stroke-dashoffset" from="1" to="0"
                 dur="${target.duration}s" begin="${target.delay}s"
                 repeatCount="indefinite" calcMode="linear"></animate>
      </path>
    `;
  });

  // Static junction only; it is not part of the motion effect.
  html += `<circle class="workflow-junction-v2" cx="${f(junctionX)}" cy="${f(sourceY)}" r="4.2"></circle>`;
  group.innerHTML = html;
}

function initWorkflowConnectorsV2() {
  const stage = document.getElementById('workflowStage');
  if (!stage) return;

  let timer;
  const redraw = () => {
    clearTimeout(timer);
    timer = setTimeout(drawWorkflowConnectorsV2, 40);
  };

  window.addEventListener('resize', redraw, { passive: true });
  window.addEventListener('load', drawWorkflowConnectorsV2);

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(redraw);
    observer.observe(stage);
    stage.querySelectorAll('.workflow-source-panel-v2, .workflow-branch-v2').forEach(el => observer.observe(el));
  }

  requestAnimationFrame(() => {
    drawWorkflowConnectorsV2();
    setTimeout(drawWorkflowConnectorsV2, 180);
    setTimeout(drawWorkflowConnectorsV2, 700);
  });
}

function initManagerReveal() {
  const cards = document.querySelectorAll('.manager-reveal');
  cards.forEach(card => {
    if (!card.querySelector('.manager-kpi-analysis')) {
      const insight = card.dataset.insight || '';
      const tip = document.createElement('div');
      tip.className = 'manager-kpi-analysis';
      tip.innerHTML = `<strong>Quick insight</strong><p>${insight}</p>`;
      card.appendChild(tip);
    }
    const activate = () => card.classList.add('active');
    const deactivate = () => card.classList.remove('active');
    card.addEventListener('mouseenter', activate);
    card.addEventListener('mouseleave', deactivate);
    card.addEventListener('focus', activate);
    card.addEventListener('blur', deactivate);
  });

  const chart = document.querySelector('.manager-reveal-panel');
  if (chart) {
    chart.classList.add('is-revealed');
    chart.setAttribute('aria-expanded', 'true');
  }
}



