/**
 * BuyLeadData Central JavaScript
 * File: /js/buyleaddata-main.js
 * 
 * Contains all shared functionality across pages:
 * - Modern glassmorphic navigation
 * - Scroll effects and animations
 * - Mobile menu functionality
 * - Performance optimizations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // NAVIGATION FUNCTIONALITY
    // ====================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    // Mobile Menu Toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ====================================
    // SCROLL EFFECTS
    // ====================================
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for styling
        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update scroll progress indicator
        if (scrollIndicator) {
            const scrollPercent = (currentScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = Math.min(scrollPercent, 100) + '%';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    // Throttled scroll listener for performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // ====================================
    // SMOOTH SCROLLING
    // ====================================
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ====================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ====================================
    
    // Generic fade-in animation observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply fade animation to elements with data-fade attribute
    document.querySelectorAll('[data-fade]').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        // Add delay if specified
        const delay = element.getAttribute('data-fade-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
        
        fadeObserver.observe(element);
    });
    
    // ====================================
    // BUTTON ENHANCEMENTS
    // ====================================
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Apply ripple effect to primary buttons
    document.querySelectorAll('.btn-primary, .btn-primary-large').forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });
    
    // ====================================
    // KEYBOARD NAVIGATION
    // ====================================
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Navigate with arrow keys when mobile menu is open
        if (navMenu && navMenu.classList.contains('active')) {
            const navLinks = navMenu.querySelectorAll('.nav-link');
            const currentFocus = document.activeElement;
            const currentIndex = Array.from(navLinks).indexOf(currentFocus);
            
            if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
                e.preventDefault();
                navLinks[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                navLinks[currentIndex - 1].focus();
            }
        }
    });
    
    // ====================================
    // PERFORMANCE OPTIMIZATIONS
    // ====================================
    
    // Lazy load images when they come into view
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    function preloadResource(href, as = 'style') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    }
    
    // ====================================
    // UTILITY FUNCTIONS
    // ====================================
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Animate number counters
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateNumber();
    }
    
    // Apply number animation to elements with data-count attribute
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                if (target) {
                    entry.target.classList.add('animated');
                    setTimeout(() => {
                        animateNumber(entry.target, target);
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('[data-count]').forEach(element => {
        numberObserver.observe(element);
    });
    
    // ====================================
    // PAGE LOAD OPTIMIZATIONS
    // ====================================
    
    // Initialize page with fade-in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        // Remove loading states
        document.querySelectorAll('.loading').forEach(element => {
            element.classList.remove('loading');
        });
    });
    
    // ====================================
    // ERROR HANDLING
    // ====================================
    
    // Global error handler for better UX
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send this to an error tracking service
    });
    
    // Handle failed image loads
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Failed to load image:', e.target.src);
        }
    }, true);
    
});

// ====================================
// CSS INJECTION FOR RIPPLE EFFECT
// ====================================

// Add ripple effect styles dynamically
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// ====================================
// EXPORT FOR MODULE USAGE (OPTIONAL)
// ====================================

// If using as a module, export useful functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateNumber,
        debounce,
        createRipple
    };
}