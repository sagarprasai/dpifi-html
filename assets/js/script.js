// Diverse Patterns Institute for Inclusion - Interactive Scripts

// Immediately restore accessibility preferences from localStorage
try {
    if (localStorage.getItem('dpifi_contrast') === 'true') {
        document.documentElement.classList.add('high-contrast');
    }
    if (localStorage.getItem('dpifi_large_text') === 'true') {
        document.documentElement.style.fontSize = '22.5px';
    }
} catch (e) {}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Text size toggle with localStorage persistence across pages
    const toggleFontSizeBtn = document.getElementById('toggle-font-size');
    const fontStatus = document.getElementById('font-status');
    let isLargeText = false;
    try {
        isLargeText = localStorage.getItem('dpifi_large_text') === 'true';
    } catch (e) {
        // Storage access handled gracefully
    }

    function applyFontSize(large) {
        if (large) {
            document.documentElement.style.fontSize = '22.5px';
            if (fontStatus) fontStatus.textContent = 'Large (125%)';
        } else {
            document.documentElement.style.fontSize = '18px';
            if (fontStatus) fontStatus.textContent = 'Normal';
        }
    }
    applyFontSize(isLargeText);

    if (toggleFontSizeBtn) {
        toggleFontSizeBtn.addEventListener('click', () => {
            isLargeText = !isLargeText;
            try {
                localStorage.setItem('dpifi_large_text', isLargeText);
            } catch (e) {}
            applyFontSize(isLargeText);
        });
    }

    // 3. High contrast toggle with localStorage persistence across pages
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    let isHighContrast = false;
    try {
        isHighContrast = localStorage.getItem('dpifi_contrast') === 'true';
    } catch (e) {}

    function applyContrast(contrast) {
        if (contrast) {
            document.documentElement.classList.add('high-contrast');
            if (toggleContrastBtn) {
                toggleContrastBtn.setAttribute('aria-pressed', 'true');
                toggleContrastBtn.classList.add('contrast-active');
                const label = toggleContrastBtn.querySelector('span:last-child');
                if (label) label.textContent = 'Contrast: On';
            }
        } else {
            document.documentElement.classList.remove('high-contrast');
            if (toggleContrastBtn) {
                toggleContrastBtn.setAttribute('aria-pressed', 'false');
                toggleContrastBtn.classList.remove('contrast-active');
                const label = toggleContrastBtn.querySelector('span:last-child');
                if (label) label.textContent = 'Contrast';
            }
        }
    }
    applyContrast(isHighContrast);

    if (toggleContrastBtn) {
        toggleContrastBtn.addEventListener('click', () => {
            isHighContrast = !isHighContrast;
            try {
                localStorage.setItem('dpifi_contrast', isHighContrast);
            } catch (e) {}
            applyContrast(isHighContrast);
        });
    }

    // 4. Form handlers (contact & get involved forms)
    const forms = document.querySelectorAll('form[data-ajax-form], #contact-form, #get-involved-form');
    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = form.getAttribute('data-success-message') || 'Thank you! Your message has been received. We will get back to you shortly.';
            alert(successMsg);
            form.reset();
        });
    });

    // 5. Subtle scroll entrance reveals with staggered delays
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        // Stagger cards in grids (pillars, projects, board members, values)
        document.querySelectorAll('.grid').forEach((grid) => {
            const cards = grid.querySelectorAll(':scope > div');
            cards.forEach((card, index) => {
                card.classList.add('reveal-on-scroll');
                card.style.transitionDelay = `${Math.min(index * 75, 300)}ms`;
                observer.observe(card);
            });
        });

        // Other key content blocks: section headers, quotes, featured cards
        const contentBlocks = document.querySelectorAll(
            'main section > div > div:first-child, blockquote, .card-bordered'
        );
        contentBlocks.forEach((el) => {
            if (!el.classList.contains('reveal-on-scroll') && !el.closest('.grid')) {
                el.classList.add('reveal-on-scroll');
                observer.observe(el);
            }
        });
    }
});

