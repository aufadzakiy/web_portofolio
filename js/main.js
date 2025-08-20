import Animation from './modules/Animation.js';
import ProjectService from './services/ProjectService.js';
import { config } from './config.js';
import TextRotator from './modules/TextRotator.js';
import ThemeSwitcher from './modules/ThemeSwitcher.js';
import CursorLines from './modules/CursorLines.js';
import Navigation from './modules/Navigation.js';

class App {
    constructor() {
        // Initialize theme switcher first before other components
        this.themeSwitcher = new ThemeSwitcher();
        
        this.animation = new Animation();
        this.projectService = new ProjectService();
        
        this.cursorLines = new CursorLines();
        this.navigation = new Navigation();
        this.init();
    }

    async init() {
        this.initializeComponents();
        await this.loadProjects();
        this.initParticles();
        this.setupEventListeners();
    }

    initializeComponents() {
        // Other component initializations
        this.initNavigation();
        this.initHero();
        this.initFloatingButtons();
    }

    setupEventListeners() {
        // Setup global event listeners
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Event listener untuk theme switcher bisa dipindahkan ke sini jika belum ada di dalam kelas ThemeSwitcher
        const themeSwitcherBtn = document.getElementById('theme-switcher');
        if (themeSwitcherBtn) {
            themeSwitcherBtn.addEventListener('click', () => this.themeSwitcher.toggleTheme());
        }
    }

    // Component initializers
    initNavigation() {
        // Navigation logic
    }

    initFloatingButtons() {
        const btnBackToTop = document.getElementById('back-to-top');
        const btnWhatsApp = document.querySelector('.btn-whatsapp');
        if (!btnBackToTop || !btnWhatsApp) return;
    
        window.addEventListener('scroll', () => {
            const isVisible = window.scrollY > 200;
            btnBackToTop.classList.toggle('show', isVisible);
            btnWhatsApp.classList.toggle('shift-up', isVisible);
        });

        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initHero() {
        const textRotatorElement = document.getElementById('text-rotator');
        if (textRotatorElement) {
            new TextRotator(textRotatorElement, {
                texts: ['Halo, Halo', 'Saya Aufa'],
                delay: 2000
            });
        }
    }

    addParticles(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return; // Guard clause
    
        // Bersihkan particles yang sudah ada
        const existingParticles = section.querySelectorAll('.particle');
        existingParticles.forEach(particle => particle.remove());
    
        // Tambahkan particles baru
        for (let i = 0; i < 30; i++) { // Tambah jumlah particles
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Animasi yang lebih dinamis
            const duration = 15 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            particle.style.animation = `
                float-particle ${duration}s infinite linear ${delay}s,
                fade-in-out ${5 + Math.random() * 5}s infinite alternate-reverse
            `;
            
            section.appendChild(particle);
        }
    }

    initParticles() {
        const sections = ['about', 'projects'];
        sections.forEach(id => this.addParticles(id));
    
        setInterval(() => {
            sections.forEach(id => this.addParticles(id));
        }, 30000); // Perbarui setiap 30 detik
    }
}

// Add floating animation
const floatKeyframes = `
@keyframes float-particle {
    0% { transform: translate(0, 0); }
    33% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
    66% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
    100% { transform: translate(0, 0); }
}

@keyframes fade-in-out {
    0% { opacity: 0.1; }
    100% { opacity: 0.5; }
}`;

// Add keyframes to document
const style = document.createElement('style');
style.textContent = floatKeyframes;
document.head.appendChild(style);

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Mouse trail effect for tech stack section
const aboutSection = document.querySelector('#about');
let trails = [];

aboutSection.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    aboutSection.appendChild(trail);
    
    trails.push(trail);
    
    if (trails.length > 20) {
        const oldTrail = trails.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.remove();
        trails = trails.filter(t => t !== trail);
    }, 1000);
});

// Add random sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'tech-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 200 - 100 + 'px';
    document.querySelector('.tech-floating-elements').appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 300);