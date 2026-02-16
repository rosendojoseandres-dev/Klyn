document.addEventListener('DOMContentLoaded', () => {
    // Navigation Slider Logic
    const navItems = document.querySelectorAll('.nav-item');
    const slider = document.getElementById('navSlider');

    function updateSlider(item) {
        const itemRect = item.getBoundingClientRect();
        const navRect = item.parentElement.getBoundingClientRect();
        slider.style.width = `${itemRect.width}px`;
        slider.style.left = `${itemRect.left - navRect.left}px`;
    }

    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        // Initial delay to allow layout to settle
        setTimeout(() => updateSlider(activeItem), 100);
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            updateSlider(item);

            // Smooth scroll
            const targetId = item.getAttribute('href');
            if (targetId && targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-item.active');
        if (currentActive) updateSlider(currentActive);
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation via Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
