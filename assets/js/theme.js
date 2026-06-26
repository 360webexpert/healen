(function () {
    const toggle = document.querySelector('[data-mobile-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
        accordion.querySelectorAll('.accordion-item button').forEach((button) => {
            button.addEventListener('click', () => {
                const item = button.closest('.accordion-item');
                if (!item) return;
                item.classList.toggle('open');
            });
        });
    });

    document.querySelectorAll('[data-testimonials]').forEach((slider) => {
        const slides = Array.from(slider.querySelectorAll('blockquote'));
        const prev = slider.querySelector('[data-prev]');
        const next = slider.querySelector('[data-next]');
        let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));

        const show = (index) => {
            if (!slides.length) return;
            active = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === active);
            });
        };

        if (prev) prev.addEventListener('click', () => show(active - 1));
        if (next) next.addEventListener('click', () => show(active + 1));
    });
}());
