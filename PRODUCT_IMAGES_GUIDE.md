# Product Images Guide

## Naming Convention

All product images follow this standardized naming convention:

**Format**: `product-{ID}-{slug}-{variant}.{ext}`

### Examples:
- `product-001-stealth-boxers-main.png`
- `product-001-stealth-boxers-alt1.jpg`
- `product-004-pocket-panties-main.png`
- `product-007-pocket-bra-back.png`

## Directory Structure

```
images/products/
├── product-001-stealth-boxers-main.png
├── product-001-stealth-boxers-alt1.png
├── product-002-vintage-pants-main.png
├── product-003-neon-print-main.png
├── product-004-pocket-panties-main.png
├── product-005-festival-posters-main.png
├── product-006-rave-jacket-main.png
├── product-007-pocket-bra-main.png
└── product-007-pocket-bra-back.png
```

## Image Variants

- **main**: Primary product image (required)
- **alt1, alt2, alt3**: Alternative angles/views
- **back**: Back view of the product
- **detail**: Close-up detail shots
- **lifestyle**: Product in use/styled photos
- **size**: Size comparison images

## Current Product Image Mapping

| Product ID | Product Name | Main Image | Alt Images |
|------------|--------------|------------|------------|
| 001 | Stealth Pocket Boxers | product-001-stealth-boxers-main.png | - |
| 002 | Vintage Rave Pants | product-002-vintage-pants-main.png | - |
| 003 | Neon Dreams Art Print | product-003-neon-print-main.png | - |
| 004 | Hidden Pocket Panties | product-004-pocket-panties-main.png | - |
| 005 | Festival Poster Collection | product-005-festival-posters-main.png | - |
| 006 | 90s Rave Jacket | product-006-rave-jacket-main.png | - |
| 007 | Hidden Pocket Bra | product-007-pocket-bra-main.png | product-007-pocket-bra-back.png |

## Adding New Product Images

1. **Generate filename**: Use the naming convention above
2. **Place in directory**: `/images/products/`
3. **Update product data**: Add to the `images` object in the product data
4. **Test**: Verify images load correctly on the shop page

## Image Requirements

- **Format**: PNG, JPG, or WebP
- **Size**: Minimum 300x400px for main images
- **Quality**: High quality, web-optimized
- **Background**: Consistent lighting and background
- **Naming**: Follow the exact naming convention

## Fallback System

The system includes automatic fallbacks:
1. Try the specified image path
2. Fall back to placeholder image if not found
3. Placeholder includes the product name for identification