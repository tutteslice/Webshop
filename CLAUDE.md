# CLAUDE.md - Dopamine Threads E-commerce Project

## Project Overview

**Dopamine Threads** is a modern, responsive e-commerce website built with vanilla HTML, CSS, and JavaScript. It features a Netflix-inspired dark theme and specializes in selling unique underwear with hidden pockets for festivals and raves.

### Key Characteristics
- **Project Type**: Static e-commerce website with client-side functionality
- **Theme**: Dark, Netflix-inspired design with red (#E50914) accents
- **Target Audience**: Festival-goers and rave enthusiasts
- **Core Value Proposition**: Underwear with hidden pockets for secure storage

## Technology Stack

### Frontend
- **HTML5**: Semantic markup with modular component structure
- **CSS3**: Custom CSS with CSS variables, Netflix-inspired color scheme
- **JavaScript ES6+**: Modular architecture using ES6 modules
- **Font Awesome 6.0**: Icon library for UI elements

### Development Tools
- **Browser-sync**: Live reload development server
- **npm**: Package management and script running
- **Git**: Version control

### External Dependencies
- Font Awesome CDN for icons
- Placeholder images via placeholder.com service

## Project Structure

```
/Users/thomasrooth/Documents/DMT/Webshop/
├── index.html              # Homepage
├── shop.html               # Product catalog
├── cart.html               # Shopping cart
├── about.html              # About page
├── contact.html            # Contact form
├── faq.html                # FAQ page
├── privacy.html            # Privacy policy
├── shipping.html           # Shipping information
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
├── cleanup.sh             # macOS ._ file cleanup utility
├── components/
│   └── nav.html           # Navigation component
├── css/
│   ├── style.css          # Main stylesheet
│   ├── shop.css           # Shop page styles
│   ├── cart.css           # Cart page styles
│   ├── about.css          # About page styles
│   ├── contact.css        # Contact page styles
│   ├── faq.css            # FAQ page styles
│   ├── legal.css          # Legal page styles
│   └── shipping.css       # Shipping page styles
├── js/
│   ├── main.js            # Main application entry point
│   ├── config.js          # Application configuration
│   ├── nav.js             # Navigation functionality
│   ├── shop.js            # Shop page functionality
│   ├── cart.js            # Cart page functionality
│   ├── about.js           # About page functionality
│   ├── contact.js         # Contact page functionality
│   ├── faq.js             # FAQ page functionality
│   ├── legal.js           # Legal page functionality
│   ├── shipping.js        # Shipping page functionality
│   └── modules/
│       ├── cart.js        # Cart management module
│       ├── products.js    # Product data and rendering
│       ├── ui.js          # UI interactions and components
│       └── utils.js       # Utility functions
└── images/
    ├── bg.png             # Background image
    ├── bikini.png         # Product image
    ├── boxers.png         # Product image
    ├── pollen.png         # Product image
    ├── uw.png             # Product image
    └── logo/
        └── logo.png       # Site logo
```

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Build for production (placeholder)
npm run build

# Clean up macOS ._ files
./cleanup.sh
```

### Development Server
- **Port**: Browser-sync auto-assigns port (typically 3000)
- **Live Reload**: Watches HTML, CSS, and JS files
- **Files Watched**: `**/*.html`, `css/*.css`, `js/**/*.js`

## Architecture Patterns

### JavaScript Module System
The project uses ES6 modules with a clear separation of concerns:

1. **main.js**: Application entry point, orchestrates initialization
2. **config.js**: Centralized configuration (API endpoints, breakpoints, storage keys)
3. **Modules Directory**: Specialized functionality modules

### Key Modules
- **cart.js**: LocalStorage-based cart management
- **products.js**: Product data and rendering logic
- **ui.js**: User interface interactions and notifications
- **utils.js**: Utility functions and helpers

### Component Loading Pattern
- Navigation is loaded dynamically into `#nav-placeholder` divs
- Each page has a corresponding JS file for page-specific functionality
- Modular CSS organization with page-specific stylesheets

### State Management
- **Cart State**: Managed via localStorage with key `dt_cart`
- **Configuration**: Centralized in `CONFIG` object
- **Product Data**: Currently hardcoded, structured for easy API integration

## Design System

### Color Palette
```css
:root {
    --black: #141414;        /* Primary background */
    --red: #E50914;          /* Brand accent (Netflix red) */
    --dark-gray: #222222;    /* Secondary backgrounds */
    --light-gray: #E5E5E5;   /* Light text/borders */
    --white: #FFFFFF;        /* Primary text */
}
```

### Typography
- **Font Family**: 'Helvetica Neue', Arial, sans-serif
- **Font Weights**: Regular (400), Semi-bold (600)
- **Letter Spacing**: 1px for buttons and headings

### Responsive Breakpoints
```javascript
BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE_DESKTOP: 1440
}
```

## Key Features

### Shopping Cart
- **Storage**: localStorage with key `dt_cart`
- **Functionality**: Add, remove, update quantities
- **UI**: Dynamic cart count badge, persistent across sessions
- **Cart Page**: Separate cart.html with full cart management

### Product Catalog
- **Data**: Currently hardcoded in `products.js`
- **Rendering**: Dynamic product cards with add-to-cart functionality
- **Categories**: Designs, Prints, Second-Hand Gems
- **Images**: Mix of placeholder and actual product images

### Navigation
- **Fixed Header**: Transparent background with scroll effects
- **Mobile Menu**: Hamburger menu for mobile devices
- **Cart Integration**: Cart icon with item count badge
- **Component**: Reusable nav.html loaded dynamically

### Notifications
- **Toast System**: Success/error notifications
- **Auto-dismiss**: 3-second display duration
- **Styling**: Consistent with dark theme

## Development Conventions

### File Naming
- **HTML**: Lowercase with hyphens (e.g., `shop.html`)
- **CSS**: Lowercase with hyphens (e.g., `style.css`)
- **JavaScript**: camelCase for files and functions
- **Images**: Lowercase with hyphens or underscores

### CSS Organization
- **Variables**: CSS custom properties in `:root`
- **Components**: Reusable UI component styles
- **Pages**: Page-specific styles in separate files
- **Responsive**: Mobile-first approach

### JavaScript Patterns
- **ES6 Modules**: Import/export syntax
- **Arrow Functions**: Preferred for callbacks
- **Async/Await**: Ready for API integration
- **Event Delegation**: Used for dynamic content

## Testing & Quality

### Current Status
- **No formal testing framework** implemented
- **Manual testing** via browser-sync development server
- **Cross-browser compatibility** targeted for modern browsers

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 10+)
- Chrome for Android

## Future Enhancements

### Backend Integration
- API endpoints configured in `config.js`
- Product data structure ready for API consumption
- Cart functionality can be extended for server-side storage

### Recommended Improvements
1. **Testing Framework**: Jest or Cypress for automated testing
2. **Build Process**: Webpack or Vite for bundling and optimization
3. **Image Optimization**: WebP format support and lazy loading
4. **SEO**: Meta tags and structured data
5. **Analytics**: Google Analytics or similar tracking

## Common Development Tasks

### Adding New Products
1. Update `products` array in `js/modules/products.js`
2. Add product images to `images/` directory
3. Test add-to-cart functionality

### Styling Changes
1. **Global changes**: Modify `css/style.css`
2. **Page-specific**: Edit corresponding page CSS file
3. **Colors**: Update CSS variables in `:root`

### New Page Creation
1. Create HTML file with nav placeholder
2. Create corresponding CSS file
3. Create corresponding JS file
4. Update navigation in `components/nav.html`

### Cart Modifications
1. **Cart logic**: Modify `js/modules/cart.js`
2. **Cart UI**: Update `cart.html` and `css/cart.css`
3. **Cart persistence**: LocalStorage key is `dt_cart`

## Troubleshooting

### Common Issues
1. **Cart not updating**: Check localStorage and `updateCartCount()` calls
2. **Navigation not loading**: Verify `nav.js` is loaded and `#nav-placeholder` exists
3. **Styles not applying**: Check CSS file import order and specificity
4. **Mobile menu not working**: Verify `setupMobileMenu()` is called

### Development Server Issues
```bash
# If browser-sync fails to start
npx browser-sync start --server --files "**/*.html, css/*.css, js/**/*.js"

# Clean npm cache if needed
npm cache clean --force
```

## Security Considerations

### Current Implementation
- **Client-side only**: No server-side vulnerabilities
- **LocalStorage**: Cart data stored locally (not sensitive)
- **External Resources**: Font Awesome loaded from CDN

### Best Practices
- No sensitive data in localStorage
- Placeholder API endpoints for future backend integration
- No inline JavaScript or CSS

---

This project follows modern web development practices with a clean, modular architecture that's easy to understand and extend. The codebase is well-organized and ready for future enhancements including backend integration and advanced features.