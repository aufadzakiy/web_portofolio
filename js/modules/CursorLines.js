export default class CursorLines {
    constructor() {
        this.hero = document.getElementById('hero');
        this.horizontalLine = document.querySelector('.cursor-line-h');
        this.verticalLine = document.querySelector('.cursor-line-v');
        this.init();
    }

    init() {
        if (!this.hero || !this.horizontalLine || !this.verticalLine) return;

        this.hero.addEventListener('mousemove', (e) => {
            const rect = this.hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update horizontal line
            this.horizontalLine.style.transform = `translateY(${y}px)`;

            // Update vertical line
            this.verticalLine.style.transform = `translateX(${x}px)`;
        });

        this.hero.addEventListener('mouseleave', () => {
            this.horizontalLine.style.transform = 'translateY(-100%)';
            this.verticalLine.style.transform = 'translateX(-100%)';
        });
    }
}