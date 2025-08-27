```javascript
/* =====================================================
   BuyLeadData.com - Header JavaScript
   File: /js/header.js
   ===================================================== */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('main-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const progressBar = document.getElementById('reading-progress');
    const body = document.body;

    // Add header class to body for proper spacing
    body.classList.add('has-header');

    // Mobile Menu Toggle
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isOpen);
            
            // Toggle active classes
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Focus management
            if (!isOpen) {
                const firstLink = mobileMenu.querySelector('.mobile-nav-link');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
    }

    // Close mobile menu when overlay is clicked
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
            mobileMenuToggle.focus();
        }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close if it's an anchor link
            if (!this.getAttribute('href').startsWith('#')) {
                closeMobileMenu();
            }
        });
    });

    // Function to close mobile menu
    function closeMobileMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Header scroll effect
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Update reading progress
        updateReadingProgress();
    }

    // Reading progress bar
    function updateReadingProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.setProperty('--scroll-progress', scrolled + '%');
        }
    }

    // Throttled scroll handler for better performance
    let ticking = false;
    function throttledScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Handle window resize
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        closeMobileMenu();
                    }
                    
                    // Calculate offset for fixed header
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.replaceState(null, null, '#' + targetId);
                    
                    // Focus the target element for accessibility
                    setTimeout(() => {
                        targetElement.focus({ preventScroll: true });
                    }, 500);
                }
            });
        });
    }

    // Enhanced keyboard navigation
    function initKeyboardNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        this.click();
                    }
                }
            });
        });
    }

    // Preload critical resources
    function preloadResources() {
        const logo = document.querySelector('.logo-img');
        if (logo && !logo.complete) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = logo.src;
            document.head.appendChild(preloadLink);
        }
    }

    // Performance optimizations
    function optimizeAnimations() {
        // Pause animations when not visible
        const particles = document.querySelectorAll('.particle');
        
        // Intersection Observer for particles
        if ('IntersectionObserver' in window) {
            const particleObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    } else {
                        entry.target.style.animationPlayState = 'paused';
                    }
                });
            });
            
            particles.forEach(particle => {
                particleObserver.observe(particle);
            });
        }
    }

    // Initialize on DOM content loaded
    function init() {
        initSmoothScrolling();
        initKeyboardNavigation();
        preloadResources();
        optimizeAnimations();
        
        // Set initial scroll state
        handleScroll();
        
        // Announce to screen readers when mobile menu opens/closes
        if (mobileMenu) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.style.position = 'absolute';
            announcement.style.left = '-10000px';
            announcement.style.width = '1px';
            announcement.style.height = '1px';
            announcement.style.overflow = 'hidden';
            document.body.appendChild(announcement);
            
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        const isOpen = mobileMenu.classList.contains('active');
                        announcement.textContent = isOpen ? 'Menu opened' : 'Menu closed';
                    }
                });
            });
            
            observer.observe(mobileMenu, { attributes: true });
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle page visibility for performance
    document.addEventListener('visibilitychange', function() {
        const particles = document.querySelectorAll('.particle');
        const playState = document.hidden ? 'paused' : 'running';
        
        particles.forEach(particle => {
            particle.style.animationPlayState = playState;
        });
    });

    // Export functions for potential external use
    window.BuyLeadDataHeader = {
        closeMobileMenu: closeMobileMenu,
        updateReadingProgress: updateReadingProgress
    };

})();
```