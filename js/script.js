// Navbar scroll & Parallax & Scroll Progress
const navbar = document.getElementById('mainNav');
const scrollProgress = document.getElementById('scrollProgress');
const glow1 = document.querySelector('.glow1');
const glow2 = document.querySelector('.glow2');

window.addEventListener('scroll', () => {
  // Navbar Scrolled State
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll Progress Bar
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) scrollProgress.style.width = scrolled + "%";

  // Parallax Effect for Hero Glows
  if (glow1) glow1.style.transform = `translateY(${window.scrollY * 0.4}px)`;
  if (glow2) glow2.style.transform = `translateY(${window.scrollY * 0.2}px)`;
});

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
function updateNav() {
  const pos = window.scrollY + 120;
  sections.forEach(s => {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + s.id) l.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateNav);

// Close mobile nav
const navCollapse = document.getElementById('navbarNav');
navLinks.forEach(l => {
  l.addEventListener('click', () => {
    if (navCollapse.classList.contains('show')) new bootstrap.Collapse(navCollapse).hide();
  });
});

// Fade-up animation
const fadeEls = document.querySelectorAll('.fade-up');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
fadeEls.forEach(el => obs.observe(el));

// Typing effect
const typingEl = document.getElementById('typingText');
const roles = ['Flutter Developer', 'Cross-Platform App Developer'];
let ri = 0, ci = 0, del = false;
function typeIt() {
  const cur = roles[ri];
  typingEl.textContent = del ? cur.substring(0, --ci) : cur.substring(0, ++ci);
  let spd = del ? 45 : 95;
  if (!del && ci === cur.length) { spd = 2000; del = true; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; spd = 400; }
  setTimeout(typeIt, spd);
}
typeIt();

// Particles
(function () {
  const c = document.getElementById('heroParticles');
  if (!c) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 14 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    const s = Math.random() * 3 + 1;
    p.style.width = p.style.height = s + 'px';
    c.appendChild(p);
  }
})();

// Counter animation
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const t = +el.dataset.target, sx = el.dataset.suffix || '';
    let cur = 0;
    const inc = t / 50;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= t) { el.textContent = t + sx; clearInterval(timer); }
      else el.textContent = Math.floor(cur) + sx;
    }, 35);
  });
}
const heroObs = new IntersectionObserver((e) => {
  if (e[0].isIntersecting) { animateCounters(); heroObs.disconnect(); }
}, { threshold: 0.3 });
heroObs.observe(document.getElementById('hero'));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Use animate for smooth lagging effect on the outline
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Effects
const interactables = document.querySelectorAll('a, button, .proj-card, .skill-card, .mac-btns span');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.classList.add('hover-active');
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.classList.remove('hover-active');
  });
});

// Vanilla Tilt 3D Effect for Cards
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".proj-card"), {
    max: 3,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
  });
  VanillaTilt.init(document.querySelectorAll(".skill-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });
  VanillaTilt.init(document.querySelectorAll(".code-window"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
  });
}

// ===== INTERACTIVE TERMINAL =====
const termWindow = document.getElementById('terminalOverlay');
const termInput = document.getElementById('terminalInput');
const termBody = document.getElementById('terminalBody');

// Focus input when clicking anywhere on the terminal window
if (termWindow && termInput) {
  termWindow.addEventListener('click', () => {
    termInput.focus();
  });
}

// Terminal Commands
const commands = {
  help: `<span class="term-info">Available commands:</span><br>
         about    - Who is Mohib?<br>
         skills   - List technical skills<br>
         projects - View featured work<br>
         contact  - Get my contact info<br>
         clear    - Clear terminal screen<br>
         exit     - Close the terminal<br>
         sudo     - ?????`,
  about: `Hi, I'm Mohib Khorajiya. A Flutter Developer & Computer Engineering student from Gujarat, India.`,
  skills: `Flutter, Dart, Firebase, Riverpod, GetX, GraphQL, SQLite, REST API, Git.`,
  projects: `Resify, DistriGo, Xpanse, Wallora, GitScope, CommerceLQ. Type 'exit' to view them in the UI.`,
  contact: `Email: mohibkhorajiya848@gmail.com<br>LinkedIn: linkedin.com/in/mohib-khorajiya<br>GitHub: github.com/MohibKhorajiya01`,
  whoami: `You are a recruiter/visitor admiring my awesome portfolio!`,
  "sudo rm -rf /": `<span class="term-err">Nice try! You don't have root privileges to delete my portfolio.</span>`,
  sudo: `<span class="term-err">Mohib is not in the sudoers file. This incident will be reported.</span>`
};

const termSubmitBtn = document.getElementById('terminalSubmitBtn');

function processTerminalCommand() {
  const val = termInput.value.trim().toLowerCase();
  termInput.value = '';

  if (val === '') return;

  const echoDiv = document.createElement('div');
  echoDiv.innerHTML = `<span class="prompt"><span class="d-none d-md-inline">mohib@portfolio:</span>~$</span> ${val}`;
  termBody.appendChild(echoDiv);

  if (val === 'clear') {
    termBody.innerHTML = `<div>Terminal cleared. Type 'help' for commands.</div>`;
    return;
  }
  if (val === 'exit') {
    termBody.innerHTML = `<div>Session closed. Type 'help' to restart.</div>`;
    return;
  }

  const replyDiv = document.createElement('div');
  if (commands[val]) {
    replyDiv.innerHTML = commands[val];
  } else {
    replyDiv.innerHTML = `<span class="term-err">bash: ${val}: command not found</span>`;
  }
  termBody.appendChild(replyDiv);
  termBody.scrollTop = termBody.scrollHeight;
}

if (termInput) {
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      processTerminalCommand();
    }
  });
}
if (termSubmitBtn) {
  termSubmitBtn.addEventListener('click', processTerminalCommand);
}

// ===== GALLERY MODAL LOGIC =====
const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryClose = document.getElementById('galleryClose');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryCounter = document.getElementById('galleryCounter');
const galleryBtns = document.querySelectorAll('.btn-gallery');

let currentImages = [];
let currentIndex = 0;

function updateGallery() {
  if (currentImages.length > 0) {
    galleryImage.src = currentImages[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }
}

galleryBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const imagesAttr = btn.getAttribute('data-images');
    if (imagesAttr) {
      currentImages = imagesAttr.split(',');
      currentIndex = 0;
      updateGallery();
      galleryModal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
  });
});

galleryClose.addEventListener('click', () => {
  galleryModal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restore scroll
});

galleryNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateGallery();
});

galleryPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateGallery();
});

// Close modal when clicking outside the image
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) {
    galleryModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
});
