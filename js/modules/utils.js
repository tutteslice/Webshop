/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time in milliseconds to delay
 * @return {Function} - The debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency symbol (default: '$')
 * @return {string} - The formatted price
 */
export function formatPrice(price, currency = '$') {
    return `${currency}${parseFloat(price).toFixed(2)}`;
}

/**
 * Get URL parameters
 * @param {string} name - The parameter name to get
 * @return {string|null} - The parameter value or null if not found
 */
export function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * Check if element is in viewport
 * @param {Element} element - The element to check
 * @return {boolean} - True if element is in viewport
 */
export function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Toggle body scroll
 * @param {boolean} disable - Whether to disable scrolling
 */
export function toggleBodyScroll(disable) {
    document.body.style.overflow = disable ? 'hidden' : '';
}

/**
 * Simple validation for email
 * @param {string} email - The email to validate
 * @return {boolean} - True if email is valid
 */
export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
