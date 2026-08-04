/* ══════════════════
   GLOBAL FIRMS
══════════════════ */
const FIRMS = [
  {
    name: 'Foster + Partners', abbr: 'F+P', location: 'London, UK',
    tags: ['Architecture'], cat: 'architecture',
    usecase: 'Uses AI for environmental performance simulations, calculating daylight, wind, and energy at the concept design phase, saving weeks of manual analysis.',
    impact: '40% faster environmental analysis',
    source: 'Source: Foster + Partners Technology & Innovation Report 2024'
  },
  {
    name: 'Gensler', abbr: 'GEN', location: 'USA (Global)',
    tags: ['Architecture', 'Workplace'], cat: 'architecture',
    usecase: 'Uses AI to optimise workspace layouts based on how employees actually move through buildings, data from sensors and surveys feeds into design decisions.',
    impact: '30% improvement in space efficiency',
    source: 'Source: Gensler Research Institute Design Forecast 2024'
  },
  {
    name: 'BIG – Bjarke Ingels', abbr: 'BIG', location: 'Copenhagen / NYC',
    tags: ['Urban Design', 'Architecture'], cat: 'urban',
    usecase: 'Uses generative AI to test thousands of building massing variations at once, finding the forms that balance views, sunlight, and density in minutes, not weeks.',
    impact: '10× more design options explored',
    source: 'Source: BIG Tech Lab & ArchDaily Computational Review'
  },
  {
    name: 'Arup', abbr: 'ARP', location: 'London, UK (Global)',
    tags: ['Engineering', 'Urban Design'], cat: 'engineering',
    usecase: 'Runs AI agents to validate structural models, detect clashes in BIM, and predict material failure, reducing checking time dramatically.',
    impact: '60% reduction in BIM check time',
    source: 'Source: Arup Digital & AI Engineering Case Studies 2024'
  },
  {
    name: 'AECOM', abbr: 'AEC', location: 'USA (Global)',
    tags: ['Engineering', 'Urban Design'], cat: 'engineering',
    usecase: 'Uses AI to process satellite imagery and traffic data for urban master-planning, turning weeks of data collection into hours.',
    impact: '5× faster urban data processing',
    source: 'Source: AECOM Digital Infrastructure & GIS Analytics 2024'
  },
  {
    name: 'SWA Group', abbr: 'SWA', location: 'USA',
    tags: ['Landscape'], cat: 'landscape',
    usecase: 'Uses AI image generation to quickly produce landscape visualisations from concept sketches, allowing faster client communication and design iteration.',
    impact: '50% faster client presentations',
    source: 'Source: SWA Landscape Computational Design Report 2024'
  },
  {
    name: 'Sasaki', abbr: 'SAS', location: 'Boston, USA',
    tags: ['Urban Design', 'Landscape'], cat: 'landscape',
    usecase: 'Combines GIS data with AI pattern recognition to identify the most ecologically sensitive areas to protect in large-scale urban development plans.',
    impact: 'Data-driven ecological planning',
    source: 'Source: Sasaki Eco-Planning & GIS Machine Learning Group'
  },
  {
    name: 'Zaha Hadid Architects', abbr: 'ZHA', location: 'London, UK',
    tags: ['Architecture'], cat: 'architecture',
    usecase: 'Uses parametric AI tools to computationally generate complex curved forms and facades, optimising both aesthetics and structural performance simultaneously.',
    impact: 'Pioneering computational design',
    source: 'Source: ZHA CODE Research Papers 2023–2024'
  },
  {
    name: 'MAD Architects', abbr: 'MAD', location: 'Beijing / LA / Rome',
    tags: ['Architecture', 'Urban Design'], cat: 'architecture',
    usecase: 'Integrates AI parametric tools with organic "Shanshui" concept design, transforming hand sketches into fluid, structural-optimised forms and complex digital fabrication models.',
    impact: '70% faster organic form-finding',
    source: 'Source: MAD Architects Monograph & Parametric AI Insights'
  },
];

const MAP_LOCATIONS = [
  {
    name: 'CPG Corporation (HQ)',
    coords: [103.7423, 1.3337],
    city: 'Singapore (Westgate Tower)',
    type: 'star',
    usecase: 'Global Headquarters driving AI innovation across architecture, engineering, and urban development across Asia-Pacific.',
    impact: 'Regional AI Transformation Hub',
    source: 'Source: CPG Corporation HQ Singapore'
  },
  {
    name: 'CPG Vietnam (HCMC)',
    coords: [106.6297, 10.8231],
    city: 'Ho Chi Minh City, Vietnam',
    type: 'star',
    usecase: 'Vietnam Digital Office pilot hub leading bottom-up AI adoption in architectural design, BOQ parsing, and master-planning.',
    impact: 'Active Vietnam AI Pilot Hub',
    source: 'Source: CPG Vietnam Digital Office 2026'
  },
  {
    name: 'Zaha Hadid Architects',
    coords: [-0.105, 51.520],
    city: 'London, UK (Global HQ)',
    type: 'red',
    usecase: 'Uses parametric AI tools (ZHA CODE) to computationally generate complex curved forms and facades.',
    impact: 'Pioneering computational design',
    source: 'Source: ZHA CODE Research Papers 2023–2024'
  },
  {
    name: 'Foster + Partners',
    coords: [-0.165, 51.485],
    city: 'London, UK (Global HQ)',
    type: 'blue',
    usecase: 'Applied R&D group using custom AI models for solar radiation, wind microclimate, and carbon optimization.',
    impact: '40% faster environmental analysis',
    source: 'Source: Foster + Partners Technology Report 2024'
  },
  {
    name: 'Arup',
    coords: [-0.138, 51.535],
    city: 'London, UK (Global HQ)',
    type: 'cyan',
    usecase: 'Runs AI agents to validate structural models, detect clashes in BIM, and predict material failure.',
    impact: '60% reduction in BIM check time',
    source: 'Source: Arup Digital & AI Engineering Case Studies'
  },
  {
    name: 'MAD Architects',
    coords: [116.4074, 39.9042],
    city: 'Beijing, China (Global HQ)',
    type: 'orange',
    usecase: 'Integrates AI parametric tools with organic "Shanshui" concept design, transforming hand sketches into fluid forms.',
    impact: '70% faster organic form-finding',
    source: 'Source: MAD Architects Monograph & Parametric AI Insights'
  },
  {
    name: 'Gensler',
    coords: [-122.4194, 37.7749],
    city: 'San Francisco, USA (Global HQ)',
    type: 'green',
    usecase: 'Proprietary gScale AI algorithms optimize floorplate efficiency and workspace layout from employee sensor data.',
    impact: '30% improvement in space efficiency',
    source: 'Source: Gensler Research Institute Design Forecast 2024'
  },
  {
    name: 'NBBJ',
    coords: [-122.3321, 47.6062],
    city: 'Seattle, USA (Global HQ)',
    type: 'purple',
    usecase: 'Partners with AI tools to design human-centric office layouts using spatial predictive sentiment AI.',
    impact: 'Predictive employee experience design',
    source: 'Source: Fast Company Most Innovative Companies (NBBJ AI Design)'
  },
  {
    name: 'BIG – Bjarke Ingels Group',
    coords: [12.5683, 55.6761],
    city: 'Copenhagen, Denmark (Global HQ)',
    type: 'gold',
    usecase: 'Generative AI tests thousands of building massing variations at once, balancing views, sunlight, and density.',
    impact: '10× more design options explored',
    source: 'Source: BIG Tech Lab & ArchDaily Computational Review'
  },
  {
    name: 'AECOM',
    coords: [-96.7970, 32.7767],
    city: 'Dallas, Texas, USA (Global HQ)',
    type: 'blue',
    usecase: 'Uses AI to process satellite imagery and traffic data for urban master-planning, turning weeks into hours.',
    impact: '5× faster urban data processing',
    source: 'Source: AECOM Digital Infrastructure & GIS Analytics'
  },
  {
    name: 'SWA Group',
    coords: [-122.4853, 37.8590],
    city: 'Sausalito, California, USA (HQ)',
    type: 'green',
    usecase: 'Uses AI image generation to quickly produce landscape visualisations from concept sketches for client presentations.',
    impact: '50% faster client presentations',
    source: 'Source: SWA Landscape Computational Design Report'
  },
  {
    name: 'Sasaki',
    coords: [-71.1852, 42.3709],
    city: 'Watertown, Mass., USA (Global HQ)',
    type: 'green',
    usecase: 'Combines GIS data with AI pattern recognition to identify ecologically sensitive areas in urban plans.',
    impact: 'Data-driven ecological planning',
    source: 'Source: Sasaki Eco-Planning & GIS Machine Learning Group'
  }
];

let maplibreInstance = null;

function initMapLibre() {
  const container = document.getElementById('maplibreCanvas');
  if (!container || typeof maplibregl === 'undefined') return;

  if (!maplibreInstance) {
     maplibreInstance = new maplibregl.Map({
      container: 'maplibreCanvas',
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [15, 25],
      zoom: 2.1,
      pitch: 0,
      renderWorldCopies: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      scrollZoom: { around: 'center' },
      touchZoomRotate: { around: 'center' }
    });

    maplibreInstance.touchZoomRotate.disableRotation();
    maplibreInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');

    // Keep the map's internal canvas size in sync with its actual on-screen
    // size at all times. If the container resizes (e.g. layout shifts,
    // window resize) without a matching map.resize() call, MapLibre's
    // projection math goes stale and pins will visibly drift off their
    // true coordinates as soon as you zoom or pan. A ResizeObserver makes
    // sure that never happens, so every pin stays geo-anchored in place.
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => maplibreInstance.resize());
      ro.observe(container);
    }
    window.addEventListener('resize', () => maplibreInstance.resize());

    MAP_LOCATIONS.forEach(loc => {
      const el = document.createElement('div');
      el.className = `maplibre-pin-wrap ${loc.type === 'star' ? 'm-star' : 'm-' + loc.type}`;
      el.innerHTML = loc.type === 'star' ?
        `<span class="mnode-pulse star-pulse"></span><span class="mnode-dot star-dot">⭐️</span><span class="mnode-label cpg-label">${loc.name}</span>` :
        `<span class="mnode-pulse"></span><span class="mnode-dot"></span><span class="mnode-label">${loc.name}</span>`;

      // Explicit zero offset + center anchor: the marker's geo-coordinate
      // always maps to the exact center of this 14x14 element, regardless
      // of the label/pulse elements that visually overflow it.
      new maplibregl.Marker({ element: el, anchor: 'center', offset: [0, 0] })
        .setLngLat(loc.coords)
        .addTo(maplibreInstance);

      el.addEventListener('click', () => {
        document.querySelectorAll('.maplibre-pin-wrap').forEach(m => m.classList.remove('active'));
        el.classList.add('active');

        const mipName = document.getElementById('mipName');
        const mipLoc = document.getElementById('mipLoc');
        const mipUsecase = document.getElementById('mipUsecase');
        const mipImpact = document.getElementById('mipImpact');
        const mipSource = document.getElementById('mipSource');

        if (mipName) mipName.textContent = loc.name;
        if (mipLoc) mipLoc.innerHTML = `<i class="fa-solid fa-location-dot fa-xs"></i> ${loc.city}`;
        if (mipUsecase) mipUsecase.textContent = loc.usecase;
        if (mipImpact) mipImpact.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> ${loc.impact}`;
        if (mipSource) mipSource.textContent = loc.source;

        if (currentLanguage === 'vi') {
          const popup = document.getElementById('mapInfoPanel');
          if (popup) translateElement(popup);
          else [mipLoc, mipUsecase, mipImpact, mipSource].forEach(el => el && translateElement(el));
        }

        maplibreInstance.flyTo({ center: loc.coords, zoom: 4.0, speed: 0.8 });
      });
    });
  }

  setTimeout(() => {
    maplibreInstance.resize();
  }, 100);
}

function initFirms() {
  const grid = document.getElementById('firmsGrid');
  const mapWrap = document.getElementById('firmsMapWrap');
  if (!grid) return;

  function renderFirms(filter) {
    if (filter === 'all') {
      grid.classList.add('hidden');
      if (mapWrap) mapWrap.classList.remove('hidden');
      initMapLibre();
      return;
    }

    grid.classList.remove('hidden');
    if (mapWrap) mapWrap.classList.add('hidden');

    grid.innerHTML = '';
    FIRMS.forEach(f => {
      if (filter !== 'all' && f.cat !== filter) return;
      const card = document.createElement('div');
      card.className = 'firm-card';
      card.innerHTML = `
        <div class="firm-top">
          <div class="firm-logo-box">${f.abbr.substring(0,2)}</div>
          <div>
            <div class="firm-name">${f.name}</div>
            <div class="firm-location"><i class="fa-solid fa-location-dot fa-xs"></i> ${f.location}</div>
          </div>
        </div>
        <div class="firm-tag-row">${f.tags.map(t => `<span class="firm-tag">${t}</span>`).join('')}</div>
        <p class="firm-usecase">${f.usecase}</p>
        <div class="firm-impact"><i class="fa-solid fa-arrow-trend-up"></i> ${f.impact}</div>
        <div class="firm-source">${f.source || ''}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderFirms('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFirms(btn.dataset.filter);
    });
  });
}

