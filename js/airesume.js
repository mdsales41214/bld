// Specific JavaScript for the AI Resume Builder landing page
document.addEventListener('DOMContentLoaded', function() {

    // 1. Smooth scrolling for internal links
    const handleSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                // Ensure it's an ID and not just '#'
                if (targetId === '#') {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Adjust scroll position considering fixed header height
                    const header = document.querySelector('header');
                    const headerOffset = header ? header.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20 for a little extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    };
    handleSmoothScroll();

    // 2. Example of simple form submission for newsletter (if added to footer/elsewhere)
    const newsletterForm = document.querySelector('form.newsletter-form'); // Use a more specific selector
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // In a real scenario, use fetch API to send data to server
                console.log('Newsletter subscription attempted for:', emailInput.value);
                alert('Thank you for subscribing, ' + emailInput.value + '!');
                emailInput.value = ''; // Clear input
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // 3. Template Filtering Logic
    const templateFilterButtons = document.querySelectorAll('.template-filters .btn');
    const templateItems = document.querySelectorAll('.template-grid-dynamic .template-item');

    if (templateFilterButtons.length > 0 && templateItems.length > 0) {
        templateFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                templateFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                templateItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filter === 'all' || itemCategory === filter) {
                        item.style.display = 'block'; // Show item
                    } else {
                        item.style.display = 'none'; // Hide item
                    }
                });
            });
        });
    }

    // 4. AI Brain Particles (more dynamic positioning if needed beyond CSS)
    // For now, simple CSS particles are used. If complex JS animation needed,
    // this section would generate and animate particles on canvas or with JS transform.

    // Example of a dynamic header height adjustment (useful for fixed headers)
    const adjustBodyPaddingForFixedHeader = () => {
        const header = document.querySelector('header#header-placeholder');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = `${headerHeight}px`;
        }
    };

    // Initial adjustment
    adjustBodyPaddingForFixedHeader();
    // Re-adjust on window resize, or if header content changes
    window.addEventListener('resize', adjustBodyPaddingForFixedHeader);
    // Observe header for height changes (e.g., if content loads dynamically)
    const headerObserver = new MutationObserver(adjustBodyPaddingForFixedHeader);
    const headerElement = document.querySelector('header#header-placeholder');
    if (headerElement) {
        headerObserver.observe(headerElement, { childList: true, subtree: true, attributes: true });
    }
});

js/animation-controller.js

This file manages scroll-triggered animations and other general dynamic visual effects using IntersectionObserver.

// Global JavaScript for managing complex animations and scroll effects

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll-triggered animations using IntersectionObserver
    const animateOnScroll = (selector, className) => {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target); // Unobserve once animated
                }
            });
        }, {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of element is in view
        });

        elements.forEach(el => observer.observe(el));
    };

    // Apply fade-in-slide-up effect to various sections/elements
    animateOnScroll('.features-showcase .feature-card-enhanced', 'in-view');
    animateOnScroll('.timeline-item', 'in-view');
    animateOnScroll('.testimonials-section .testimonial-card', 'in-view');
    animateOnScroll('.template-card', 'in-view'); // Though templates also have hover, this adds initial animation

    // 2. Hero Particles (more complex JS version for dynamic effects)
    // This section would be used if the CSS particles were not sufficient.
    // For instance, generating many particles with randomized properties.
    const heroParticlesContainer = document.querySelector('.ai-brain-particles');
    if (heroParticlesContainer) {
        const numParticles = 30; // More particles than static CSS
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.width = `${Math.random() * 8 + 4}px`; // 4-12px
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`; // Random delay
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random duration 5-15s
            particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; // 0.1-0.4 opacity
            heroParticlesContainer.appendChild(particle);
        }
    }

    // 3. AI Flow Diagram Animation (Conceptual, could be more complex with SVG/Lottie)
    // Simple version: Add a class to animate when section is in view.
    const aiFlowDiagram = document.querySelector('.ai-flow-diagram');
    if (aiFlowDiagram) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aiFlowDiagram.classList.add('animate-flow'); // Class for CSS animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% in view
        observer.observe(aiFlowDiagram);
    }
    // You would then add `animate-flow` keyframes in `animations.css`
    // For example: animating border-color or background of flow steps sequentially.

    // 4. Button Glow on Hover (if not fully covered by CSS)
    // This is already mostly CSS in `airesume.css` for `glow-on-hover`.
    // If JS interaction was needed (e.g., for canvas-based glow), it would go here.

});
