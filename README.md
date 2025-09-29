# POS System - Point of Sale Web Application

A modern, responsive Point of Sale (POS) system built with HTML, CSS, and JavaScript. This application provides a clean and intuitive interface for managing sales transactions.

## Features

### 🛒 Product Management
- Interactive product grid with search functionality
- Visual product cards with icons and pricing
- Easy product selection and addition to cart

### 🛍️ Shopping Cart
- Real-time cart updates
- Quantity adjustment controls
- Item removal functionality
- Clear cart option

### 💰 Payment Processing
- Multiple payment methods (Cash, Card, Mobile)
- Automatic tax calculation (8%)
- Real-time total calculation
- Payment method selection

### 🧾 Receipt Generation
- Professional receipt layout
- Transaction ID generation
- Print functionality
- Email receipt option
- Complete transaction details

### 🎨 Modern UI/UX
- Responsive design for all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Glass-morphism design elements
- Intuitive user interface

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons and visual elements

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pos-system.git
```

2. Navigate to the project directory:
```bash
cd pos-system
```

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

## Usage

### Adding Products to Cart
1. Click on any product card in the product grid
2. The item will be automatically added to your cart
3. Use the quantity controls to adjust amounts

### Managing Cart Items
- **Increase Quantity**: Click the `+` button
- **Decrease Quantity**: Click the `-` button
- **Remove Item**: Click the `×` button
- **Clear Cart**: Click the "Clear" button

### Processing Payment
1. Select a payment method (Cash, Card, or Mobile)
2. Click "Process Payment" to complete the transaction
3. View and print the generated receipt

### Searching Products
- Use the search bar to filter products by name
- Real-time filtering as you type

## File Structure

```
pos-system/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Customization

### Adding New Products
Edit the `products` array in `script.js`:

```javascript
this.products = [
    { id: 1, name: 'Coffee', price: 3.50, icon: 'fas fa-coffee' },
    { id: 2, name: 'Burger', price: 8.99, icon: 'fas fa-hamburger' },
    // Add your products here
];
```

### Changing Tax Rate
Modify the `taxRate` property in the POSSystem class:

```javascript
this.taxRate = 0.08; // 8% tax rate
```

### Styling Customization
- Colors and themes can be modified in `styles.css`
- Font families and sizes can be adjusted
- Layout dimensions can be customized

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements

- [ ] User authentication and role management
- [ ] Inventory management system
- [ ] Sales reporting and analytics
- [ ] Multi-location support
- [ ] Offline functionality
- [ ] Barcode scanning integration
- [ ] Customer management
- [ ] Discount and coupon system

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Note**: This is a template/placeholder POS system for demonstration purposes. For production use, additional security measures, data persistence, and backend integration would be required.
