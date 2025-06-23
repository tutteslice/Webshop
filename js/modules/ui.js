// UI Interactions
export function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Mobile menu toggle
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            setupMobileMenu();
        } else {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) navLinks.style.display = 'flex';
        }
    });
}

function setupMobileMenu() {
    const navContainer = document.querySelector('.navbar-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navContainer || !navLinks || document.querySelector('.mobile-menu-toggle')) return;

    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    navContainer.insertBefore(mobileMenuToggle, navLinks);
    navLinks.style.display = 'none';
}

export function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
