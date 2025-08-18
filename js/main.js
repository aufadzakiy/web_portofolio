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

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
