/* ── Language Toggle ── */
window._currentLang = 'pt';
window._roles = [
  'Dev Front-End 🌷',
  'QA em formação ✨',
  'Criadora de interfaces 🌸',
  'Apaixonada por código ☁️'
];

function setLang(lang) {
  document.querySelectorAll('[data-pt]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (val.includes('<em>')) { el.innerHTML = val; }
    else { el.textContent = val; }
  });

  document.querySelectorAll('[data-placeholder-pt]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang) || el.placeholder;
  });

  if (lang === 'en') {
    window._roles = ['Front-End Developer 🌷','QA in training ✨','Interface creator 🌸','Code lover ☁️'];
  } else {
    window._roles = ['Dev Front-End 🌷','QA em formação ✨','Criadora de interfaces 🌸','Apaixonada por código ☁️'];
  }

  document.getElementById('btn-pt').classList.toggle('active', lang === 'pt');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  window._currentLang = lang;
}

/* ── Custom Cursor ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .stag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.opacity = '0.5';
  });
});

/* ── Typing Animation ── */
let ri = 0, ci = 0, del = false;
const typingEl = document.getElementById('typing');

function type() {
  const roles = window._roles;
  const current = roles[ri % roles.length];
  if (!del) {
    typingEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = current.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 50 : 90);
}
type();

/* ── Floating Petals ── */
const canvas = document.getElementById('petals');
const ctx = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const COLS = ['#f0b0b0','#f5c8c8','#e8a8b0','#d4c0c0','#f5e0e0','#d8e8d0','#fce4ec'];

function Petal() { this.reset(); }
Petal.prototype.reset = function() {
  this.x     = Math.random() * W;
  this.y     = -20;
  this.sz    = Math.random() * 8 + 3;
  this.sp    = Math.random() * 0.8 + 0.3;
  this.a     = Math.random() * Math.PI * 2;
  this.spin  = (Math.random() - 0.5) * 0.05;
  this.drift = (Math.random() - 0.5) * 0.5;
  this.op    = Math.random() * 0.45 + 0.2;
  this.col   = COLS[Math.floor(Math.random() * COLS.length)];
};
Petal.prototype.update = function() {
  this.y += this.sp;
  this.x += this.drift + Math.sin(this.y * 0.018) * 0.6;
  this.a += this.spin;
  if (this.y > H + 20) this.reset();
};
Petal.prototype.draw = function() {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.a);
  ctx.globalAlpha = this.op;
  ctx.fillStyle   = this.col;
  ctx.beginPath();
  ctx.ellipse(0, 0, this.sz * 0.55, this.sz, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

for (let i = 0; i < 40; i++) {
  const p = new Petal();
  p.y = Math.random() * H;
  pts.push(p);
}

(function loop() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(loop);
})();

/* ── Scroll Reveal ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
