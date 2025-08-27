class BeamController {
    constructor() {
        this.container = document.querySelector('.beam-container');
        this.particlesContainer = document.querySelector('.flow-particles');
        this.currentDirection = 'forward';
        this.directionChangeInterval = null;
        this.particles = [];
        this.maxParticles = 12;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.startDirectionRandomizer();
        this.startParticleAnimation();
        
        // Add subtle mouse interaction
        this.addMouseInteraction();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random vertical position around the beam
            const yPosition = 48 + (Math.random() - 0.5) * 20;
            particle.style.top = `${yPosition}%`;
            
            // Random delay for staggered effect
            const delay = Math.random() * 18;
            particle.style.animationDelay = `-${delay}s`;
            
            // Slight size variation
            const size = 2 + Math.random() * 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random opacity variation
            const opacity = 0.6 + Math.random() * 0.4;
            particle.style.opacity = opacity;
            
            this.particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    startDirectionRandomizer() {
        this.directionChangeInterval = setInterval(() => {
            this.randomDirectionChange();
        }, 8000 + Math.random() * 12000); // Random interval between 8-20 seconds
    }
    
    randomDirectionChange() {
        if (Math.random() < 0.4) { // 40% chance to change direction
            this.toggleDirection();
        }
    }
    
    toggleDirection() {
        if (this.currentDirection === 'forward') {
            this.container.classList.add('reverse');
            this.currentDirection = 'reverse';
        } else {
            this.container.classList.remove('reverse');
            this.currentDirection = 'forward';
        }
        
        // Add smooth transition effect
        this.container.style.transition = 'all 2s ease-in-out';
        setTimeout(() => {
            this.container.style.transition = '';
        }, 2000);
    }
    
    startParticleAnimation() {
        // Continuously spawn new particles with subtle variations
        setInterval(() => {
            this.updateParticles();
        }, 1500);
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            if (Math.random() < 0.3) {
                // Randomly adjust particle properties for dynamic effect
                const newDelay = Math.random() * 18;
                particle.style.animationDelay = `-${newDelay}s`;
                
                const yPosition = 48 + (Math.random() - 0.5) * 20;
                particle.style.top = `${yPosition}%`;
            }
        });
    }
    
    addMouseInteraction() {
        let mouseY = window.innerHeight / 2;
        
        document.addEventListener('mousemove', (e) => {
            mouseY = e.clientY;
            this.updateBeamPosition(mouseY);
        });
    }
    
    updateBeamPosition(mouseY) {
        const dataStream = document.querySelector('.data-stream');
        const windowHeight = window.innerHeight;
        const percentage = (mouseY / windowHeight) * 100;
        
        // Subtle beam position adjustment based on mouse
        const offset = (percentage - 50) * 0.1; // Very subtle movement
        dataStream.style.transform = `translateY(calc(-50% + ${offset}px))`;
    }
    
    // Method to manually trigger direction change
    forceDirectionChange() {
        this.toggleDirection();
    }
    
    // Method to adjust animation speed
    adjustSpeed(multiplier = 1) {
        const elements = [
            '.beam-core',
            '.beam-glow', 
            '.beam-outer-glow',
            '.particle'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                const currentDuration = parseFloat(getComputedStyle(element).animationDuration);
                element.style.animationDuration = `${currentDuration * multiplier}s`;
            }
        });
    }
    
    destroy() {
        if (this.directionChangeInterval) {
            clearInterval(this.directionChangeInterval);
        }
        
        this.particles.forEach(particle => {
            particle.remove();
        });
        
        document.removeEventListener('mousemove', this.updateBeamPosition);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const beamController = new BeamController();
    
    // Optional: Expose controller globally for debugging
    window.beamController = beamController;
    
    // Optional: Add keyboard controls for testing
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') { // Spacebar to manually change direction
            e.preventDefault();
            beamController.forceDirectionChange();
        }
    });
});

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.beamController) {
        window.beamController.destroy();
    }
});