// POS System JavaScript
class POSSystem {
    constructor() {
        this.cart = [];
        this.products = [
            { id: 1, name: 'Coffee', price: 3.50, icon: 'fas fa-coffee' },
            { id: 2, name: 'Burger', price: 8.99, icon: 'fas fa-hamburger' },
            { id: 3, name: 'Pizza', price: 12.99, icon: 'fas fa-pizza-slice' },
            { id: 4, name: 'Ice Cream', price: 4.50, icon: 'fas fa-ice-cream' },
            { id: 5, name: 'Cookie', price: 2.99, icon: 'fas fa-cookie-bite' },
            { id: 6, name: 'Wine', price: 15.99, icon: 'fas fa-wine-bottle' }
        ];
        this.taxRate = 0.08;
        this.currentPaymentMethod = null;
        
        this.init();
    }

    init() {
        this.updateDateTime();
        this.setupEventListeners();
        this.updateCartDisplay();
        this.updateCheckoutButton();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
    }

    updateDateTime() {
        const now = new Date();
        const dateTimeElement = document.getElementById('dateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleString();
        }
    }

    setupEventListeners() {
        // Product search
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterProducts(e.target.value));
        }

        // Product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = parseInt(card.dataset.productId);
                this.addToCart(productId);
            });
        });

        // Clear cart button
        const clearCartBtn = document.getElementById('clearCart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }

        // Payment method buttons
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectPaymentMethod(e.currentTarget.dataset.method);
            });
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.processPayment());
        }

        // Modal controls
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal());
        }

        const printBtn = document.getElementById('printReceipt');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printReceipt());
        }

        const emailBtn = document.getElementById('emailReceipt');
        if (emailBtn) {
            emailBtn.addEventListener('click', () => this.emailReceipt());
        }

        // Close modal when clicking outside
        const modal = document.getElementById('receiptModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    filterProducts(searchTerm) {
        const productCards = document.querySelectorAll('.product-card');
        const term = searchTerm.toLowerCase();

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.updateCheckoutButton();
        this.showAddToCartAnimation(productId);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartDisplay();
        this.updateCheckoutButton();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.updateCartDisplay();
            this.updateCheckoutButton();
        }
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('Are you sure you want to clear the cart?')) {
            this.cart = [];
            this.currentPaymentMethod = null;
            this.updateCartDisplay();
            this.updateCheckoutButton();
            this.updatePaymentMethodButtons();
        }
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 40px;">No items in cart</div>';
        } else {
            cartItemsContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="pos.updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="pos.updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="pos.removeFromCart(${item.id})" title="Remove item">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        this.updateCartSummary();
    }

    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (!checkoutBtn) return;

        const hasItems = this.cart.length > 0;
        const hasPaymentMethod = this.currentPaymentMethod !== null;
        
        checkoutBtn.disabled = !hasItems || !hasPaymentMethod;
    }

    selectPaymentMethod(method) {
        this.currentPaymentMethod = method;
        this.updatePaymentMethodButtons();
        this.updateCheckoutButton();
    }

    updatePaymentMethodButtons() {
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.method === this.currentPaymentMethod) {
                btn.classList.add('selected');
                btn.style.background = '#667eea';
                btn.style.color = 'white';
                btn.style.borderColor = '#667eea';
            } else {
                btn.style.background = '#f7fafc';
                btn.style.color = '';
                btn.style.borderColor = '#e2e8f0';
            }
        });
    }

    processPayment() {
        if (this.cart.length === 0 || !this.currentPaymentMethod) return;

        // Simulate payment processing
        const checkoutBtn = document.getElementById('checkoutBtn');
        const originalText = checkoutBtn.innerHTML;
        checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        checkoutBtn.disabled = true;

        setTimeout(() => {
            this.showReceipt();
            this.clearCart();
            checkoutBtn.innerHTML = originalText;
            checkoutBtn.disabled = false;
        }, 2000);
    }

    showReceipt() {
        const modal = document.getElementById('receiptModal');
        const receiptContent = document.getElementById('receiptContent');
        
        if (!modal || !receiptContent) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * this.taxRate;
        const total = subtotal + tax;
        const transactionId = this.generateTransactionId();

        receiptContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3>POS SYSTEM</h3>
                <p>123 Business Street<br>City, State 12345</p>
                <p>Phone: (555) 123-4567</p>
            </div>
            
            <div style="border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; padding: 15px 0; margin: 15px 0;">
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Cashier:</strong> John Doe</p>
                <p><strong>Payment Method:</strong> ${this.currentPaymentMethod.toUpperCase()}</p>
            </div>
            
            <div style="margin: 15px 0;">
                ${this.cart.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${item.name} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="border-top: 1px dashed #ccc; padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Tax (${(this.taxRate * 100).toFixed(0)}%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em; border-top: 1px solid #ccc; padding-top: 10px;">
                    <span>TOTAL:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ccc;">
                <p>Thank you for your business!</p>
                <p>Please come again!</p>
            </div>
        `;

        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('receiptModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    printReceipt() {
        const receiptContent = document.getElementById('receiptContent');
        if (!receiptContent) return;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        body { font-family: 'Courier New', monospace; font-size: 12px; margin: 0; padding: 20px; }
                        @media print { body { margin: 0; padding: 10px; } }
                    </style>
                </head>
                <body>
                    ${receiptContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    emailReceipt() {
        const receiptContent = document.getElementById('receiptModal');
        if (!receiptContent) return;

        const email = prompt('Enter customer email address:');
        if (email && this.validateEmail(email)) {
            alert(`Receipt sent to ${email}`);
            this.closeModal();
        } else if (email) {
            alert('Please enter a valid email address.');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    generateTransactionId() {
        return 'TXN' + Date.now().toString().slice(-8);
    }

    showAddToCartAnimation(productId) {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            productCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                productCard.style.transform = '';
            }, 150);
        }
    }
}

// Initialize POS System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pos = new POSSystem();
});

// Add some additional utility functions
document.addEventListener('keydown', (e) => {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('receiptModal');
        if (modal && modal.style.display === 'block') {
            window.pos.closeModal();
        }
    }
    
    // Enter key to search
    if (e.key === 'Enter' && e.target.id === 'productSearch') {
        e.preventDefault();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
