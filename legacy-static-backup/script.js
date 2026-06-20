/**
 * Kinga Resorts - Enhanced JavaScript
 * Features: Carousel, Lazy Loading, Scroll Animations, Accessibility, Performance Optimization
 */

(function () {
    'use strict';

    // ========================================
    // 0. WELCOME OVERLAY
    // ========================================
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    if (welcomeOverlay) {
        setTimeout(() => {
            welcomeOverlay.remove();
        }, 2500); // Remove after fade animation completes (1.5s delay + 1s fade)
    }

    // ========================================
    // 1. HERO CAROUSEL
    // ========================================
    const initHeroCarousel = () => {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');

        let currentSlide = 0;
        let autoPlayInterval;

        const showSlide = (index) => {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        const goToSlide = (index) => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoPlay();
        };

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            }
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Initialize
        showSlide(0);
        startAutoPlay();
    };

    // ========================================
    // 1. LAZY LOADING IMAGES
    // ========================================
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            images.forEach(img => imageObserver.observe(img));
        }
    };

    // ========================================
    // 2. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = this.getAttribute('href');
                if (target !== '#' && document.querySelector(target)) {
                    e.preventDefault();
                    document.querySelector(target).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // ========================================
    // 3. SCROLL ANIMATION OBSERVER
    // ========================================
    const initScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections and cards
        document.querySelectorAll('section:not(.hero-section), .card-custom').forEach(el => {
            animationObserver.observe(el);
        });
    };

    // ========================================
    // 4. STICKY BOOKING BAR
    // ========================================
    const initStickyBookingBar = () => {
        const bookingBar = document.getElementById('stickyBookingBar');
        if (!bookingBar) return;

        let lastScrollTop = 0;
        const scrollThreshold = 500;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > scrollThreshold && scrollTop > lastScrollTop) {
                // Scrolling down and past threshold
                bookingBar.classList.add('show');
            } else if (scrollTop < scrollThreshold) {
                // Near top
                bookingBar.classList.remove('show');
            }

            lastScrollTop = scrollTop;
        }, { passive: true });
    };

    // ========================================
    // 5. NAVBAR SCROLL EFFECT
    // ========================================
    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                navbar.style.paddingTop = '0.5rem';
                navbar.style.paddingBottom = '0.5rem';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                navbar.style.paddingTop = '1rem';
                navbar.style.paddingBottom = '1rem';
            }
        }, { passive: true });
    };

    // ========================================
    // 6. KEYBOARD NAVIGATION ENHANCEMENTS
    // ========================================
    const initKeyboardNav = () => {
        // Add keyboard support for card CTAs
        document.querySelectorAll('.card-custom').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const link = card.querySelector('a.btn');
                    if (link) link.click();
                }
            });
        });

        // Trap focus in mobile menu when open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', () => {
                const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    // Focus first menu item
                    setTimeout(() => {
                        const firstLink = navbarCollapse.querySelector('a');
                        if (firstLink) firstLink.focus();
                    }, 300);
                }
            });
        }
    };

    // ========================================
    // 7. FORM VALIDATION & ACCESSIBILITY
    // ========================================
    const initFormEnhancements = () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Basic validation
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.setAttribute('aria-invalid', 'true');
                        input.classList.add('is-invalid');
                    } else {
                        input.setAttribute('aria-invalid', 'false');
                        input.classList.remove('is-invalid');
                    }
                });

                if (isValid) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'alert alert-success mt-3';
                    successMsg.setAttribute('role', 'alert');
                    successMsg.textContent = 'Thank you! We will get back to you soon.';
                    form.appendChild(successMsg);

                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        successMsg.remove();
                    }, 3000);
                }
            });
        });
    };

    // ========================================
    // 8. PERFORMANCE MONITORING (Core Web Vitals)
    // ========================================
    const logWebVitals = () => {
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift (CLS)
            let clsScore = 0;
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsScore += entry.value;
                        console.log('CLS:', clsScore);
                    }
                });
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    };

    // ========================================
    // 9. PRELOAD CRITICAL RESOURCES
    // ========================================
    const preloadCriticalResources = () => {
        // Preconnect to external domains
        const preconnectDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdn.jsdelivr.net',
            'https://cdnjs.cloudflare.com'
        ];

        preconnectDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    const init = () => {
        // Run on DOM ready
        initHeroCarousel();
        lazyLoadImages();
        initSmoothScroll();
        initScrollAnimations();
        // initStickyBookingBar();
        initNavbarScroll();
        initKeyboardNav();
        initFormEnhancements();
        preloadCriticalResources();

        // Log performance metrics (development only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logWebVitals();
        }

        // Announce page load to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'Page loaded successfully';
        document.body.appendChild(announcement);
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
