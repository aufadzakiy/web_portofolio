export default class TextRotator {
    constructor(element, options = {}) {
        this.element = element;
        this.texts = options.texts || ['Halo, Halo', 'Saya Aufa'];
        this.delay = options.delay || 3000;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        // Set initial text
        this.element.textContent = '';
        this.typeText();
    }

    async typeText() {
        const text = this.texts[this.currentIndex];
        
        // Typing animation
        for (let char of text) {
            await this.wait(100);
            this.element.textContent += char;
        }

        // Wait before erasing
        await this.wait(this.delay);
        
        // Erasing animation
        while(this.element.textContent.length > 0) {
            await this.wait(50);
            this.element.textContent = this.element.textContent.slice(0, -1);
        }

        // Move to next text
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        
        // Repeat
        this.typeText();
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}