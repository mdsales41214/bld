/**
 * Central Header & Footer JavaScript
 * File: central-scripts.js
 * 
 * Handles:
 * - Mobile menu toggle
 * - Header scroll effects
 * - Active nav link highlighting
 * - Include loading for header/footer
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // LOAD HEADER AND FOOTER INCLUDES
    // ====================================
    
    function loadIncludes() {
        // Load header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            fetch('includes/header.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Header not found');
                    }
                    return response.text();
                })
                .then(data => {
                    headerPlaceholder.innerHTML = data;
                    initializeHeaderFunctionality();
                })
                .catch(error => {
                    console.error('Error loading header:', error);
                    headerPlaceholder.innerHTML = '<p>Header failed to load</p>';
                });
        }
        
        // Load footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            fetch('includes/footer.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Footer not found');
                    }
                    return response.text();
                })
                .then(data => {
                    footerPlaceholder.innerHTML = data;
                })
                .catch(error => {
                    console.error('Error loading footer:', error);
                    footerPlaceholder.innerHTML = '<p>Footer failed to load</p>';
                });
        }
    }
    
    // ====================================
    // HEADER FUNCTIONALITY
    // ====================================
    
    function initializeHeaderFunctionality() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }
        
        // Header scroll effect
        const header = document.getElementById('main-header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
        
        // Set active nav link
        setActiveNavLink();
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu && mobileToggle) {
                if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu && mobileToggle) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // ====================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ====================================
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            
            // Handle different cases
            if (currentPage === linkPath || 
                (currentPage === '/' && linkPath === '/') ||
                (currentPage === '/index.html' && linkPath === '/') ||
                (currentPage.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active');
            }
        });
    }
    
    // ====================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ====================================
    
    function initializeSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    const mobileToggle = document.getElementById('mobile-toggle');
                    if (mobileMenu && mobileToggle) {
                        mobileMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // ====================================
    // PERFORMANCE OPTIMIZATION
    // ====================================
    
    // Throttle scroll events for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        // Scroll-based functionality is handled in initializeHeaderFunctionality
    }, 16)); // ~60fps
    
    // ====================================
    // ACCESSIBILITY ENHANCEMENTS
    // ====================================
    
    function initializeAccessibility() {
        // Keyboard navigation for mobile menu
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Focus management for mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            mobileMenu.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
                
                if (e.key === 'Escape') {
                    const mobileToggle = document.getElementById('mobile-toggle');
                    mobileMenu.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.classList.remove('active');
                        mobileToggle.focus();
                    }
                }
            });
        }
    }
    
    // ====================================
    // INITIALIZE EVERYTHING
    // ====================================
    
    // Load includes first
    loadIncludes();
    
    // Initialize other functionality after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeSmoothScrolling();
        initializeAccessibility();
    }, 100);
});

// ====================================
// GLOBAL UTILITY FUNCTIONS
// ====================================

// Function to manually set active nav link (useful for dynamic pages)
window.setActiveNav = function(linkHref) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === linkHref) {
            link.classList.add('active');
        }
    });
};

// Function to show/hide loading states
window.showLoading = function(element) {
    if (element) {
        element.innerHTML = '<div class="loading"></div>';
    }
};

// Function to handle CTA button clicks with analytics
window.handleCTAClick = function(buttonText, page) {
    // Add your analytics tracking here
    console.log(`CTA clicked: ${buttonText} on ${page}`);
    
    // You can add Google Analytics, Facebook Pixel, etc. here
    // gtag('event', 'click', {
    //     'event_category': 'CTA',
    //     'event_label': buttonText,
    //     'value': page
    // });
};

            });