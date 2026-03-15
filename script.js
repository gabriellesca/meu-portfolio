// =============================================
// 0. FORCE REVEAL FALLBACK
// Garante visibilidade mesmo se observer falhar
// =============================================
window.addEventListener('load', () => {
  // Força reveal de todos os elementos após 100ms
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});

// =============================================
// 1. CURSOR PERSONALIZADO
// Movemos os elementos de cursor junto com o mouse.
// O "anel" segue com suavidade usando interpolação.
// =============================================
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

let mx = 0, my = 0; // posição do mouse
let rx = 0, ry = 0; // posição do anel (suavizada)

// Atualiza a posição do ponto pequeno imediatamente
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// O anel segue o mouse com atraso suave (interpolação linear)
// A fórmula: rx += (mx - rx) * 0.1
// → move 10% da distância restante a cada frame = efeito "elástico"
(function loop() {
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

// Cursor muda ao passar em links/botões/cards
document.querySelectorAll('a, button, .skill-cat, .proj-card, .cert-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
});


// =============================================
// 2. PARTÍCULAS DE FUNDO
// Criamos 28 bolinhas coloridas com tamanhos e
// velocidades aleatórias via CSS animation.
// =============================================
const particlesContainer = document.getElementById('particles');
const particleColors = ['#f72585', '#ff85b3', '#ffd60a', '#00d4a0', '#ffb3cc', '#c9184a'];

for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  p.className = 'particle';

  const size = Math.random() * 10 + 4; // entre 4px e 14px

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    background: ${particleColors[Math.floor(Math.random() * particleColors.length)]};
    animation-duration: ${Math.random() * 14 + 10}s;
    animation-delay: -${Math.random() * 14}s;
  `;

  particlesContainer.appendChild(p);
}


// =============================================
// 3. SCROLL REVEAL — IntersectionObserver
// Detecta quando cada elemento com classe .reveal
// entra na tela e adiciona .visible para animá-lo.
// Muito mais eficiente que ouvir o evento scroll!
// =============================================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // para de observar depois
    }
  });
}, { threshold: 0.01 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// =============================================
// 4. CONTADOR ANIMADO
// Quando os números entram na tela, contam
// de 0 até o valor do atributo data-target.
// =============================================
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.dataset.target) {
      const target  = +entry.target.dataset.target;
      let   current = 0;

      const interval = setInterval(() => {
        current = Math.min(current + 1, target);
        entry.target.textContent = current;
        if (current >= target) clearInterval(interval);
      }, 50);

      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


// =============================================
// 5. NAVBAR — comportamento ao rolar
// Adiciona sombra ao rolar e destaca o link
// da seção que está sendo visualizada.
// =============================================
const nav       = document.getElementById('nav');
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {

  // Sombra na navbar ao rolar
  nav.classList.toggle('scrolled', scrollY > 50);

  // Botão "voltar ao topo" aparece após 400px
  scrollBtn.classList.toggle('show', scrollY > 400);

  // Destaca o link do menu da seção visível
  let currentSection = '';
  document.querySelectorAll('section[id]').forEach(section => {
    if (section.getBoundingClientRect().top <= 130) {
      currentSection = section.id;
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
  });

});

// Clica no botão → volta ao topo suavemente
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// =============================================
// 6. RIPPLE NAS SKILL CARDS
// Rastreia onde o mouse está dentro do card
// e passa as coordenadas como variáveis CSS
// para o efeito radial no ::after.
// =============================================
document.querySelectorAll('.skill-cat').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100) + '%';
    const y = ((e.clientY - rect.top)  / rect.height * 100) + '%';
    card.style.setProperty('--mx', x);
    card.style.setProperty('--my', y);
  });
});