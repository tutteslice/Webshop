// Import modules
import { initCart, addToCart, updateCartCount } from './modules/cart.js';
import { initNavbar, showNotification } from './modules/ui.js';
import { getProducts, renderProductCard, getProductById } from './modules/products.js';
import { debounce, formatPrice, getUrlParameter, isInViewport } from './modules/utils.js';
import { CONFIG, getCurrentBreakpoint, isMobile } from './config.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI components
    initNavbar();
    initCart();
    
    // Initialize shop page
    if (document.querySelector('.shop-container')) {
        initializeShopPage();
    }
    
    // Initialize home page
    if (document.querySelector('.hero')) {
        initializeHomePage();
    }
    
    // Initialize newsletter form if it exists
    initializeNewsletterForm();
    
    // Set up global event listeners
    setupEventListeners();
});

/**
 * Initialize the shop page
 */
function initializeShopPage() {
    const products = getProducts();
    const productsContainer = document.querySelector('.products-grid');
    
    if (productsContainer) {
        productsContainer.innerHTML = products.map(renderProductCard).join('');
    }
}

/**
 * Initialize the home page
 */
function initializeHomePage() {
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-in-out';
            heroContent.style.opacity = '1';
        }, 500);
    }
    
    // Initialize featured products
    const featuredProducts = getProducts().slice(0, 4); // Show first 4 products as featured
    const featuredContainer = document.querySelector('.featured-products');
    
    if (featuredContainer) {
        featuredContainer.innerHTML = featuredProducts.map(renderProductCard).join('');
    }
}

/**
 * Initialize newsletter form
 */
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // In a real app, you would send this to your server
        console.log('Newsletter signup:', email);
        showNotification('Thanks for subscribing!', 'success');
        this.reset();
    });
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
    // Handle add to cart clicks
    document.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            const productId = parseInt(addToCartBtn.dataset.productId);
            const product = getProductById(productId);
            
            if (product) {
                addToCart(productId);
                showNotification(`${product.name} added to cart!`, 'success');
            }
        }
    });
}
