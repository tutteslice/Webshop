// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initMap();
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Back to top button
    initBackToTopButton();
    
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
});

// Initialize map with Leaflet
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Default coordinates (Amsterdam)
    const defaultCoords = [52.3676, 4.9041];
    const zoomLevel = 14;
    
    // Initialize map
    const map = L.map('map').setView(defaultCoords, zoomLevel);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);
    
    // Add a marker
    const marker = L.marker(defaultCoords).addTo(map);
    marker.bindPopup("<b>Dopamine Threads</b><br>123 Rave Street, Amsterdam").openPopup();
    
    // Add a circle around the marker
    L.circle(defaultCoords, {
        color: '#E50914',
        fillColor: '#E50914',
        fillOpacity: 0.1,
        radius: 500 // 500m radius
    }).addTo(map);
}

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // In a real implementation, you would send the form data to your server
    // This is a simulation of form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Your message has been sent successfully! We\'ll get back to you soon.');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }, 1500);
}

// Initialize FAQ accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Set initial ARIA attributes
        const answer = question.nextElementSibling;
        const answerId = `faq-${Math.random().toString(36).substr(2, 9)}`;
        
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('id', answerId);
        
        // Add click event
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Toggle the expanded state
            question.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the answer visibility
            if (isExpanded) {
                answer.style.maxHeight = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Initialize back to top button
function initBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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
    }, 5000);
}

// Add notification styles if they don't exist
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: #E50914;
            color: white;
            padding: 15px 30px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            pointer-events: none;
            max-width: 90%;
            text-align: center;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
            pointer-events: auto;
        }
        
        @media (max-width: 768px) {
            .notification {
                width: 90%;
                padding: 12px 20px;
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
}
