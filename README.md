# Jewel Collection - Jewelry Store Website

A modern, responsive jewelry store website built with HTML, CSS, and JavaScript. Features a beautiful catalog of jewelry items with search, filtering, and WhatsApp sharing capabilities.

## Features

### 🎨 Design & UI
- **Modern & Stylish**: Clean, elegant design with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth transitions, and micro-animations
- **Professional Layout**: Grid-based catalog with modal detail views

### 🔍 Functionality
- **Search**: Real-time search across item names, descriptions, and categories
- **Filtering**: Filter by jewelry categories (Rings, Necklaces, Earrings, Bracelets)
- **Item Details**: Click any item to view detailed information in a modal
- **WhatsApp Sharing**: Share specific items directly to WhatsApp
- **Copy Link**: Generate and copy shareable links for individual items
- **Responsive Navigation**: Mobile-friendly navigation and filters

### 📱 WhatsApp Integration
- **Quick Share**: Share items directly from the catalog grid
- **Detailed Share**: Share with full item details from the modal view
- **Custom Messages**: Formatted messages with item name, price, and description
- **Deep Linking**: Shareable URLs that open specific items

## File Structure

```
jewel/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Clone or Download**: Get all the files in a single folder
2. **Open**: Simply open `index.html` in any modern web browser
3. **No Setup Required**: No server or additional dependencies needed

## Usage

### Viewing Items
- Browse the jewelry catalog on the main page
- Use the search bar to find specific items
- Click filter buttons to show items by category
- Click any item to view detailed information

### Sharing Items
- **Quick Share**: Click the WhatsApp icon on any item card
- **Detailed Share**: Open item details and click "Share on WhatsApp"
- **Copy Link**: Use "Copy Link" to get a shareable URL

### Customization

#### Adding New Items
Edit the `jewelryData` array in `script.js`:

```javascript
{
    id: 13,
    name: "Your Item Name",
    category: "ring", // ring, necklace, earring, bracelet
    price: 1500,
    image: "https://your-image-url.com/image.jpg",
    description: "Your item description here..."
}
```

#### Changing Colors
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #e74c3c;    /* Main brand color */
    --secondary-color: #2c3e50;  /* Text color */
    --background: #f5f7fa;       /* Background gradient start */
}
```

#### Adding Categories
1. Add new filter button in HTML
2. Update filter functionality in JavaScript
3. Add corresponding items with the new category

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: No frameworks, pure JavaScript for better performance
- **Font Awesome**: Icons for better visual appeal
- **Google Fonts**: Professional typography

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- **Lazy Loading**: Images load only when needed
- **Debounced Search**: Optimized search performance
- **CSS Animations**: Hardware-accelerated transitions
- **Responsive Images**: Optimized for different screen sizes

## Customization Guide

### Changing the Store Name
Replace "Jewel Collection" in:
- `index.html`: Page title and header
- Update the logo text and favicon if needed

### Modifying Styles
- **Colors**: Update the color variables in the CSS
- **Fonts**: Change the Google Fonts imports and font-family declarations
- **Layout**: Modify the grid columns and spacing in the CSS Grid properties

### Adding Features
The codebase is modular and well-commented, making it easy to add:
- Shopping cart functionality
- User accounts
- Payment integration
- Inventory management
- Admin panel

## SEO & Performance

- **Semantic HTML**: Proper heading structure and meta tags
- **Image Optimization**: Lazy loading and proper alt attributes
- **Mobile-First**: Responsive design principles
- **Fast Loading**: Minimal dependencies and optimized code

## License

This project is open source and available under the MIT License.

## Support

For questions or customizations, refer to the well-commented code or create an issue in the repository.

---

**Note**: Replace the sample jewelry data and images with your actual inventory. The current images are sourced from Unsplash for demonstration purposes.