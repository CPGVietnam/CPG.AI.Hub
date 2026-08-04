/* ══════════════════
   VIDEO SECTION
══════════════════ */
const VIDEOS = [
  // AI Basics
  {
    id: 'qYNweeDHiyU', title: 'AI, Machine Learning, Deep Learning and Generative AI Explained', duration: '10:01',
    cat: 'basics', catLabel: 'AI Basics',
    thumb: `https://i.ytimg.com/vi/qYNweeDHiyU/mqdefault.jpg`,
    src: 'IBM Technology'
  },
  {
    id: 'PeMlggyqz0Y', title: 'Machine Learning Explained in 100 Seconds', duration: '2:35',
    cat: 'basics', catLabel: 'AI Basics',
    thumb: `https://i.ytimg.com/vi/PeMlggyqz0Y/mqdefault.jpg`,
    src: 'Fireship'
  },
  // AI Tools
  {
    id: 'poM2n8fBcag', title: 'ChatGPT Tutorial for Beginners: How to Actually Get Work Done', duration: '14:31',
    cat: 'tools', catLabel: 'AI Tools',
    thumb: `https://i.ytimg.com/vi/poM2n8fBcag/mqdefault.jpg`,
    src: 'YouTube'
  },
  {
    id: 'd-CuF6dlqLg', title: 'Microsoft Copilot Tutorial for Beginners', duration: '14:10',
    cat: 'tools', catLabel: 'AI Tools',
    thumb: `https://i.ytimg.com/vi/d-CuF6dlqLg/mqdefault.jpg`,
    src: 'YouTube'
  },
  // Design & Architecture
  {
    id: 'uXpa89qFj0c', title: '3 AI Tools Architects Should Be Using by Now', duration: '12:26',
    cat: 'design', catLabel: 'Design & Architecture',
    thumb: `https://i.ytimg.com/vi/uXpa89qFj0c/mqdefault.jpg`,
    src: 'Show It Better'
  },
  {
    id: 'yBdOtWSA5_o', title: 'How I Used Enscape + Veras AI to Create Stunning Renders!', duration: '17:00',
    cat: 'design', catLabel: 'Design & Architecture',
    thumb: `https://i.ytimg.com/vi/yBdOtWSA5_o/mqdefault.jpg`,
    src: 'Show It Better'
  },
  // Work & Productivity
  {
    id: '4uvX6dxD6QA', title: '5 AI for Work Tips and Tricks', duration: '15:37',
    cat: 'workplace', catLabel: 'Work & Productivity',
    thumb: `https://i.ytimg.com/vi/4uvX6dxD6QA/mqdefault.jpg`,
    src: 'YouTube'
  },
  {
    id: 'htZRCE2GgIs', title: 'The Only AI Tools You Need (12-Minute Productivity Guide)', duration: '11:56',
    cat: 'workplace', catLabel: 'Work & Productivity',
    thumb: `https://i.ytimg.com/vi/htZRCE2GgIs/mqdefault.jpg`,
    src: 'Jeff Su'
  },
];


function initVideoSection() {
  const grid = document.getElementById('videoGrid');
  if (!grid) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.className = 'video-lightbox';
  lb.id = 'videoLightbox';
  lb.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" id="lightboxClose">&times;</button>
      <iframe id="lightboxFrame" class="lightbox-frame" allowfullscreen allow="autoplay"></iframe>
    </div>
  `;
  document.body.appendChild(lb);

  const frame = document.getElementById('lightboxFrame');
  document.getElementById('lightboxClose').addEventListener('click', () => {
    lb.classList.remove('open');
    frame.src = '';
  });
  lb.addEventListener('click', e => {
    if (e.target === lb) { lb.classList.remove('open'); frame.src = ''; }
  });

  function renderVideos(cat) {
    grid.innerHTML = '';
    const filtered = cat === 'all' ? VIDEOS : VIDEOS.filter(v => v.cat === cat);
    filtered.forEach(v => {
      const isShort = v.src.toLowerCase().includes('short') || v.duration.startsWith('0:') || v.duration === '1:00';
      const card = document.createElement('div');
      card.className = `video-card${isShort ? ' is-short' : ''}`;
      card.innerHTML = `
        <div class="video-thumb">
          <img src="${v.thumb}" alt="${v.title}" loading="lazy">
          <div class="video-thumb-overlay">
            <div class="play-btn-circle"><i class="fa-solid fa-play fa-xs"></i></div>
          </div>
          <span class="video-duration">${v.duration}</span>
        </div>
        <div class="video-info">
          <div class="video-cat">${v.catLabel}${isShort ? ' · Shorts' : ''}</div>
          <div class="video-title">${v.title}</div>
          <div class="video-src"><i class="fa-brands fa-youtube" style="color:#ff0000;"></i> ${v.src}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        const inner = lb.querySelector('.lightbox-inner');
        if (isShort) {
          inner.classList.add('is-short-frame');
        } else {
          inner.classList.remove('is-short-frame');
        }
        frame.src = `https://www.youtube.com/embed/${v.id}?autoplay=1`;
        lb.classList.add('open');
      });
      grid.appendChild(card);
    });
  }

  renderVideos('all');

  document.querySelectorAll('.vf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderVideos(btn.dataset.vcat);
    });
  });

  // Hero "Watch 1-min videos" button: open the clearest, most foundational
  // video directly in the lightbox instead of just scrolling to the grid.
  // Staff who want more can still scroll down afterwards to see all videos.
  const FEATURED_VIDEO_ID = 'qYNweeDHiyU'; // "AI, ML, Deep Learning and Generative AI Explained"
  const heroBtn = document.getElementById('heroWatchBtn');
  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      const featured = VIDEOS.find(v => v.id === FEATURED_VIDEO_ID);
      if (!featured) return; // fall back to normal scroll link if not found
      e.preventDefault();
      frame.src = `https://www.youtube.com/embed/${featured.id}?autoplay=1`;
      lb.classList.add('open');
    });
  }
}

