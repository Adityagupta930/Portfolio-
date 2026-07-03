// ===== GALAXY STARS =====
const galaxyCanvas = document.getElementById('galaxyCanvas');
const gCtx = galaxyCanvas.getContext('2d');
galaxyCanvas.width = window.innerWidth;
galaxyCanvas.height = window.innerHeight;
window.addEventListener('resize', () => { galaxyCanvas.width = window.innerWidth; galaxyCanvas.height = window.innerHeight; });

const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    o: Math.random() * 0.7 + 0.1,
    speed: Math.random() * 0.3 + 0.05,
    twinkle: Math.random() * Math.PI * 2
}));

const shootingStars = [];
function spawnShootingStar() {
    shootingStars.push({
        x: Math.random() * window.innerWidth * 0.7,
        y: Math.random() * window.innerHeight * 0.4,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        opacity: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3
    });
}
setInterval(spawnShootingStar, 2500);

function drawGalaxy() {
    gCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
    stars.forEach(s => {
        s.twinkle += 0.02;
        const opacity = s.o * (0.6 + 0.4 * Math.sin(s.twinkle));
        gCtx.beginPath();
        gCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        gCtx.fillStyle = `rgba(255,255,255,${opacity})`;
        gCtx.fill();
        s.y -= s.speed * 0.1;
        if (s.y < 0) { s.y = galaxyCanvas.height; s.x = Math.random() * galaxyCanvas.width; }
    });
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const grad = gCtx.createLinearGradient(ss.x, ss.y, ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        grad.addColorStop(0, `rgba(255,255,255,${ss.opacity})`);
        grad.addColorStop(0.3, `rgba(168,85,247,${ss.opacity * 0.6})`);
        grad.addColorStop(1, 'transparent');
        gCtx.beginPath();
        gCtx.strokeStyle = grad;
        gCtx.lineWidth = 1.5;
        gCtx.moveTo(ss.x, ss.y);
        gCtx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        gCtx.stroke();
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.015;
        if (ss.opacity <= 0) shootingStars.splice(i, 1);
    }
    requestAnimationFrame(drawGalaxy);
}
drawGalaxy();

// ===== NEURAL NETWORK BACKGROUND =====
const neuralCanvas = document.getElementById('neuralCanvas');
const nCtx = neuralCanvas.getContext('2d');
neuralCanvas.width = window.innerWidth;
neuralCanvas.height = window.innerHeight;
window.addEventListener('resize', () => { neuralCanvas.width = window.innerWidth; neuralCanvas.height = window.innerHeight; });

const nodes = Array.from({ length: 40 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 3 + 2,
    pulse: Math.random() * Math.PI * 2
}));

function drawNeural() {
    nCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
    nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.pulse += 0.03;
        if (n.x < 0 || n.x > neuralCanvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > neuralCanvas.height) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
                const alpha = (1 - dist / 180) * 0.5;
                const grad = nCtx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                grad.addColorStop(0, `rgba(124,58,237,${alpha})`);
                grad.addColorStop(1, `rgba(6,182,212,${alpha})`);
                nCtx.beginPath();
                nCtx.strokeStyle = grad;
                nCtx.lineWidth = 0.8;
                nCtx.moveTo(nodes[i].x, nodes[i].y);
                nCtx.lineTo(nodes[j].x, nodes[j].y);
                nCtx.stroke();
            }
        }
    }
    nodes.forEach(n => {
        const glow = nCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        glow.addColorStop(0, `rgba(168,85,247,${0.6 + 0.4 * Math.sin(n.pulse)})`);
        glow.addColorStop(1, 'transparent');
        nCtx.beginPath();
        nCtx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        nCtx.fillStyle = glow;
        nCtx.fill();
        nCtx.beginPath();
        nCtx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        nCtx.fillStyle = `rgba(168,85,247,${0.8 + 0.2 * Math.sin(n.pulse)})`;
        nCtx.fill();
    });
    requestAnimationFrame(drawNeural);
}
drawNeural();

// ===== GEOMETRIC GRID =====
const gridCanvas = document.getElementById('gridCanvas');
const grCtx = gridCanvas.getContext('2d');
gridCanvas.width = window.innerWidth;
gridCanvas.height = window.innerHeight * 0.4;
window.addEventListener('resize', () => { gridCanvas.width = window.innerWidth; gridCanvas.height = window.innerHeight * 0.4; });

let gridOffset = 0;
function drawGrid() {
    grCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    const W = gridCanvas.width, H = gridCanvas.height;
    const vp = { x: W / 2, y: 0 };
    const cols = 20, rows = 12;
    const cellW = W / cols;
    gridOffset = (gridOffset + 0.3) % cellW;

    grCtx.strokeStyle = 'rgba(124,58,237,0.6)';
    grCtx.lineWidth = 0.6;

    for (let i = -1; i <= cols + 1; i++) {
        const x = i * cellW - gridOffset;
        grCtx.beginPath();
        grCtx.moveTo(vp.x + (x - W / 2) * 0.01, vp.y);
        grCtx.lineTo(x, H);
        grCtx.stroke();
    }
    for (let j = 1; j <= rows; j++) {
        const y = (j / rows) * H;
        const perspective = j / rows;
        const xStart = W / 2 - (W / 2) * perspective;
        const xEnd = W / 2 + (W / 2) * perspective;
        const alpha = perspective * 0.8;
        grCtx.strokeStyle = `rgba(6,182,212,${alpha})`;
        grCtx.beginPath();
        grCtx.moveTo(xStart, y);
        grCtx.lineTo(xEnd, y);
        grCtx.stroke();
    }
    requestAnimationFrame(drawGrid);
}
drawGrid();

// ===== PAGE LOADER =====
const loaderTexts = ['Initializing AI...', 'Loading LLMs...', 'Connecting RAG...', 'Building Portfolio...', 'Almost Ready...'];
const loaderBar = document.getElementById('loaderBar');
const loaderTextEl = document.getElementById('loaderText');
const pageLoader = document.getElementById('pageLoader');
let loaderProgress = 0;
let loaderTxtIdx = 0;

const loaderInterval = setInterval(() => {
    loaderProgress += Math.random() * 18 + 8;
    if (loaderProgress > 100) loaderProgress = 100;
    loaderBar.style.width = loaderProgress + '%';
    if (loaderTxtIdx < loaderTexts.length - 1 && loaderProgress > (loaderTxtIdx + 1) * 20) {
        loaderTxtIdx++;
        loaderTextEl.textContent = loaderTexts[loaderTxtIdx];
    }
    if (loaderProgress >= 100) {
        clearInterval(loaderInterval);
        setTimeout(() => pageLoader.classList.add('hidden'), 400);
    }
}, 200);

// ===== TESTIMONIALS CAROUSEL =====
const testiTrack = document.getElementById('testiTrack');
const testiDots = document.getElementById('testiDots');
const cards = testiTrack ? testiTrack.querySelectorAll('.testi-card') : [];
let testiIdx = 0;
let cardsVisible = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;

if (cards.length) {
    // Create dots
    const totalSlides = cards.length - cardsVisible + 1;
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        testiDots.appendChild(dot);
    }

    function goToSlide(idx) {
        testiIdx = Math.max(0, Math.min(idx, totalSlides - 1));
        const cardW = cards[0].offsetWidth + 24;
        testiTrack.style.transform = `translateX(-${testiIdx * cardW}px)`;
        testiDots.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === testiIdx));
    }

    document.getElementById('testiNext').addEventListener('click', () => goToSlide(testiIdx + 1 >= totalSlides ? 0 : testiIdx + 1));
    document.getElementById('testiPrev').addEventListener('click', () => goToSlide(testiIdx - 1 < 0 ? totalSlides - 1 : testiIdx - 1));

    // Auto slide every 4s
    setInterval(() => goToSlide(testiIdx + 1 >= totalSlides ? 0 : testiIdx + 1), 4000);
}

// ===== CURSOR TRAIL =====
const trailColors = ['#7c3aed','#a855f7','#06b6d4','#22d3ee','#10b981'];
document.addEventListener('mousemove', e => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
    trail.style.boxShadow = `0 0 6px ${trail.style.background}`;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-primary-hero, .btn-ghost-hero, .btn-resume, .social-btn, .tab-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
    });
});

// ===== TYPING SOUND =====
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playKeySound() {
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
        osc.type = 'square';
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start(); osc.stop(audioCtx.currentTime + 0.05);
    } catch(e) {}
}
document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('keydown', playKeySound);
});

// ===== KONAMI CODE EASTER EGG =====
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
const easterEgg = document.getElementById('easterEgg');
const easterClose = document.getElementById('easterClose');

document.addEventListener('keydown', e => {
    if (e.key === konamiCode[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konamiCode.length) {
            konamiIdx = 0;
            easterEgg.classList.add('active');
            launchConfetti();
            launchConfetti();
            showToast('🎮 Konami Code Activated!', 'success', 'fa-gamepad');
        }
    } else { konamiIdx = 0; }
});
easterClose.addEventListener('click', () => easterEgg.classList.remove('active'));
easterEgg.addEventListener('click', e => { if (e.target === easterEgg) easterEgg.classList.remove('active'); });

// ===== 3D GLOBE =====
const globeCanvas = document.getElementById('globeCanvas');
if (globeCanvas) {
    const gc = globeCanvas.getContext('2d');
    const R = 140; const cx = 150; const cy = 150;
    let angle = 0;
    const dots = [];
    // Generate random dots on sphere surface
    for (let i = 0; i < 300; i++) {
        const lat = (Math.random() - 0.5) * Math.PI;
        const lon = Math.random() * 2 * Math.PI;
        dots.push({ lat, lon });
    }
    // India marker
    const india = { lat: 20.5 * Math.PI / 180, lon: 78.9 * Math.PI / 180 };

    function drawGlobe() {
        gc.clearRect(0, 0, 300, 300);
        // Globe base
        const grad = gc.createRadialGradient(cx-40, cy-40, 10, cx, cy, R);
        grad.addColorStop(0, 'rgba(124,58,237,0.15)');
        grad.addColorStop(1, 'rgba(5,11,24,0.8)');
        gc.beginPath();
        gc.arc(cx, cy, R, 0, Math.PI * 2);
        gc.fillStyle = grad;
        gc.fill();

        // Draw dots
        dots.forEach(d => {
            const lon = d.lon + angle;
            const x3 = R * Math.cos(d.lat) * Math.sin(lon);
            const y3 = R * Math.sin(d.lat);
            const z3 = R * Math.cos(d.lat) * Math.cos(lon);
            if (z3 > 0) {
                const sx = cx + x3; const sy = cy - y3;
                const brightness = z3 / R;
                gc.beginPath();
                gc.arc(sx, sy, 1.2, 0, Math.PI * 2);
                gc.fillStyle = `rgba(168,85,247,${brightness * 0.8})`;
                gc.fill();
            }
        });

        // Latitude lines
        for (let lat = -60; lat <= 60; lat += 30) {
            const latR = lat * Math.PI / 180;
            gc.beginPath();
            let first = true;
            for (let lon = 0; lon <= 360; lon += 5) {
                const lonR = lon * Math.PI / 180 + angle;
                const x3 = R * Math.cos(latR) * Math.sin(lonR);
                const y3 = R * Math.sin(latR);
                const z3 = R * Math.cos(latR) * Math.cos(lonR);
                if (z3 > 0) {
                    const sx = cx + x3; const sy = cy - y3;
                    first ? gc.moveTo(sx, sy) : gc.lineTo(sx, sy);
                    first = false;
                } else { first = true; }
            }
            gc.strokeStyle = 'rgba(6,182,212,0.12)';
            gc.lineWidth = 0.5; gc.stroke();
        }

        // India marker
        const iLon = india.lon + angle;
        const ix = R * Math.cos(india.lat) * Math.sin(iLon);
        const iy = R * Math.sin(india.lat);
        const iz = R * Math.cos(india.lat) * Math.cos(iLon);
        if (iz > 0) {
            const sx = cx + ix; const sy = cy - iy;
            gc.beginPath();
            gc.arc(sx, sy, 5, 0, Math.PI * 2);
            gc.fillStyle = '#10b981';
            gc.fill();
            gc.beginPath();
            gc.arc(sx, sy, 9, 0, Math.PI * 2);
            gc.strokeStyle = 'rgba(16,185,129,0.5)';
            gc.lineWidth = 1.5; gc.stroke();
        }

        // Globe border glow
        gc.beginPath();
        gc.arc(cx, cy, R, 0, Math.PI * 2);
        gc.strokeStyle = 'rgba(124,58,237,0.3)';
        gc.lineWidth = 1.5; gc.stroke();

        angle += 0.005;
        requestAnimationFrame(drawGlobe);
    }
    drawGlobe();
}

// ===== ACCORDION TIMELINE =====
document.querySelectorAll('.acc-item').forEach(item => {
    item.querySelector('.acc-header').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ===== NEON SECTION TITLES =====
document.querySelectorAll('.section-title').forEach(el => {
    el.setAttribute('data-text', el.textContent);
});

// ===== MATRIX RAIN =====
const matrixCanvas = document.getElementById('matrixCanvas');
const mCtx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;
window.addEventListener('resize', () => { matrixCanvas.width = window.innerWidth; matrixCanvas.height = window.innerHeight; });

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコ';
const fontSize = 14;
let matrixCols = Math.floor(matrixCanvas.width / fontSize);
let matrixDrops = Array(matrixCols).fill(1);
let matrixActive = false;

function drawMatrix() {
    if (!matrixActive) return;
    mCtx.fillStyle = 'rgba(5,11,24,0.05)';
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mCtx.fillStyle = '#a855f7';
    mCtx.font = fontSize + 'px Fira Code';
    matrixDrops.forEach((y, i) => {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        mCtx.fillStyle = Math.random() > 0.95 ? '#06b6d4' : '#7c3aed';
        mCtx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) matrixDrops[i] = 0;
        matrixDrops[i]++;
    });
    requestAnimationFrame(drawMatrix);
}

// Activate matrix on hero section hover
const heroSection = document.getElementById('home');
heroSection.addEventListener('mouseenter', () => {
    if (!matrixActive) {
        matrixActive = true;
        matrixCanvas.classList.add('active');
        drawMatrix();
    }
});
heroSection.addEventListener('mouseleave', () => {
    matrixActive = false;
    matrixCanvas.classList.remove('active');
    mCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
});

// ===== VIBE WIDGET =====
const vibeTexts = [
    'Coding & Building AI...',
    'Training Neural Networks 🧠',
    'Debugging at 2AM 🕶️',
    'Drinking Coffee ☕',
    'Reading AI Papers 📚',
    'Building RAG Systems 🔗',
    'Prompt Engineering ✨',
    'Deploying to AWS ☁️',
    'Fine-tuning LLMs 🤖',
    'In the Flow State 🚀',
];
let vibeIdx = 0;
const vibeTrackEl = document.getElementById('vibeTrack');
setInterval(() => {
    vibeIdx = (vibeIdx + 1) % vibeTexts.length;
    vibeTrackEl.style.opacity = '0';
    setTimeout(() => {
        vibeTrackEl.textContent = vibeTexts[vibeIdx];
        vibeTrackEl.style.opacity = '1';
    }, 300);
}, 3000);
vibeTrackEl.style.transition = 'opacity 0.3s ease';

// ===== HIRE ME MODAL =====
const hireModal = document.getElementById('hireModal');
const hireMeBtn = document.getElementById('hireMeBtn');
const modalClose = document.getElementById('modalClose');

hireMeBtn.addEventListener('click', () => {
    hireModal.classList.add('active');
    showToast('👋 Let\'s connect!', 'success', 'fa-handshake');
});
modalClose.addEventListener('click', () => hireModal.classList.remove('active'));
hireModal.addEventListener('click', e => { if (e.target === hireModal) hireModal.classList.remove('active'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') hireModal.classList.remove('active'); });

// ===== CONFETTI =====
function launchConfetti() {
    const colors = ['#7c3aed','#a855f7','#06b6d4','#10b981','#f59e0b','#ef4444'];
    for (let i = 0; i < 80; i++) {
        const el = document.createElement('div');
        el.style.cssText = `
            position:fixed; width:${Math.random()*10+5}px; height:${Math.random()*10+5}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            left:${Math.random()*100}vw; top:-20px;
            border-radius:${Math.random()>0.5?'50%':'2px'};
            z-index:99999; pointer-events:none;
            animation: confettiFall ${Math.random()*2+1.5}s ease-in forwards;
            animation-delay:${Math.random()*0.5}s;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
@keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity:1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity:0; }
}`;
document.head.appendChild(confettiStyle);

// ===== FLOATING AI ORB =====
const aiOrb = document.getElementById('aiOrb');
aiOrb.addEventListener('click', () => {
    const chatBox = document.getElementById('chatBox');
    const chatBadge = document.querySelector('.chat-badge');
    const chatIcon = document.getElementById('chatIcon');
    chatBox.classList.add('open');
    chatBadge.style.display = 'none';
    chatIcon.className = 'fas fa-times';
    showToast('🤖 AI Assistant opened!', 'info', 'fa-robot');
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    showToast(isLight ? '☀️ Light mode on' : '🌙 Dark mode on', 'info', isLight ? 'fa-sun' : 'fa-moon');
});

// ===== CURSOR GLOW + CUSTOM CURSOR =====
const cursorGlow = document.getElementById('cursorGlow');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Scale dot on hovering clickable elements
document.querySelectorAll('a, button, .project-card, .cert-card, .expertise-card, .pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursorDot.style.background = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.background = 'var(--primary2)';
    });
});

// ===== 3D TILT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
    });
});

// ===== EXPERTISE CARD TILT =====
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
    });
});

// ===== PARTICLES =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== NAVBAR + SCROLL PROGRESS + BACK TO TOP =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (window.scrollY / total * 100) + '%';
    backToTop.classList.toggle('visible', window.scrollY > 400);
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== TYPEWRITER =====
const words = [
    'LLM Applications 🤖',
    'RAG Systems 🧠',
    'Agentic AI 🕵️',
    'GenAI Products ✨',
    'NLP Pipelines 💬',
    'AI at Scale 🚀'
];
let wordIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
    const word = words[wordIndex];
    typeEl.textContent = isDeleting ? word.substring(0, charIndex--) : word.substring(0, charIndex++);

    if (!isDeleting && charIndex === word.length + 1) {
        setTimeout(() => isDeleting = true, 1800);
    } else if (isDeleting && charIndex === -1) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
    }
    setTimeout(typeWriter, isDeleting ? 60 : 100);
}
typeWriter();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count;
        if (count >= target) clearInterval(timer);
    }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounter(e.target);
            counterObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== SKILLS TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
});

// ===== SCROLL ANIMATIONS =====
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            fadeObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .timeline-card, .contact-card, .expertise-card, .cert-card, .badge').forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
});

// ===== TOAST =====
function showToast(msg, type = 'info', icon = 'fa-info-circle') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fadeout');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ===== SPOTLIGHT SEARCH =====
const spotlightData = [
    { icon: 'fa-home',        title: 'Home',          desc: 'Back to top',                    href: '#home' },
    { icon: 'fa-user',        title: 'About Me',      desc: 'Know more about Aditya',         href: '#about' },
    { icon: 'fa-code',        title: 'Skills',        desc: 'LangChain, PyTorch, AWS...',     href: '#skills' },
    { icon: 'fa-rocket',      title: 'Projects',      desc: 'MetaConverse, BERT Filter...',   href: '#projects' },
    { icon: 'fa-briefcase',   title: 'Experience',    desc: 'Metapercept, Vision Infotech',   href: '#experience' },
    { icon: 'fa-envelope',    title: 'Contact',       desc: 'Get in touch with Aditya',       href: '#contact' },
    { icon: 'fa-brain',       title: 'LLMs & RAG',    desc: 'AI Skill',                       href: '#skills' },
    { icon: 'fa-robot',       title: 'Agentic AI',    desc: 'AI Skill',                       href: '#skills' },
    { icon: 'fa-comments',    title: 'MetaConverse',  desc: 'Multi-domain AI Chatbot',        href: '#projects' },
    { icon: 'fa-filter',      title: 'Comment Shield','desc': 'Abusive Language Filter',      href: '#projects' },
    { icon: 'fa-download',    title: 'Download Resume','desc': 'Get Aditya\'s CV',            href: 'Aditya_Gupta_.Resume....pdf' },
    { icon: 'fa-linkedin',    title: 'LinkedIn',      desc: 'Connect on LinkedIn',            href: 'https://www.linkedin.com/in/aditya-gupta-943b52243/' },
    { icon: 'fa-github',      title: 'GitHub',        desc: 'View GitHub profile',            href: 'https://github.com/Adityagupta930/' },
];

const overlay = document.getElementById('spotlightOverlay');
const spotInput = document.getElementById('spotlightInput');
const spotResults = document.getElementById('spotlightResults');
let selectedIdx = -1;

function openSpotlight() {
    overlay.classList.add('active');
    spotInput.value = '';
    spotInput.focus();
    renderSpotlight('');
    showToast('Spotlight Search opened', 'info', 'fa-search');
}

function closeSpotlight() {
    overlay.classList.remove('active');
    selectedIdx = -1;
}

function renderSpotlight(query) {
    const filtered = query
        ? spotlightData.filter(d => d.title.toLowerCase().includes(query.toLowerCase()) || d.desc.toLowerCase().includes(query.toLowerCase()))
        : spotlightData;
    spotResults.innerHTML = filtered.map((d, i) => `
        <a class="spotlight-item ${i === selectedIdx ? 'selected' : ''}" href="${d.href}" data-idx="${i}">
            <div class="spotlight-item-icon"><i class="fas ${d.icon}"></i></div>
            <div class="spotlight-item-text"><h4>${d.title}</h4><p>${d.desc}</p></div>
        </a>`).join('');
    spotResults.querySelectorAll('.spotlight-item').forEach(item => {
        item.addEventListener('click', () => closeSpotlight());
    });
}

document.getElementById('searchBtn').addEventListener('click', openSpotlight);
overlay.addEventListener('click', e => { if (e.target === overlay) closeSpotlight(); });
spotInput.addEventListener('input', e => { selectedIdx = -1; renderSpotlight(e.target.value); });

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSpotlight(); }
    if (e.key === 'Escape') closeSpotlight();
    if (overlay.classList.contains('active')) {
        const items = spotResults.querySelectorAll('.spotlight-item');
        if (e.key === 'ArrowDown') { selectedIdx = Math.min(selectedIdx + 1, items.length - 1); renderSpotlight(spotInput.value); }
        if (e.key === 'ArrowUp') { selectedIdx = Math.max(selectedIdx - 1, 0); renderSpotlight(spotInput.value); }
        if (e.key === 'Enter' && selectedIdx >= 0) { items[selectedIdx]?.click(); closeSpotlight(); }
    }
});

// ===== AI CHAT WIDGET =====
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const chatIcon = document.getElementById('chatIcon');
const chatBadge = document.querySelector('.chat-badge');

const aiReplies = {
    'skill': `Aditya specializes in:\n🤖 LLMs, RAG, Agentic AI\n⚡ LangChain, LlamaIndex, LangGraph\n🧠 PyTorch, TensorFlow, Scikit-learn\n☁️ AWS, Docker, MLflow`,
    'project': `Featured projects:\n💬 MetaConverse Bot — Multi-domain RAG chatbot\n🔍 Comment Shield — BERT-based abuse filter (91% acc)\n📄 AI Mock Paper Generator — 500+ students/day\n🖼️ Stable Diffusion Research — 20-40% FID improvement`,
    'experience': `Work experience:\n🏢 AI Developer @ Metapercept Technology (Jun 2025–Present)\n💻 AI Intern @ Vision Infotech (Dec 2024–May 2025)\n🔬 Research Intern @ Univ. of West London (Dec 2023–Apr 2024)`,
    'contact': `You can reach Aditya at:\n📧 adityagupta021103@gmail.com\n📞 +91 93017 76202\n💼 linkedin.com/in/aditya-gupta-943b52243\n🐙 github.com/Adityagupta930`,
    'education': `🎓 B.Tech CSE @ Parul University, Gujarat\nCGPA: 8.46/10 | Sep 2021 – Apr 2025`,
    'certif': `Certifications:\n🏆 Microsoft Azure AI Fundamentals\n📜 NPTEL: Intro to ML & Software Engineering\n🧠 DeepLearning.AI ML Specialization\n🐍 Udemy: Complete Python Developer`,
    'default': `I can answer about Aditya's skills, projects, experience, education, or contact info. What would you like to know? 😊`
};

function getAIReply(msg) {
    const m = msg.toLowerCase();
    if (m.includes('skill') || m.includes('tech') || m.includes('langchain') || m.includes('python')) return aiReplies.skill;
    if (m.includes('project') || m.includes('work') || m.includes('built') || m.includes('chatbot')) return aiReplies.project;
    if (m.includes('experience') || m.includes('job') || m.includes('intern') || m.includes('company')) return aiReplies.experience;
    if (m.includes('contact') || m.includes('email') || m.includes('reach') || m.includes('hire')) return aiReplies.contact;
    if (m.includes('educat') || m.includes('degree') || m.includes('university') || m.includes('cgpa')) return aiReplies.education;
    if (m.includes('certif') || m.includes('azure') || m.includes('nptel') || m.includes('coursera')) return aiReplies.certif;
    return aiReplies.default;
}

function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    div.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChat(msg) {
    if (!msg.trim()) return;
    document.querySelector('.chat-suggestions')?.remove();
    addMsg(msg, 'user');
    chatInput.value = '';
    setTimeout(() => {
        addMsg(getAIReply(msg), 'bot');
    }, 600);
}

chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('open');
    chatBadge.style.display = 'none';
    chatIcon.className = chatBox.classList.contains('open') ? 'fas fa-times' : 'fas fa-robot';
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('open');
    chatIcon.className = 'fas fa-robot';
});

chatSend.addEventListener('click', () => sendChat(chatInput.value));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(chatInput.value); });

document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => sendChat(btn.textContent));
});

// Show welcome toast on load
window.addEventListener('load', () => {
    setTimeout(() => showToast('👋 Welcome! Press Ctrl+K to search', 'info', 'fa-keyboard'), 2000);
    setTimeout(() => showToast('💬 Chat with Aditya\'s AI assistant →', 'success', 'fa-robot'), 4500);
});

// Toast on contact form submit
document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    const data = new FormData(e.target);
    try {
        const res = await fetch('https://formspree.io/f/mwvabzza', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            showToast('✅ Message sent! Aditya will reply soon.', 'success', 'fa-check-circle');
            launchConfetti();
            e.target.reset();
        } else {
            throw new Error();
        }
    } catch {
        btn.innerHTML = '<i class="fas fa-times"></i> Failed!';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        showToast('❌ Something went wrong. Try again!', 'info', 'fa-exclamation-circle');
    }
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);
});
