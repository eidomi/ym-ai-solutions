let isHebrew = true;

// Error Tracking with Google Analytics
window.onerror = function(message, source, lineno, colno, error) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: `${message} at ${source}:${lineno}:${colno}`,
            fatal: false
        });
    }
    return false;
};

window.onunhandledrejection = function(event) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: `Unhandled Promise: ${event.reason}`,
            fatal: false
        });
    }
};

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
    }, { passive: true });
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
        const href = this.getAttribute('href');
        // Skip bottom nav tabs (handled separately) and bare "#" links
        if (this.closest('.bottom-nav') || href === '#') {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
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

// Track scroll depth with throttling for performance
let scrollDepths = [25, 50, 75, 100];
let trackedDepths = [];
let scrollTicking = false;

function trackScrollDepth() {
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
}

window.addEventListener('scroll', function () {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            trackScrollDepth();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });

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

    // LRM character for RTL support
    const LRM = '\u200E';

    // Wrap text in LTR span for proper RTL display
    function wrapLTR(text) {
        return LRM + text;
    }

    // Extract target values from stat numbers
    const targetValues = [];
    statNumbers.forEach((num) => {
        const text = num.textContent.trim().replace(/\u200E/g, ''); // Remove existing LRM

        // Check if it's a simple number+suffix format (e.g., "70%")
        const simpleMatch = text.match(/^(\d+(?:\.\d+)?)(%.*)$/);

        if (simpleMatch) {
            // Simple format: animate the number
            targetValues.push({
                type: 'animated',
                value: parseFloat(simpleMatch[1]),
                suffix: simpleMatch[2],
                element: num,
                originalText: text
            });
        } else {
            // Complex format (24/7, 2-4): don't animate, just display with LRM
            targetValues.push({
                type: 'static',
                element: num,
                originalText: text
            });
        }
    });

    function animateCounter(element, targetValue, suffix, duration = 1500) {
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (targetValue - startValue) * easeOut;

            // Format the number with LRM for RTL support
            if (Number.isInteger(targetValue)) {
                element.textContent = wrapLTR(Math.round(currentValue) + suffix);
            } else {
                element.textContent = wrapLTR(currentValue.toFixed(1) + suffix);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.classList.add('counting');
                setTimeout(() => element.classList.remove('counting'), 300);
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

                    // Start animations
                    targetValues.forEach((stat, index) => {
                        setTimeout(() => {
                            if (stat.type === 'animated') {
                                animateCounter(stat.element, stat.value, stat.suffix);
                            } else {
                                // Static: just set text with LRM wrapper
                                stat.element.textContent = wrapLTR(stat.originalText);
                                stat.element.classList.add('counting');
                                setTimeout(() => stat.element.classList.remove('counting'), 300);
                            }
                        }, index * 150);
                    });
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

// Bottom Navigation Active State Tracking
function initBottomNav() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (!bottomNav) return;

    const tabs = bottomNav.querySelectorAll('.bottom-nav-tab');
    const sections = ['hero', 'services', 'proof', 'contact'];

    // Map section IDs to their elements
    const sectionElements = sections.map(id => {
        return document.getElementById(id);
    }).filter(Boolean);

    // Intersection Observer for active state
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || 'hero';
                updateActiveTab(sectionId);
            }
        });
    }, observerOptions);

    sectionElements.forEach(section => {
        sectionObserver.observe(section);
    });

    function updateActiveTab(sectionId) {
        tabs.forEach(tab => {
            const tabSection = tab.dataset.section;
            if (tabSection === sectionId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#') {
                // Scroll to top for home
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Check initial scroll position on load
    setTimeout(() => {
        const scrollPos = window.scrollY;
        if (scrollPos < 100) {
            updateActiveTab('hero');
        }
    }, 100);
}

initBottomNav();
