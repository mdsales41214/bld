/**
 * About Page Specific JavaScript
 * File: about-specific.js
 * 
 * Enhanced interactivity for the about page including:
 * - Hero animations and counters
 * - Timeline scroll animations
 * - Team photo interactions
 * - Video handling and fallbacks
 * - Performance optimizations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // HERO SECTION ANIMATIONS
    // ====================================
    
    // Animate stats on scroll into view
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        animateNumber(stat, target);
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const heroStats = document.querySelector('.hero-stats-row');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Enhanced number animation function
    function animateNumber(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                if (target === 2023) {
                    element.textContent = Math.floor(current);
                } else if (target === 45) {
                    element.textContent = Math.floor(current);
                } else {
                    element.textContent = Math.floor(current / 1000) + 'K+';
                }
                requestAnimationFrame(updateNumber);
            } else {
                // Final values
                if (target === 2023) {
                    element.textContent = '2023';
                } else if (target === 45) {
                    element.textContent = '45';
                } else {
                    element.textContent = '10K+';
                }
                
                // Add completion animation
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        };
        updateNumber();
    }

    // ====================================
    // VIDEO HANDLING
    // ====================================
    
    const video = document.querySelector('.about-globe-video');
    if (video) {
        // Enhanced video error handling
        video.addEventListener('error', function() {
            console.log('Video failed to load, creating fallback');
            createVideoFallback();
        });

        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            // Add subtle entrance animation
            video.style.opacity = '0';
            video.style.transition = 'opacity 1s ease';
            setTimeout(() => {
                video.style.opacity = '1';
            }, 500);
        });

        // Performance optimization - pause when not visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        console.log('Video autoplay blocked');
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.3
        });

        videoObserver.observe(video);
    }

    function createVideoFallback() {
        const container = document.querySelector('.about-globe-container');
        if (!container) return;

        const fallback = document.createElement('div');
        fallback.className = 'video-fallback';
        fallback.style.cssText = `
            width: 100%; 
            height: 100%; 
            background: linear-gradient(135deg, #3A8DFF, #06B6D4); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-size: 3rem; 
            font-weight: 800;
            font-family: 'Space Grotesk', sans-serif;
            box-shadow: 0 0 40px rgba(58, 141, 255, 0.4);
            animation: dataRotate 10s linear infinite;
        `;
        fallback.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">📊</div>
                <div>DATA</div>
            </div>
        `;
        
        // Replace video with fallback
        if (video) {
            container.replaceChild(fallback, video);
        }
    }

    // ====================================
    // TIMELINE ANIMATIONS
    // ====================================
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation delay
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // ====================================
    // ENHANCED HERO INTERACTIONS
    // ====================================
    
    // Interactive hover effects for stats
    const heroStatElements = document.querySelectorAll('.hero-stat');
    heroStatElements.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.1)';
            this.style.zIndex = '10';
            
            // Add glow effect
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.textShadow = '0 0 30px rgba(175, 255, 60, 0.8)';
            }
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.textShadow = '0 0 20px rgba(175, 255, 60, 0.5)';
            }
        });
    });

    // ====================================
    // PARALLAX AND SCROLL EFFECTS
    // ====================================
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero particles
        const heroParticles = document.querySelector('.hero-particles');
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax for hero visual
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Dynamic background shift
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${rate * 0.2}px) scale(${1 + scrolled * 0.0002})`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ====================================
    // TEAM PHOTO INTERACTIONS
    // ====================================
    
    const teamPhoto = document.querySelector('.team-photo-wrapper');
    if (teamPhoto) {
        // Enhanced hover effect
        teamPhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        teamPhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Click to expand functionality
        teamPhoto.addEventListener('click', function() {
            const overlay = this.querySelector('.photo-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
                setTimeout(() => {
                    overlay.style.transform = '';
                }, 3000);
            }
        });
    }

    // ====================================
    // VALUE CARDS ANIMATIONS
    // ====================================
    
    const valueCards = document.querySelectorAll('.value-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate the emoji
                    const emoji = entry.target.querySelector('.icon-emoji');
                    if (emoji) {
                        emoji.style.animation = 'bounceIn 0.6s ease';
                    }
                }, index * 150);
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });

    // ====================================
    // ENHANCED SCROLL INTERACTIONS
    // ====================================
    
    // Smooth scroll to next section
    window.scrollToNext = function() {
        const nextSection = document.querySelector('.story-section');
        if (nextSection) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Enhanced scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
            
            if (scrollPercent > 0.1) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // ====================================
    // PERFORMANCE OPTIMIZATIONS
    // ====================================
    
    // Reduce animations on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Disable heavy animations on mobile
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.display = 'none';
        }
        
        // Simplify parallax on mobile
        window.removeEventListener('scroll', updateParallax);
    }

    // ====================================
    // DYNAMIC CONTENT LOADING
    // ====================================
    
    // Intersection observer for lazy loading content
    const lazyElements = document.querySelectorAll('[data-fade]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-fade-delay') || 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    lazyElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        lazyObserver.observe(element);
    });

    // ====================================
    // ACCESSIBILITY ENHANCEMENTS
    // ====================================
    
    // Keyboard navigation for interactive elements
    document.addEventListener('keydown', function(e) {
        // Allow space/enter to trigger scroll indicator
        if ((e.key === ' ' || e.key === 'Enter') && e.target === scrollIndicator) {
            e.preventDefault();
            scrollToNext();
        }
    });

    // Respect user motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ====================================
    // ERROR HANDLING AND DEBUGGING
    // ====================================
    
    // Global error handler for better debugging
    window.addEventListener('error', function(e) {
        console.error('About page error:', e.error);
        // Could send to analytics service in production
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('About page load time:', perfData.loadEventEnd - perfData.loadEventStart);
            }, 0);
        });
    }

    // ====================================
    // DYNAMIC CSS ANIMATIONS
    // ====================================
    
    // Add bounce animation for emojis
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes dataRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .video-fallback {
            animation: dataRotate 10s linear infinite;
        }
    `;
    document.head.appendChild(bounceStyle);

    console.log('About page specific JavaScript loaded successfully');
});