// Cart Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cart
    initCart();
    
    // Set up event listeners
    setupCartEventListeners();
    
    // Update cart count in navbar
    updateCartCount();
});

// Initialize the cart
function initCart() {
    const cart = getCart();
    if (cart.length > 0) {
        renderCartItems(cart);
        updateOrderSummary(cart);
    } else {
        showEmptyCartMessage();
    }
}

// Set up event listeners
function setupCartEventListeners() {
    // Delegate events for dynamic elements
    document.querySelector('.cart-items').addEventListener('click', function(e) {
        const item = e.target.closest('.cart-item');
        if (!item) return;
        
        const itemId = parseInt(item.dataset.id);
        
        // Handle quantity decrease
        if (e.target.closest('.decrease-quantity')) {
            updateCartItemQuantity(itemId, -1);
        }
        // Handle quantity increase
        else if (e.target.closest('.increase-quantity')) {
            updateCartItemQuantity(itemId, 1);
        }
        // Handle quantity input change
        else if (e.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(e.target.value) || 1;
            setCartItemQuantity(itemId, newQuantity);
        }
        // Handle remove item
        else if (e.target.closest('.remove-item')) {
            removeItemFromCart(itemId);
        }
    });
    
    // Handle checkout button click
    document.querySelector('.btn-checkout').addEventListener('click', function() {
        // In a real implementation, this would redirect to the checkout page
        alert('Proceeding to checkout would happen here. This is a demo.');
    });
}

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Render cart items
function renderCartItems(cart) {
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        showEmptyCartMessage();
        return;
    }
    
    // Hide empty cart message if it's visible
    const emptyMessage = document.querySelector('.empty-cart-message');
    if (emptyMessage) {
        emptyMessage.style.display = 'none';
    }
    
    // Clear existing items
    const existingItems = document.querySelectorAll('.cart-item:not(.empty-cart-message)');
    existingItems.forEach(item => item.remove());
    
    // Add each cart item
    cart.forEach(item => {
        const itemElement = createCartItemElement(item);
        cartItemsContainer.insertBefore(itemElement, emptyMessage);
    });
    
    // Update order summary
    updateOrderSummary(cart);
}

// Create cart item element
function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.dataset.id = item.id;
    
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <div>
                <div class="cart-item-header">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn decrease-quantity" aria-label="Decrease quantity">−</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" aria-label="Quantity">
                    <button class="quantity-btn increase-quantity" aria-label="Increase quantity">+</button>
                </div>
                <button class="remove-item">
                    <i class="fas fa-trash"></i>
                    Remove
                </button>
            </div>
        </div>
    `;
    
    return itemElement;
}

// Show empty cart message
function showEmptyCartMessage() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyMessage = cartItemsContainer.querySelector('.empty-cart-message');
    
    if (emptyMessage) {
        emptyMessage.style.display = 'block';
    } else {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
        `;
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyMessage);
    }
    
    // Disable checkout button
    document.querySelector('.btn-checkout').disabled = true;
    
    // Update order summary with zeros
    updateOrderSummary([]);
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, change) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const newQuantity = cart[itemIndex].quantity + change;
    
    if (newQuantity < 1) {
        removeItemFromCart(itemId);
        return;
    }
    
    cart[itemIndex].quantity = newQuantity;
    saveCart(cart);
    
    // Update the displayed quantity
    const quantityInput = document.querySelector(`.cart-item[data-id="${itemId}"] .quantity-input`);
    if (quantityInput) {
        quantityInput.value = newQuantity;
    }
    
    // Update cart count in navbar
    updateCartCount();
    
    // Update order summary
    updateOrderSummary(cart);
}

// Set specific quantity for an item
function setCartItemQuantity(itemId, quantity) {
    if (quantity < 1) {
        removeItemFromCart(itemId);
        return;
    }
    
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
    
    // Update cart count in navbar
    updateCartCount();
    
    // Update order summary
    updateOrderSummary(cart);
}

// Remove item from cart
function removeItemFromCart(itemId) {
    let cart = getCart();
    const initialLength = cart.length;
    
    cart = cart.filter(item => item.id !== itemId);
    
    if (cart.length !== initialLength) {
        saveCart(cart);
        
        // Remove the item element from the DOM
        const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        if (itemElement) {
            itemElement.remove();
        }
        
        // Show empty message if cart is now empty
        if (cart.length === 0) {
            showEmptyCartMessage();
        } else {
            // Update order summary
            updateOrderSummary(cart);
        }
        
        // Show notification
        showNotification('Item removed from cart');
        
        // Update cart count in navbar
        updateCartCount();
    }
}

// Update order summary
function updateOrderSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // In a real implementation, you would calculate shipping based on location
    const shipping = 0; // This would be calculated
    const total = subtotal + shipping;
    
    // Update the DOM
    document.querySelector('.subtotal-amount').textContent = `€${subtotal.toFixed(2)}`;
    document.querySelector('.total-amount').textContent = `€${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    document.querySelector('.btn-checkout').disabled = cart.length === 0;
}

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in the current page
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
    
    // Also update the cart count in the navbar of other pages
    // This is a simplified approach - in a real app, you might use a shared state management solution
    const cartCounts = document.querySelectorAll('.cart-count');
    if (cartCounts.length > 1) {
        cartCounts.forEach(el => {
            if (count > 0) {
                el.textContent = count;
            } else {
                el.remove();
            }
        });
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
    }, 3000);
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
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            pointer-events: none;
        }
        
        .notification.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
}
