// Legal Pages JavaScript (Privacy Policy, Terms of Service)
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count in navbar
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't prevent default for # links that should do nothing
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // Highlight current section in TOC while scrolling
    highlightCurrentSection();
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Add active class to current section in TOC on page load
    const urlHash = window.location.hash;
    if (urlHash) {
        const targetElement = document.querySelector(urlHash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView();
            }, 100);
        }
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

// Highlight current section in table of contents while scrolling
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.policy-content section');
    const scrollPosition = window.scrollY + 150; // Adjust offset as needed
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    // Update active state in TOC
    document.querySelectorAll('.toc a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Handle back/forward browser buttons
window.addEventListener('popstate', function(event) {
    const urlHash = window.location.hash;
    if (urlHash) {
        const targetElement = document.querySelector(urlHash);
        if (targetElement) {
            targetElement.scrollIntoView();
        }
    }
});
