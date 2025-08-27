=== js/buy-verified-business-email-list.js ===
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.lead-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!validateForm(data)) {
                return;
            }
            
            // Track form submission
            trackFormSubmit();
            
            // Show success message (replace with actual submission logic)
            showSuccessMessage();
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('active');
        });
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e)