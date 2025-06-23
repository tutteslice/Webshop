// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Update cart count on page load
    updateCartCount();
    
    // Initialize animations
    initAnimations();
    
    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, you would send this to your server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            showNotification('Thanks for subscribing to our newsletter!');
            
            // Reset form
            this.reset();
        });
    }
});

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (count > 0) {
        if (!cartCount) {
            const newCount = document.createElement('span');
            newCount.className = 'cart-count';
            document.querySelector('.cart-icon').appendChild(newCount);
            newCount.textContent = count;
        } else {
            cartCount.textContent = count;
        }
    } else if (cartCount) {
        cartCount.remove();
    }
}

// Initialize animations using Intersection Observer
function initAnimations() {
    const animateElements = document.querySelectorAll('.about-section, .value-card, .team-member');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Show notification
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create and show new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    // Add show class
    notification.classList.add('show');
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles if they don't exist
if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        /* Animation keyframes */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Initial state for animated elements */
        .about-section,
        .value-card,
        .team-member {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        /* Animated state */
        .about-section.animate,
        .value-card.animate,
        .team-member.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animations for grid items */
        .values-grid .value-card:nth-child(1) { transition-delay: 0.1s; }
        .values-grid .value-card:nth-child(2) { transition-delay: 0.2s; }
        .values-grid .value-card:nth-child(3) { transition-delay: 0.3s; }
        .values-grid .value-card:nth-child(4) { transition-delay: 0.4s; }
        
        .team-grid .team-member:nth-child(1) { transition-delay: 0.1s; }
        .team-grid .team-member:nth-child(2) { transition-delay: 0.2s; }
        .team-grid .team-member:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}
