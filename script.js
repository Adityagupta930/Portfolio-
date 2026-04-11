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
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        showToast('✅ Message sent successfully!', 'success', 'fa-check-circle');
        e.target.reset();
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 2000);
});
