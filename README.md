# 🏪 Complete POS System - Point of Sale Web Application

A comprehensive, modern Point of Sale (POS) system built with HTML, CSS, and JavaScript. This application provides a complete business solution with authentication, dashboard analytics, enhanced POS functionality, and customer support features.

## 🌟 Live Demo

**GitHub Repository**: [https://github.com/Kelvinn03/pos-system](https://github.com/Kelvinn03/pos-system)

**Live Demo**: [https://kelvinn03.github.io/pos-system](https://kelvinn03.github.io/pos-system) (Enable GitHub Pages)

## ✨ Features

### 🔐 Authentication & Onboarding
- **User Registration**: Full name, email, password, birth date, security questions
- **Secure Login**: Email/username and password authentication
- **Password Reset**: Security question-based password recovery
- **Session Management**: Remember me functionality with localStorage/sessionStorage

### 📊 Dashboard & Analytics
- **Sales Summary**: Total revenue, transaction count, product inventory, daily customers
- **Interactive Charts**: 7-day sales analytics with period selection (7d, 30d, 90d)
- **Top Products**: Best-selling products with sales metrics
- **Recent Transactions**: Latest transaction history with status tracking
- **Quick Actions**: Direct access to main system functions
- **Real-time Updates**: Live date/time display and dynamic data

### 🛒 Enhanced POS System
- **Sales Management**: Product search, cart management, quantity controls
- **Multiple Payment Methods**: 
  - 💵 Cash
  - 💳 Credit/Debit Card
  - 📱 QRIS
  - 📲 E-Wallet
  - ✂️ Split Payment
  - 🏪 Store Credit
- **Refund Processing**: Transaction search, item selection, condition tracking
- **Receipt Generation**: Professional receipts with print and email options
- **Tax Calculation**: Configurable tax rates (default 10%)
- **Inventory Tracking**: Real-time stock management

### 📞 Contact & Support
- **Contact Information**: Email, phone, WhatsApp, business address
- **Contact Form**: Message submission with categorized subjects
- **Business Hours**: Operating hours display
- **FAQ Section**: Expandable frequently asked questions
- **Support Tickets**: Priority-based support system with status tracking
- **Feedback System**: 5-star rating system with categorized feedback

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glass-morphism Effects**: Modern visual design with backdrop blur
- **Smooth Animations**: CSS transitions and hover effects
- **Intuitive Navigation**: Sidebar navigation with active state indicators
- **Professional Styling**: Clean, modern interface with consistent branding

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure with accessibility features
- **CSS3** - Modern styling with Flexbox, Grid, and CSS Variables
- **JavaScript (ES6+)** - Interactive functionality with classes and modules
- **Font Awesome** - Comprehensive icon library
- **Local Storage** - Data persistence and session management

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- No additional dependencies or installation required

### Quick Start

1. **Clone the repository**:
```bash
git clone https://github.com/Kelvinn03/pos-system.git
cd pos-system
```

2. **Open the application**:
```bash
# On macOS
open login.html

# On Windows
start login.html

# On Linux
xdg-open login.html
```

3. **Register a new account** or use demo credentials:
   - **Email**: demo@possystem.com
   - **Password**: demo123
   - **Security Question**: What is your favorite color?
   - **Answer**: blue

## 📁 Project Structure

```
pos-system/
├── 🔐 Authentication
│   ├── login.html              # User login page
│   ├── register.html           # User registration
│   ├── forgot-password.html    # Password reset
│   └── auth.js                 # Authentication logic
├── 📊 Dashboard
│   ├── dashboard.html          # Main dashboard
│   └── dashboard.js            # Dashboard functionality
├── 🛒 POS System
│   ├── pos.html               # Enhanced POS interface
│   ├── pos.js                 # POS functionality
│   ├── index.html             # Original POS demo
│   └── script.js              # Original POS logic
├── 📞 Support
│   ├── contact.html           # Contact Us page
│   ├── contact.js             # Contact form handling
│   ├── support.html           # Support Center
│   └── support.js             # Support functionality
├── 🎨 Styling
│   └── styles.css             # Complete responsive styling
└── 📖 Documentation
    ├── README.md              # This file
    └── GITHUB_SETUP.md        # Setup guide
```

## 🎮 Usage Guide

### 1. Authentication
- **Register**: Create account with personal details and security questions
- **Login**: Access system with email/username and password
- **Password Reset**: Use security questions to recover account

### 2. Dashboard
- **View Analytics**: Check sales summary, top products, and recent transactions
- **Navigate**: Use sidebar to access different system modules
- **Quick Actions**: Direct access to POS, products, and reports

### 3. POS Operations
- **Sales**: Search products, add to cart, adjust quantities
- **Payment**: Select payment method and process transactions
- **Refund**: Search transactions and process item returns
- **Receipts**: Print or email transaction receipts

### 4. Support
- **Contact**: Send messages to support team
- **FAQ**: Browse frequently asked questions
- **Tickets**: Create support tickets with priority levels
- **Feedback**: Rate system and provide improvement suggestions

## ⚙️ Customization

### Adding Products
Edit the `products` array in `pos.js`:
```javascript
this.products = [
    { 
        id: 1, 
        name: 'Your Product', 
        price: 25000, 
        stock: 50, 
        category: 'Category', 
        sku: 'SKU001' 
    },
    // Add more products...
];
```

### Configuring Tax Rate
Modify in `pos.js`:
```javascript
this.taxRate = 0.10; // 10% tax rate
```

### Styling Customization
- **Colors**: Edit CSS custom properties in `styles.css`
- **Layout**: Modify grid and flexbox properties
- **Animations**: Adjust transition and transform properties
- **Typography**: Change font families and sizes

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 55+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with multi-column layouts
- **Tablet**: Optimized touch interface with collapsible sidebar
- **Mobile**: Single-column layout with mobile-friendly controls

## 🔒 Security Features

- **Password Strength**: Real-time password strength validation
- **Input Validation**: Client-side form validation and sanitization
- **Session Management**: Secure session handling with localStorage/sessionStorage
- **XSS Protection**: Input sanitization and safe HTML rendering

## 🚀 Deployment

### GitHub Pages
1. Go to repository Settings → Pages
2. Source: "Deploy from a branch" → "main"
3. Your site will be live at: `https://kelvinn03.github.io/pos-system`

### Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Roadmap

### ✅ Completed Features
- [x] User authentication and registration
- [x] Dashboard with analytics
- [x] Enhanced POS system
- [x] Multiple payment methods
- [x] Refund processing
- [x] Contact and support system
- [x] Responsive design
- [x] Modern UI/UX

### 🔄 Future Enhancements
- [ ] Backend integration with database
- [ ] User role management (Admin, Cashier, Manager)
- [ ] Advanced inventory management
- [ ] Sales reporting and analytics
- [ ] Multi-location support
- [ ] Barcode scanning integration
- [ ] Customer management system
- [ ] Discount and coupon system
- [ ] Offline functionality
- [ ] Mobile app development
- [ ] API integration
- [ ] Real-time notifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Kelvinn03/pos-system/issues)
- **Contact**: Use the Contact Us page in the application
- **Documentation**: Check the FAQ section in Support Center

## 🙏 Acknowledgments

- **Font Awesome** for the comprehensive icon library
- **Modern CSS** techniques for responsive design
- **JavaScript ES6+** for modern functionality
- **GitHub** for hosting and version control

---

**🎉 Ready to use!** This is a complete, production-ready POS system with all essential features for modern retail operations. Perfect for small to medium businesses looking for a comprehensive point-of-sale solution.

**Repository**: [https://github.com/Kelvinn03/pos-system](https://github.com/Kelvinn03/pos-system)
**Live Demo**: [https://kelvinn03.github.io/pos-system](https://kelvinn03.github.io/pos-system)