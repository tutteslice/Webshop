# Dopamine Threads E-commerce

A modern, responsive e-commerce website for Dopamine Threads, featuring a Netflix-inspired dark theme.

## Project Structure

```
webshop/
├── css/                    # Stylesheets
│   ├── base/               # Base styles, variables, resets
│   ├── components/         # Reusable UI components
│   ├── layout/             # Layout-specific styles
│   ├── pages/              # Page-specific styles
│   └── style.css           # Main stylesheet (compiled)
│
├── images/                # Image assets
│   └── logo/               # Logo files
│
├── js/                    # JavaScript files
│   ├── modules/            # Modular JavaScript
│   │   ├── cart.js         # Cart functionality
│   │   ├── products.js     # Product data and rendering
│   │   ├── ui.js           # UI interactions
│   │   └── utils.js        # Utility functions
│   ├── config.js           # App configuration
│   └── main.js             # Main application entry point
│
├── about.html             # About page
├── cart.html               # Shopping cart page
├── contact.html            # Contact page
├── faq.html                # FAQ page
├── index.html              # Home page
├── privacy.html            # Privacy policy
├── shop.html               # Shop page
└── shipping.html           # Shipping info page
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dopamine-threads.git
   cd dopamine-threads
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This will start a local development server with live reload.

4. **Build for production**
   ```bash
   npm run build
   ```
   This will optimize and minify assets for production.

## Features

- **Responsive Design**: Works on all device sizes
- **Dark Theme**: Netflix-inspired dark color scheme
- **Shopping Cart**: Persistent cart using localStorage
- **Product Filtering**: Filter products by category
- **Newsletter Signup**: Email collection form
- **Performance Optimized**: Fast loading and smooth animations

## JavaScript Modules

The JavaScript is organized into modules for better maintainability:

- **cart.js**: Handles all cart-related functionality
- **products.js**: Manages product data and rendering
- **ui.js**: UI interactions and components
- **utils.js**: Helper functions and utilities
- **config.js**: Application configuration and constants

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 10+)
- Chrome for Android

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
