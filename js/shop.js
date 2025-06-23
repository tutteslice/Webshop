// Shop Page Functionality

// Product Data
const products = [
    {
        id: 1,
        name: 'Stealth Pocket Boxers',
        price: 14.00,
        category: 'designs',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Stealth+Boxers',
        description: 'Comfortable boxer briefs with a hidden pocket for your essentials.',
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['new', 'bestseller']
    },
    {
        id: 2,
        name: 'Vintage Rave Pants',
        price: 45.00,
        category: 'second-hand',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Vintage+Pants',
        description: 'Authentic 90s rave pants with vibrant patterns.',
        sizes: ['M', 'L'],
        tags: []
    },
    {
        id: 3,
        name: 'Neon Dreams Art Print',
        price: 24.99,
        category: 'prints',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Neon+Dreams',
        description: 'Vibrant art print for your space.',
        sizes: [],
        tags: ['new']
    },
    {
        id: 4,
        name: 'Hidden Pocket Panties',
        price: 14.00,
        category: 'designs',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Stealth+Panties',
        description: 'Comfortable panties with a hidden pocket.',
        sizes: ['XS', 'S', 'M', 'L'],
        tags: ['bestseller']
    },
    {
        id: 5,
        name: 'Festival Poster Collection',
        price: 39.99,
        category: 'prints',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Festival+Posters',
        description: 'Set of 3 high-quality festival posters.',
        sizes: [],
        tags: []
    },
    {
        id: 6,
        name: '90s Rave Jacket',
        price: 65.00,
        category: 'second-hand',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=90s+Jacket',
        description: 'Vintage 90s rave jacket with multiple pockets.',
        sizes: ['S', 'M', 'L'],
        tags: []
    }
];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const categoryLinks = document.querySelectorAll('.category-list a');
const sortSelect = document.getElementById('sort-by');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageNumbers = document.getElementById('page-numbers');
const showingCount = document.getElementById('showing-count');
const totalCount = document.getElementById('total-count');

// Pagination
let currentPage = 1;
const productsPerPage = 6;

// Initialize the shop
function initShop() {
    // Set up event listeners
    setupEventListeners();
    
    // Initial render
    renderProducts();
    
    // Update cart count
    updateCartCount();
}

// Set up event listeners
function setupEventListeners() {
    // Category filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentPage = 1;
            renderProducts();
        });
    });
    
    // Sort
    sortSelect.addEventListener('change', () => {
        currentPage = 1;
        renderProducts();
    });
    
    // Pagination
    prevBtn.addEventListener('click', goToPrevPage);
    nextBtn.addEventListener('click', goToNextPage);
    
    // Add to cart buttons (delegated event)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-add-to-cart')) {
            const productId = parseInt(e.target.closest('.btn-add-to-cart').dataset.productId);
            addToCart(productId);
        }
    });
}

// Get active category
function getActiveCategory() {
    const activeLink = document.querySelector('.category-list a.active');
    return activeLink ? activeLink.dataset.category : 'all';
}

// Get filtered products
function getFilteredProducts() {
    const activeCategory = getActiveCategory();
    
    return products.filter(product => {
        // Filter by category
        if (activeCategory !== 'all' && product.category !== activeCategory) {
            return false;
        }
        
        return true;
    });
}

// Sort products
function sortProducts(productsToSort) {
    const sortBy = sortSelect.value;
    
    return [...productsToSort].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'newest':
                return (b.tags.includes('new') - a.tags.includes('new')) || (b.id - a.id);
            case 'featured':
            default:
                return (b.tags.includes('bestseller') - a.tags.includes('bestseller')) || 
                       (b.tags.includes('new') - a.tags.includes('new'));
        }
    });
}

// Render products
function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const sortedProducts = sortProducts(filteredProducts);
    
    // Update counts
    totalCount.textContent = filteredProducts.length;
    
    // Calculate pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
    
    // Update showing count
    showingCount.textContent = paginatedProducts.length;
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Render products
    if (paginatedProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-results">
                <p>No products found. Try adjusting your filters.</p>
            </div>
        `;
    } else {
        paginatedProducts.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }
    
    // Update pagination
    updatePagination(sortedProducts.length);
}

// Create product element
function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    
    // Create badges
    const badges = [];
    if (product.tags.includes('new')) badges.push('<span class="badge new">New</span>');
    if (product.tags.includes('bestseller')) badges.push('<span class="badge bestseller">Bestseller</span>');
    
    // Create sizes string
    const sizes = product.sizes.length > 0 
        ? `<div class="sizes">Sizes: ${product.sizes.join(', ')}</div>` 
        : '';
    
    productElement.innerHTML = `
        <div class="product-image">
            ${badges.join('')}
            <img src="${product.image}" alt="${product.name}">
            <div class="product-actions">
                <button class="btn btn-primary btn-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
        <div class="product-info">
            <span class="category">${formatCategory(product.category)}</span>
            <h3>${product.name}</h3>
            <p class="price">€${product.price.toFixed(2)}</p>
            ${sizes}
        </div>
    `;
    
    return productElement;
}

// Format category for display
function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Update pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / productsPerPage);
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
    
    // Update page numbers
    pageNumbers.innerHTML = '';
    
    if (totalPages <= 1) {
        pageNumbers.style.display = 'none';
        return;
    }
    
    pageNumbers.style.display = 'flex';
    
    // Always show first page
    addPageNumber(1);
    
    // Add ellipsis if needed
    if (currentPage > 3) {
        addEllipsis();
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        addPageNumber(i);
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
        addEllipsis();
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
        addPageNumber(totalPages);
    }
}

// Add page number button
function addPageNumber(pageNum) {
    const pageBtn = document.createElement('span');
    pageBtn.className = `page-number ${pageNum === currentPage ? 'active' : ''}`;
    pageBtn.textContent = pageNum;
    
    pageBtn.addEventListener('click', () => {
        currentPage = pageNum;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    pageNumbers.appendChild(pageBtn);
}

// Add ellipsis
function addEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'ellipsis';
    ellipsis.textContent = '...';
    pageNumbers.appendChild(ellipsis);
}

// Go to previous page
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Go to next page
function goToNextPage() {
    const filteredProducts = getFilteredProducts();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
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
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShop);
} else {
    initShop();
}
