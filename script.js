// ═══════════════════════════════════
//  GABRIELLE SIMONE — Portfolio JS
//  Dark / Nichol Style
// ═══════════════════════════════════

// INIT — força visibilidade imediata para elementos acima da dobra
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 100);
});

// ── 1. CURSOR CUSTOMIZADO ──────────────────────────
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  cursor.style.opacity = '1';
  trail.style.opacity  = '1';
});

(function loop() {
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  trail.style.left = rx + 'px';
  trail.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .skill-card, .proj-card, .acad-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
});

// ── 2. SCROLL REVEAL ──────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── 3. CONTADOR ───────────────────────────────────
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target) {
      const target = +e.target.dataset.target;
      let cur = 0;
      const iv = setInterval(() => {
        cur = Math.min(cur + 1, target);
        e.target.textContent = cur;
        if (cur >= target) clearInterval(iv);
      }, 55);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ── 4. NAVBAR + SCROLL TOP ────────────────────────
const nav       = document.getElementById('nav');
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 50);
  scrollBtn.classList.toggle('show', scrollY > 400);

  // Active link highlight
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (s.getBoundingClientRect().top <= 130) cur = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
