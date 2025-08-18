export const config = {
    animation: {
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    },
    breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280
    }
};