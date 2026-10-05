/* ==========================================================================
   THEME, I18N, TYPEWRITER & FORM INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Switching Logic (ID / EN)
    let currentLang = 'ID';
    const langToggleBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');

    function setLanguage(lang) {
        currentLang = lang;

        // Button cyber tilt & glow animation
        if (langToggleBtn) {
            langToggleBtn.classList.add('lang-btn-cyber');
            setTimeout(() => langToggleBtn.classList.remove('lang-btn-cyber'), 400);
        }

        // Collect all cards, navbar, badges, and feature bars
        const cardsAndBars = document.querySelectorAll(`
            #navbar,
            .glass-card-dark,
            .glass-card-light,
            .stat-card,
            .skill-item,
            .project-card,
            .achievement-card,
            div.bg-black\\/30
        `);

        const textElements = document.querySelectorAll('[data-i18n]');

        // Staggered Wave Bounce + Laser Sweep across cards
        cardsAndBars.forEach((el, index) => {
            el.classList.add('bar-cyber-sweep');
            setTimeout(() => {
                el.classList.add('card-wave-bounce');
            }, (index % 6) * 35); // Staggered wave effect
        });

        // Trigger matrix text collapse effect
        textElements.forEach(el => el.classList.add('lang-matrix-swap'));

        // Swap text language mid-wave (180ms)
        setTimeout(() => {
            if (langLabel) langLabel.textContent = lang;

            textElements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            });

            // Update Typewriter Roles Array dynamically
            if (window.updateTypewriterRoles) {
                window.updateTypewriterRoles(translations[lang].typewriterRoles);
            }

            // Expand text back out gracefully
            setTimeout(() => {
                textElements.forEach(el => el.classList.remove('lang-matrix-swap'));
            }, 30);
        }, 180);

        // Clean up animation classes after wave finishes
        setTimeout(() => {
            cardsAndBars.forEach(el => {
                el.classList.remove('bar-cyber-sweep', 'card-wave-bounce');
            });
        }, 800);
    }

    langToggleBtn?.addEventListener('click', () => {
        const nextLang = currentLang === 'ID' ? 'EN' : 'ID';
        setLanguage(nextLang);
    });

    // 2. Mobile Navigation Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 3. Theme Toggle Functionality (Dark / Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const html = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                document.body.classList.replace('bg-gray-950', 'bg-blue-50');
                document.body.classList.replace('text-slate-100', 'text-blue-950');
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                html.classList.add('dark');
                document.body.classList.replace('bg-blue-50', 'bg-gray-950');
                document.body.classList.replace('text-blue-950', 'text-slate-100');
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        });
    }

    // 4. Typewriter Animation
    let roles = translations.ID.typewriterRoles;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById('typewriter');

    window.updateTypewriterRoles = function(newRoles) {
        roles = newRoles;
        roleIndex = 0;
        charIndex = 0;
        isDeleting = false;
    };

    function typeEffect() {
        if (!typewriterEl) return;
        const currentRole = roles[roleIndex] || roles[0];
        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    if (typewriterEl) typeEffect();

    // 5. Contact Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('form-status');
            if (status) status.classList.remove('hidden');
            e.target.reset();
            setTimeout(() => {
                if (status) status.classList.add('hidden');
            }, 5000);
        });
    }
});
