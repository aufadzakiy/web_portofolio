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
        this.setupEventListeners();
    }

    initializeComponents() {
        // Remove the old theme switcher initialization
        // this.initThemeSwitcher(); // Remove or comment this line
        
        // Other component initializations
        this.initNavigation();
        this.initHero();
        this.initBackToTop();
    }

    setupEventListeners() {
        // Setup global event listeners
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Component initializers
    initNavigation() {
        // Navigation logic
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

    initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 200);
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    initThemeSwitcher() {
        const themeSwitcher = document.getElementById('theme-switcher');
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', () => {
                this.themeSwitcher.toggleTheme();
            });
        }
    }
}

// Update particle initialization
function addParticles(sectionId) {
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

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi untuk kedua section
    addParticles('about');
    addParticles('projects');
    
    // Tambahkan interval untuk memperbarui posisi particles
    setInterval(() => {
        addParticles('about');
        addParticles('projects');
    }, 30000); // Perbarui setiap 30 detik
});

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Update in your App class or add to your main.js file
function initFloatingButtons() {
    const btnBackToTop = document.getElementById('back-to-top');
    const btnWhatsApp = document.querySelector('.btn-whatsapp');
    
    window.addEventListener('scroll', () => {
        const isVisible = window.scrollY > 200;
        
        // Toggle back-to-top button
        btnBackToTop.classList.toggle('show', isVisible);
        
        // Shift WhatsApp button up when back-to-top is visible
        btnWhatsApp.classList.toggle('shift-up', isVisible);
    });
}

// Add this to your initialization code
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing code ...
    initFloatingButtons();
});
