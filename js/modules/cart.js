// Cart functionality
let cart = [];

export function initCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    updateCartCount();
}

export function addToCart(productId, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    
    saveCart();
    updateCartCount();
    return cart;
}

export function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    return cart;
}

export function getCart() {
    return [...cart];
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems || '';
        cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}
