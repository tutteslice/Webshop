// Product data and functionality

// Sample product data (will be replaced with actual data from backend)
const products = [
    {
        id: 1,
        name: 'Groin Pocket Boxer Shorts',
        price: 24.99,
        category: 'designs',
        image: 'images/boxers.png',
        description: 'Premium boxer shorts with a revolutionary hidden zippered pocket strategically placed in the groin area. Designed for maximum discretion and security - perfect for festivals, travel, or any situation where you need to keep essentials completely hidden. Made from soft, breathable bamboo blend fabric.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Navy', 'Charcoal'],
        features: ['Hidden zippered groin pocket', 'Bamboo blend fabric', 'Moisture-wicking', 'Anti-chafe seams', 'Elastic waistband']
    },
    {
        id: 2,
        name: 'Stealth String Panties',
        price: 19.99,
        category: 'designs',
        image: 'images/bikini.png',
        description: 'Ultra-discreet string panties featuring a hidden zippered pocket in the groin area. Minimal design with maximum functionality. Perfect for raves, festivals, or any time you need to keep small essentials completely concealed. Soft, stretchy microfiber construction.',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Nude', 'Red'],
        features: ['Micro zippered groin pocket', 'String side design', 'Seamless construction', 'Quick-dry fabric', 'Ultra-thin profile']
    },
    {
        id: 3,
        name: 'Pollenallergi Print',
        price: 15.99,
        category: 'prints',
        image: 'images/pollen.png',
        description: 'Unique "Pollenallergi" artistic print available for custom application on various items. Choose your preferred item and we\'ll have it professionally printed and shipped directly to you by our printing partner. High-quality, durable printing on premium materials.',
        customizable: true,
        printOptions: [
            { item: 'T-Shirt', basePrice: 15.99 },
            { item: 'Hoodie', basePrice: 29.99 },
            { item: 'Tote Bag', basePrice: 12.99 },
            { item: 'Baseball Cap', basePrice: 18.99 },
            { item: 'Beanie', basePrice: 16.99 },
            { item: 'Tank Top', basePrice: 14.99 }
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        note: 'Printed and shipped by third-party partner. Allow 7-14 days for production and shipping.'
    },
    {
        id: 4,
        name: 'Vintage Adidas Sweatshirt OS Switzerland',
        price: 89.99,
        category: 'second-hand',
        image: 'https://via.placeholder.com/300x400/333333/666666?text=Vintage+Adidas',
        description: 'Authentic vintage Adidas sweatshirt from OS (Original Series) Switzerland collection. Rare find in excellent condition featuring the classic three stripes and retro styling. Perfect for collectors and vintage enthusiasts.',
        size: 'L',
        condition: 'Excellent',
        era: '1990s',
        features: ['Authentic vintage piece', 'OS Switzerland collection', 'Classic three stripes', 'Retro styling', 'Rare collector item'],
        note: 'One-of-a-kind vintage item. Size and condition as described. All sales final on vintage items.'
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
