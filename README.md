# 🎓 Front-End Programming Course - Mid-Term Exam Project

## 📚 Project Information
**Course**: Front-End Programming  
**Project Type**: Mid-Term Exam  
**Student**: Kelvin, Shinichi, Faiz, Andronikus, Eric  
**Technologies**: HTML, CSS, JavaScript 
**Repository**: [https://github.com/Kelvinn03/pos-system](https://github.com/Kelvinn03/pos-system)

---

## 🎯 Project Overview

This is a **Point of Sale (POS) System** developed as a mid-term exam project for the Front-End Programming course.

## ✨ Features Implemented

### 🔐 Authentication System
- User registration with form validation
- Secure login functionality
- Password reset with security questions
- Session management using localStorage

### 📊 Dashboard
- Sales analytics and summary cards
- Interactive charts and data visualization
- Navigation sidebar with active states
- Real-time date/time display

### 🛒 POS (Point of Sale) System
- Product search and filtering
- Shopping cart management
- Multiple payment methods (Cash, Card, QRIS, E-Wallet, etc.)
- Receipt generation and printing
- Refund processing functionality

### 📞 Support Features
- Contact form with validation
- FAQ section with expandable questions
- Support ticket system
- Feedback and rating system

### 🎨 UI/UX Design
- Responsive design for all devices
- Modern glass-morphism effects
- Smooth animations and transitions
- Professional color scheme and typography

## 📁 Project Structure

```
pos-system/
├── 🔐 Authentication
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   ├── forgot-password.html    # Password reset
│   └── auth.js                 # Authentication logic
├── 📊 Dashboard
│   ├── dashboard.html          # Main dashboard
│   └── dashboard.js            # Dashboard functionality
├── 🛒 POS System
│   ├── pos.html               # Enhanced POS interface
│   ├── pos.js                 # POS functionality
│   ├── index.html             # Original demo page
│   └── script.js              # Original POS logic
├── 📞 Support
│   ├── contact.html           # Contact page
│   ├── contact.js             # Contact form handling
│   ├── support.html           # Support center
│   └── support.js             # Support functionality
├── 🎨 Styling
│   └── styles.css             # Complete CSS styling
└── 📖 Documentation
    ├── README.md              # This file
    └── GITHUB_SETUP.md        # Setup instructions
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Running the Project

1. **Clone the repository**:
```bash
git clone https://github.com/Kelvinn03/pos-system.git
cd pos-system
```

2. **Open the application**:
```bash
# Start with the login page
open login.html
```

3. **Demo Credentials** (for testing):
   - **Email**: demo@possystem.com
   - **Password**: demo123
   - **Security Question**: What is your favorite color?
   - **Answer**: blue

## 🎮 How to Use

### 1. Authentication
- Register a new account or use demo credentials
- Login to access the system
- Test password reset functionality

### 2. Dashboard
- View sales analytics and summary
- Navigate to different sections using sidebar
- Use quick action buttons

### 3. POS System
- Add products to cart
- Process payments with different methods
- Generate and print receipts
- Test refund functionality

### 4. Support Features
- Submit contact messages
- Browse FAQ section
- Create support tickets
- Submit feedback

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full sidebar navigation with multi-column layouts
- **Tablet**: Optimized touch interface with collapsible sidebar
- **Mobile**: Single-column layout with mobile-friendly controls

## 🔧 Customization

### Adding Products
Edit the products array in `pos.js`:
```javascript
this.products = [
    { 
        id: 1, 
        name: 'Your Product', 
        price: 25000, 
        stock: 50, 
        category: 'Category', 
        sku: 'SKU001' 
    }
];
```

### Modifying Styling
- Colors: Edit CSS variables in `styles.css`
- Layout: Modify grid and flexbox properties
- Animations: Adjust transition and transform properties

## 📄 License

This project is created for educational purposes as part of the Front-End Programming course mid-term exam.


---

**Repository**: [https://github.com/Kelvinn03/pos-system](https://github.com/Kelvinn03/pos-system)  
