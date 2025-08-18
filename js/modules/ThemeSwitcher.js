export default class ThemeSwitcher {
    constructor() {
        // Get initial theme
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set initial theme
        this.applyTheme(this.theme);
        
        // Get theme switcher button and icon
        const themeSwitcher = document.getElementById('theme-switcher');
        this.icon = themeSwitcher.querySelector('i');
        
        // Add click event
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', () => {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                this.applyTheme(this.theme);
            });
        }
    }

    applyTheme(theme) {
        // Apply theme to HTML element
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save theme to localStorage
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (this.icon) {
            this.icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            
            // Add rotation animation
            this.icon.style.transition = 'transform 0.3s ease';
            this.icon.style.transform = 'rotate(360deg)';
            
            setTimeout(() => {
                this.icon.style.transform = 'rotate(0)';
            }, 300);
        }
    }
}