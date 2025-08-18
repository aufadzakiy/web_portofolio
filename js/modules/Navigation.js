export default class Navigation {
    constructor() {
        this.navbar = document.getElementById('main-navbar');
        this.navLinks = this.navbar.querySelectorAll('.nav-link');
        this.scrollThreshold = 50; // Pixels to scroll before adding glass effect
        this.init();
    }

    init() {
        if (!this.navbar) return;

        // Initial check for scroll position
        this.handleScroll();

        // Add scroll event listener
        window.addEventListener('scroll', () => this.handleScroll());

        // Handle active link states
        this.handleNavLinkClicks();
    }

    handleScroll() {
        const scrolled = window.scrollY > this.scrollThreshold;
        
        // Add or remove scrolled class
        this.navbar.classList.toggle('scrolled', scrolled);

        // Optional: Add fade effect
        if (scrolled) {
            this.navbar.style.opacity = '1';
        } else {
            this.navbar.style.opacity = '0.9';
        }
    }

    handleNavLinkClicks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                this.navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');

                // Smooth scroll to section
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}