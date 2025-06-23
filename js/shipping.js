// Shipping & Returns Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tracking steps animation
    initTrackingAnimation();
    
    // Update cart count
    updateCartCount();
    
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
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});

// Initialize tracking steps animation
function initTrackingAnimation() {
    const trackingSteps = document.querySelectorAll('.tracking-step');
    if (!trackingSteps.length) return;
    
    // Animate steps with a delay
    trackingSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
        }, index * 300);
    });
    
    // Simulate progress (for demo purposes)
    let currentStep = 0;
    const totalSteps = trackingSteps.length;
    
    function updateProgress() {
        if (currentStep < totalSteps) {
            trackingSteps[currentStep].classList.add('active');
            currentStep++;
            
            if (currentStep < totalSteps) {
                setTimeout(updateProgress, 1000);
            }
        }
    }
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateProgress();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const trackingSection = document.querySelector('.tracking-steps');
    if (trackingSection) {
        observer.observe(trackingSection);
    }
}

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

// Add animation to shipping methods on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.shipping-method, .highlight-box, .faq-item, .info-box, .partner');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.shipping-method, .highlight-box, .faq-item, .info-box, .partner');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
});

// Add hover effect to shipping partners
function initPartnerHover() {
    const partners = document.querySelectorAll('.partner');
    
    partners.forEach(partner => {
        partner.addEventListener('mouseenter', () => {
            const img = partner.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(0) brightness(1)';
            }
        });
        
        partner.addEventListener('mouseleave', () => {
            const img = partner.querySelector('img');
            if (img) {
                img.style.filter = 'grayscale(100%) brightness(0.8)';
            }
        });
    });
}

// Initialize partner hover effects
document.addEventListener('DOMContentLoaded', initPartnerHover);
