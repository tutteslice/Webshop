/**
 * Application configuration
 */
export const CONFIG = {
    // API endpoints
    API: {
        BASE_URL: 'https://api.yourdomain.com',
        ENDPOINTS: {
            PRODUCTS: '/products',
            CATEGORIES: '/categories',
            CART: '/cart',
            ORDERS: '/orders',
            NEWSLETTER: '/newsletter'
        }
    },
    
    // LocalStorage keys
    STORAGE_KEYS: {
        CART: 'dt_cart',
        USER: 'dt_user',
        SESSION: 'dt_session'
    },
    
    // Animation timings
    ANIMATION: {
        DURATION: {
            SHORT: 200,
            MEDIUM: 300,
            LONG: 500
        },
        EASING: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    // Breakpoints (in pixels)
    BREAKPOINTS: {
        MOBILE: 480,
        TABLET: 768,
        DESKTOP: 1024,
        LARGE_DESKTOP: 1440
    },
    
    // Default settings
    DEFAULTS: {
        CURRENCY: '$',
        ITEMS_PER_PAGE: 12,
        MAX_QUANTITY: 10
    }
};

/**
 * Get the current breakpoint
 * @return {string} - The current breakpoint name
 */
export function getCurrentBreakpoint() {
    const width = window.innerWidth;
    const { BREAKPOINTS } = CONFIG;
    
    if (width < BREAKPOINTS.MOBILE) return 'mobile';
    if (width < BREAKPOINTS.TABLET) return 'mobile';
    if (width < BREAKPOINTS.DESKTOP) return 'tablet';
    if (width < BREAKPOINTS.LARGE_DESKTOP) return 'desktop';
    return 'large-desktop';
}

/**
 * Check if current device is mobile
 * @return {boolean} - True if mobile device
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get API endpoint
 * @param {string} key - The endpoint key
 * @return {string} - The full API endpoint URL
 */
export function getApiEndpoint(key) {
    return `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS[key] || ''}`;
}
