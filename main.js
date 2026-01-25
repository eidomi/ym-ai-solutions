let isHebrew = true;

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const drawerLinks = drawer.querySelectorAll('a');

    function openDrawer() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        drawer.classList.add('open');
        backdrop.classList.add('visible');
        document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('open');
        backdrop.classList.remove('visible');
        document.body.classList.remove('drawer-open');
    }

    function toggleDrawer() {
        if (drawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    }

    hamburger.addEventListener('click', toggleDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Close drawer on link click
    drawerLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            closeDrawer();
            const target = document.querySelector(
                this.getAttribute('href'),
            );
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }, 300);
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (
            e.key === 'Escape' &&
            drawer.classList.contains('open')
        ) {
            closeDrawer();
        }
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
        if (
            window.innerWidth >= 768 &&
            drawer.classList.contains('open')
        ) {
            closeDrawer();
        }
    });
}

initMobileNav();

function toggleLanguage() {
    isHebrew = !isHebrew;
    const body = document.body;
    const html = document.documentElement;
    const langBtn = document.querySelector('.lang-toggle');

    if (isHebrew) {
        body.classList.remove('en');
        html.setAttribute('lang', 'he');
        html.setAttribute('dir', 'rtl');
        langBtn.textContent = 'EN';
    } else {
        body.classList.add('en');
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langBtn.textContent = 'עב';
    }

    // Update all translatable elements
    document.querySelectorAll('[data-he]').forEach((el) => {
        const text = isHebrew
            ? el.getAttribute('data-he')
            : el.getAttribute('data-en');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.innerHTML = text;
        }
    });

    // Update arrow icons based on language direction
    document.querySelectorAll('.btn-icon use').forEach((icon) => {
        icon.setAttribute(
            'href',
            isHebrew
                ? 'icons.svg#icon-arrow-left'
                : 'icons.svg#icon-arrow-right',
        );
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(
            this.getAttribute('href'),
        );
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document
    .querySelectorAll('.service-card, .timeline-item, .faq-item')
    .forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

// Analytics Event Tracking
// Track CTA button clicks
document
    .querySelectorAll('.btn-primary, .btn-secondary, .contact-btn')
    .forEach((btn) => {
        btn.addEventListener('click', function () {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: this.textContent.trim(),
                });
            }
        });
    });

// Track language switches
const originalToggleLanguage = toggleLanguage;
toggleLanguage = function () {
    originalToggleLanguage();
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_switch', {
            event_category: 'engagement',
            event_label: isHebrew ? 'Hebrew' : 'English',
        });
    }
};

// Track scroll depth
let scrollDepths = [25, 50, 75, 100];
let trackedDepths = [];
window.addEventListener('scroll', function () {
    const scrollPercent = Math.round(
        (window.scrollY /
            (document.body.scrollHeight - window.innerHeight)) *
            100,
    );
    scrollDepths.forEach((depth) => {
        if (
            scrollPercent >= depth &&
            !trackedDepths.includes(depth)
        ) {
            trackedDepths.push(depth);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: depth + '%',
                });
            }
        }
    });
});

// Track FAQ interactions
document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', function () {
        const question =
            this.querySelector('h3').textContent.trim();
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_interaction', {
                event_category: 'engagement',
                event_label: question.substring(0, 50),
            });
        }
    });
});

// Stats Row animation with counter effect
function initStatsAnimation() {
    const statsRow = document.querySelector('.stats-row');
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    // Extract target values from stat numbers
    const targetValues = [];
    statNumbers.forEach((num) => {
        const text = num.textContent.trim();
        const value = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        targetValues.push({ value, suffix, element: num });
    });

    function animateCounter(
        element,
        targetValue,
        suffix,
        duration = 1500,
    ) {
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue =
                startValue + (targetValue - startValue) * easeOut;

            // Format the number
            if (Number.isInteger(targetValue)) {
                element.textContent =
                    Math.round(currentValue) + suffix;
            } else {
                element.textContent =
                    currentValue.toFixed(1) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.classList.add('counting');
                setTimeout(
                    () => element.classList.remove('counting'),
                    300,
                );
            }
        }

        requestAnimationFrame(update);
    }

    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // Make stat items visible with stagger
                    statItems.forEach((item) => {
                        item.classList.add('visible');
                    });

                    // Start counter animations
                    targetValues.forEach(
                        ({ value, suffix, element }, index) => {
                            setTimeout(() => {
                                animateCounter(
                                    element,
                                    value,
                                    suffix,
                                );
                            }, index * 150);
                        },
                    );
                }
            });
        },
        { threshold: 0.3 },
    );

    if (statsRow) {
        statsObserver.observe(statsRow);
    }
}

initStatsAnimation();

// FAQ Accordion functionality with accessibility
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const header = item.querySelector('h3');

        // Add accessibility attributes
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');

        // Click handler
        header.addEventListener('click', () => {
            const isOpen = item.classList.toggle('open');
            header.setAttribute('aria-expanded', isOpen);
        });

        // Keyboard handler (Enter and Space)
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isOpen = item.classList.toggle('open');
                header.setAttribute('aria-expanded', isOpen);
            }
        });
    });
}

initFAQAccordion();
