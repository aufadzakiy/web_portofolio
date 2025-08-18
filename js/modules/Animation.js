class Animation {
    constructor(options = {}) {
        this.options = {
            duration: 0.3,
            ease: 'power2.out',
            ...options
        };
    }

    fadeIn(element) {
        gsap.from(element, {
            opacity: 0,
            y: 20,
            duration: this.options.duration,
            ease: this.options.ease
        });
    }

    parallax(element, options = {}) {
        ScrollTrigger.create({
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: self => {
                const speed = options.speed || 0.5;
                const y = -self.progress * 100 * speed;
                gsap.set(element, { y });
            }
        });
    }
}

export default Animation;