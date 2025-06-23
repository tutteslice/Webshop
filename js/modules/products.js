// Product data and functionality

// Sample product data (will be replaced with actual data from backend)
const products = [
    {
        id: 1,
        name: 'Stealth Pocket Boxers',
        price: 14.00,
        category: 'designs',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Stealth+Boxers',
        description: 'Comfortable boxer briefs with a hidden pocket to keep your essentials secure during festivals and raves.'
    },
    {
        id: 2,
        name: 'Zippered Pocket Boxers',
        price: 19.99,
        category: 'designs',
        image: 'images/boxers.png',
        description: 'Premium boxer shorts featuring a discreet zippered pocket. Perfect for keeping your valuables safe while on the move. Made from soft, breathable fabric for all-day comfort.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Gray']
    }
];

export function getProducts(category = null) {
    if (!category) return [...products];
    return products.filter(product => product.category === category);
}

export function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

export function renderProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
            </div>
        </div>
    `;
}
