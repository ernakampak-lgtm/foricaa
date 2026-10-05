/* ==========================================================================
   MAIN APPLICATION & UI INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Cyber Welcome Preloader Screen Animation
    (function initWelcomePreloader() {
        const loader = document.getElementById('welcome-loader');
        if (!loader) return;

        // Ensure lucide icons are initialized immediately
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Prevent body scroll during intro animation
        document.body.style.overflow = 'hidden';

        const progressBar = document.getElementById('loader-progress-bar');
        const percentText = document.getElementById('loader-percent');
        let progress = 0;
        let isClosed = false;

        // Initial GSAP animation setup for intro elements (all icons appear together instantly)
        if (typeof gsap !== 'undefined') {
            gsap.from("#loader-icons", {
                opacity: 0,
                y: -20,
                duration: 0.5,
                ease: "power2.out"
            });

            gsap.from("#loader-text-wrap", {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.3,
                ease: "power3.out"
            });

            gsap.from("#loader-progress-wrap", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.8,
                ease: "power2.out"
            });
        }

        function closeLoader() {
            if (isClosed) return;
            isClosed = true;

            // Immediately allow pointer events to pass through to website
            loader.style.pointerEvents = 'none';
            document.body.style.overflow = '';

            if (typeof gsap !== 'undefined') {
                gsap.timeline({
                    onComplete: () => {
                        loader.style.display = 'none';
                    }
                })
                .to("#welcome-loader > div", {
                    opacity: 0,
                    y: -25,
                    duration: 0.35,
                    ease: "power2.in"
                })
                .to(loader, {
                    opacity: 0,
                    scale: 1.03,
                    duration: 0.55,
                    ease: "power2.inOut"
                }, "-=0.2");
            } else {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 600);
            }
        }

        // Progress counter animation: 1% to 100% fast & smooth increment (~1.6s)
        const statusText = document.getElementById('loader-status-text');
        const interval = setInterval(() => {
            progress += 1;

            if (statusText) {
                if (progress < 25) statusText.textContent = "INITIALIZING CORE...";
                else if (progress < 50) statusText.textContent = "LOADING CYBER MODULES...";
                else if (progress < 75) statusText.textContent = "CONNECTING 3D CANVAS...";
                else if (progress < 95) statusText.textContent = "MOUNTING AUDIO ENGINE...";
                else statusText.textContent = "ACCESS GRANTED...";
            }

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                if (progressBar) progressBar.style.width = '100%';
                if (percentText) percentText.textContent = '100%';
                setTimeout(closeLoader, 250);
            } else {
                if (progressBar) progressBar.style.width = progress + '%';
                if (percentText) percentText.textContent = progress + '%';
            }
        }, 16);

        // Click or Keypress to Skip Preloader
        loader.addEventListener('click', () => {
            clearInterval(interval);
            closeLoader();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
                clearInterval(interval);
                closeLoader();
            }
        });
    })();

    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Custom Glowing Cursor & Magnetic Follower
    (function initCustomCursor() {
        const follower = document.getElementById('cursor-follower');
        const dot = document.getElementById('cursor-dot');
        if (!follower || !dot) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = mouseX;
        let followerY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        function renderCursor() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Hover state for interactive elements
        const hoverables = document.querySelectorAll('a, button, input, textarea, .glass-card-dark');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
        });
    })();

    // 3. 3D Tilt Effect on Cards (Gyroscopic / Mouse Parallax)
    (function init3DCardsTilt() {
        const cards = document.querySelectorAll('.glass-card-dark');

        cards.forEach(card => {
            let isHoveringButtons = false;

            // Nonaktifkan animasi tilt saat cursor mendekati / berada di atas tombol kontrol terminal
            const buttons = card.querySelectorAll('#btn-terminal-red, #btn-terminal-yellow, #btn-terminal-green');
            buttons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    isHoveringButtons = true;
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
                });
                btn.addEventListener('mouseleave', () => {
                    isHoveringButtons = false;
                });
            });

            card.addEventListener('mousemove', (e) => {
                // Jika mouse menyentuh atau mendekati tombol terminal
                if (e.target.closest('#btn-terminal-red, #btn-terminal-yellow, #btn-terminal-green')) {
                    isHoveringButtons = true;
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
                    return;
                }

                if (isHoveringButtons) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Jika kursor berada di area pojok kiri atas mendekati 3 tombol (radius 90px x 55px)
                if (x < 90 && y < 55) {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
                    return;
                }

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (centerY - y) / 18;
                const rotateY = (x - centerX) / 18;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                isHoveringButtons = false;
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
            });
        });
    })();

    // 4. Enhanced Scroll Reveal Animations for All Elements (Re-triggerable on Scroll Up/Down)
    (function initScrollReveal() {
        const animatableElements = document.querySelectorAll(`
            section h1, 
            section h2, 
            section h3, 
            section p, 
            .glass-card-dark, 
            .glass-card-light, 
            .grid > div,
            .stat-card,
            .skill-item,
            .project-card,
            .achievement-card,
            .contact-form,
            footer > div
        `);

        animatableElements.forEach(el => {
            el.classList.add('reveal-up');
        });

        // Intersection Observer configuration for repeated scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    // Remove class when element exits viewport so animation re-triggers on scroll
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up').forEach(el => {
            observer.observe(el);
        });

        // Navbar scroll background toggle
        function handleNavbarScroll() {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            requestAnimationFrame(handleNavbarScroll);
        }

        requestAnimationFrame(handleNavbarScroll);
    })();
});
