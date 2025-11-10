/**
 * Custom JavaScript for Schlüsseldienst Website
 * Handles mobile menu, smooth scrolling, and scroll animations
 */

(function() {
    'use strict';

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isActive = mainNav.classList.contains('active');
            mobileToggle.innerHTML = isActive
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a:not(.btn-emergency)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#" or empty
            if (href === '#' || href === '' || !href) {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 12px rgba(10, 22, 40, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(10, 22, 40, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .why-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Phone Number Click Tracking (optional - for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone link clicked:', this.href);
            // Add your analytics tracking here if needed
        });
    });

    // Add loading class removal (if you add a loading screen)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Pricing card hover effect enhancement
    const pricingCards = document.querySelectorAll('.pricing-card:not(.featured)');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service card interaction
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Optional: Add click behavior for service cards
            console.log('Service card clicked:', this.querySelector('h3').textContent);
        });
    });

})();
