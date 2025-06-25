// Image utilities for product management

/**
 * Get the main product image with fallback
 * @param {Object} product - Product object
 * @returns {string} - Image URL
 */
export function getProductImage(product) {
    if (product.images && product.images.main) {
        return product.images.main;
    }
    // Fallback to old image property if it exists
    if (product.image) {
        return product.image;
    }
    // Final fallback to placeholder
    return `https://via.placeholder.com/300x400/333333/666666?text=${encodeURIComponent(product.name)}`;
}

/**
 * Get all product images (main + alternates)
 * @param {Object} product - Product object
 * @returns {Array} - Array of image URLs
 */
export function getAllProductImages(product) {
    const images = [];
    
    if (product.images) {
        if (product.images.main) {
            images.push(product.images.main);
        }
        if (product.images.alt && Array.isArray(product.images.alt)) {
            images.push(...product.images.alt);
        }
    }
    
    return images.length > 0 ? images : [getProductImage(product)];
}

/**
 * Generate standardized filename for product images
 * @param {number} productId - Product ID
 * @param {string} productName - Product name
 * @param {string} variant - Image variant (main, alt1, back, etc.)
 * @param {string} extension - File extension (jpg, png, webp)
 * @returns {string} - Standardized filename
 */
export function generateImageFilename(productId, productName, variant = 'main', extension = 'png') {
    const paddedId = String(productId).padStart(3, '0');
    const slug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    
    return `product-${paddedId}-${slug}-${variant}.${extension}`;
}

/**
 * Get the directory path for product images
 * @returns {string} - Directory path
 */
export function getProductImagesPath() {
    return 'images/products/';
}

/**
 * Generate full image path
 * @param {number} productId - Product ID
 * @param {string} productName - Product name
 * @param {string} variant - Image variant
 * @param {string} extension - File extension
 * @returns {string} - Full image path
 */
export function generateImagePath(productId, productName, variant = 'main', extension = 'png') {
    const filename = generateImageFilename(productId, productName, variant, extension);
    return getProductImagesPath() + filename;
}