/* ── main.js — Projects Page ── */

// ── 1. FILTER FUNCTIONALITY ──────────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const tags = card.dataset.tags || '';

      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
        // re-trigger entrance animation
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ── 2. SCROLL-TRIGGERED CARD ENTRANCE ────────────────────────────────────────
// Cards animate in as they scroll into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = Array.from(cards).indexOf(card);

      // stagger delay based on card position
      setTimeout(() => {
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }, index * 100);

      observer.unobserve(card);
    }
  });
}, observerOptions);

cards.forEach(card => observer.observe(card));


// ── 3. CARD GLOW FOLLOWS MOUSE ───────────────────────────────────────────────
// The glow effect on each card tracks the mouse position for a 3D feel
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width)  * 100;
    const y     = ((e.clientY - rect.top)  / rect.height) * 100;
    const glow  = card.querySelector('.card-glow');

    if (glow) {
      glow.style.background =
        `radial-gradient(ellipse at ${x}% ${y}%, rgba(200,241,53,0.12) 0%, transparent 60%)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.background =
        'radial-gradient(ellipse at top left, rgba(200,241,53,0.15) 0%, transparent 60%)';
    }
  });
});


// ── 4. KEYBOARD NAVIGATION FOR FILTERS ───────────────────────────────────────
filterBtns.forEach((btn, i) => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = filterBtns[i + 1] || filterBtns[0];
      next.focus();
      next.click();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = filterBtns[i - 1] || filterBtns[filterBtns.length - 1];
      prev.focus();
      prev.click();
    }
  });
});


// ── 5. LIVE BADGE PULSE ───────────────────────────────────────────────────────
// Makes the ● in the Live badge pulse independently
const liveLink = document.querySelector('.live-link');
if (liveLink) {
  const dot = document.createTextNode('');
  // just ensure the CSS animation runs — no JS needed beyond confirming element exists
  liveLink.setAttribute('title', 'This project is live');
}
