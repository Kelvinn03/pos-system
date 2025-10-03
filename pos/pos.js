// Enhanced POS System JavaScript
class EnhancedPOS {
    constructor() {
        this.cart = [];
        this.products = [];
        this.currentTab = 'sales';
        this.selectedPaymentMethod = null;
        this.selectedTransaction = null;
        this.taxRate = 0.10; // 10% tax rate
        this.discountRate = 0;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.loadUserInfo();
        this.updateDateTime();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartDisplay();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
    }

    loadProducts() {
        // Load products from localStorage or use mock data
        const storedProducts = localStorage.getItem('posProducts');
        if (storedProducts) {
            this.products = JSON.parse(storedProducts);
        } else {
            // Mock products data
            this.products = [
                { id: 1, name: 'Coffee Latte', price: 25000, stock: 50, category: 'Minuman', sku: 'COF001' },
                { id: 2, name: 'Burger Deluxe', price: 45000, stock: 30, category: 'Makanan', sku: 'BRG001' },
                { id: 3, name: 'Pizza Margherita', price: 80000, stock: 20, category: 'Makanan', sku: 'PIZ001' },
                { id: 4, name: 'Ice Cream Vanilla', price: 15000, stock: 40, category: 'Dessert', sku: 'ICE001' },
                { id: 5, name: 'Chocolate Cookie', price: 10000, stock: 60, category: 'Snack', sku: 'COK001' },
                { id: 6, name: 'Green Tea', price: 20000, stock: 35, category: 'Minuman', sku: 'TEA001' },
                { id: 7, name: 'French Fries', price: 18000, stock: 45, category: 'Snack', sku: 'FRI001' },
                { id: 8, name: 'Chicken Wings', price: 35000, stock: 25, category: 'Makanan', sku: 'WNG001' }
            ];
            localStorage.setItem('posProducts', JSON.stringify(this.products));
        }
    }

    loadUserInfo() {
        const session = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
        if (session) {
            const userData = JSON.parse(session);
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = userData.fullName || 'User';
            }
        }
    }

    updateDateTime() {
        const now = new Date();
        const dateTimeElement = document.getElementById('dateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Product search
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterProducts(e.target.value));
        }

        // Clear cart button
        const clearCartBtn = document.getElementById('clearCart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => this.clearCart());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.proceedToPayment());
        }

        // Payment method selection
        document.querySelectorAll('.payment-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectPaymentMethod(e.currentTarget.dataset.method));
        });

        // Process payment button
        const processPaymentBtn = document.getElementById('processPaymentBtn');
        if (processPaymentBtn) {
            processPaymentBtn.addEventListener('click', () => this.processPayment());
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

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;

        // Load tab-specific data
        if (tabName === 'payment') {
            this.loadPaymentDetails();
        }
    }

    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        if (!productGrid) return;

        productGrid.innerHTML = this.products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <i class="fas fa-${this.getProductIcon(product.category)}"></i>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-category">${product.category}</p>
                    <p class="product-price">${this.formatCurrency(product.price)}</p>
                    <p class="product-stock">Stok: ${product.stock}</p>
                </div>
            </div>
        `).join('');

        // Add click event listeners to product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const productId = parseInt(card.dataset.productId);
                this.addToCart(productId);
            });
        });
    }

    getProductIcon(category) {
        const icons = {
            'Minuman': 'coffee',
            'Makanan': 'hamburger',
            'Dessert': 'ice-cream',
            'Snack': 'cookie-bite'
        };
        return icons[category] || 'box';
    }

    filterProducts(searchTerm) {
        const productCards = document.querySelectorAll('.product-card');
        const term = searchTerm.toLowerCase();

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
            
            if (productName.includes(term) || productCategory.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || product.stock <= 0) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity += 1;
            } else {
                this.showMessage('Stok tidak mencukupi!', 'error');
                return;
            }
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                category: product.category
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

        const product = this.products.find(p => p.id === productId);
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else if (item.quantity > product.stock) {
            item.quantity = product.stock;
            this.showMessage('Stok tidak mencukupi!', 'error');
        } else {
            this.updateCartDisplay();
            this.updateCheckoutButton();
        }
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
            this.cart = [];
            this.updateCartDisplay();
            this.updateCheckoutButton();
        }
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<div style="text-align: center; color: #a0aec0; padding: 40px;">Keranjang kosong</div>';
        } else {
            cartItemsContainer.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-category">${item.category}</div>
                        <div class="cart-item-price">${this.formatCurrency(item.price)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="pos.updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="pos.updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="pos.removeFromCart(${item.id})" title="Hapus item">
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
        const discount = subtotal * this.discountRate;
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * this.taxRate;
        const total = taxableAmount + tax;

        document.getElementById('subtotal').textContent = this.formatCurrency(subtotal);
        document.getElementById('discount').textContent = this.formatCurrency(discount);
        document.getElementById('tax').textContent = this.formatCurrency(tax);
        document.getElementById('total').textContent = this.formatCurrency(total);
    }

    updateCheckoutButton() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (!checkoutBtn) return;

        checkoutBtn.disabled = this.cart.length === 0;
    }

    proceedToPayment() {
        if (this.cart.length === 0) return;
        this.switchTab('payment');
    }

    loadPaymentDetails() {
        const paymentDetails = document.getElementById('paymentDetails');
        if (!paymentDetails) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * this.discountRate;
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * this.taxRate;
        const total = taxableAmount + tax;

        paymentDetails.innerHTML = `
            <div class="payment-summary-item">
                <span>Subtotal:</span>
                <span>${this.formatCurrency(subtotal)}</span>
            </div>
            <div class="payment-summary-item">
                <span>Diskon:</span>
                <span>${this.formatCurrency(discount)}</span>
            </div>
            <div class="payment-summary-item">
                <span>Pajak (10%):</span>
                <span>${this.formatCurrency(tax)}</span>
            </div>
            <div class="payment-summary-item total">
                <span>Total:</span>
                <span>${this.formatCurrency(total)}</span>
            </div>
        `;
    }

    selectPaymentMethod(method) {
        this.selectedPaymentMethod = method;
        
        // Update UI
        document.querySelectorAll('.payment-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-method="${method}"]`).classList.add('selected');

        // Enable process payment button
        const processPaymentBtn = document.getElementById('processPaymentBtn');
        if (processPaymentBtn) {
            processPaymentBtn.disabled = false;
        }
    }

    processPayment() {
        if (this.cart.length === 0 || !this.selectedPaymentMethod) return;

        // Simulate payment processing
        const processPaymentBtn = document.getElementById('processPaymentBtn');
        const originalText = processPaymentBtn.innerHTML;
        processPaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        processPaymentBtn.disabled = true;

        setTimeout(() => {
            this.completePayment();
            processPaymentBtn.innerHTML = originalText;
            processPaymentBtn.disabled = false;
        }, 2000);
    }

    completePayment() {
        // Create transaction record
        const transaction = {
            id: this.generateTransactionId(),
            date: new Date().toISOString(),
            items: [...this.cart],
            subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            discount: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * this.discountRate,
            tax: (this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * (1 - this.discountRate)) * this.taxRate,
            total: this.calculateTotal(),
            paymentMethod: this.selectedPaymentMethod,
            status: 'completed'
        };

        // Save transaction
        const transactions = JSON.parse(localStorage.getItem('posTransactions') || '[]');
        transactions.push(transaction);
        localStorage.setItem('posTransactions', JSON.stringify(transactions));

        // Update product stock
        this.updateProductStock();

        // Show receipt
        this.showReceipt(transaction);

        // Clear cart and reset
        this.cart = [];
        this.selectedPaymentMethod = null;
        this.updateCartDisplay();
        this.updateCheckoutButton();
        this.switchTab('sales');
    }

    updateProductStock() {
        this.cart.forEach(cartItem => {
            const product = this.products.find(p => p.id === cartItem.id);
            if (product) {
                product.stock -= cartItem.quantity;
            }
        });
        localStorage.setItem('posProducts', JSON.stringify(this.products));
        this.renderProducts();
    }



    showReceipt(transaction) {
        const modal = document.getElementById('receiptModal');
        const receiptContent = document.getElementById('receiptContent');
        
        if (!modal || !receiptContent) return;

        receiptContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3>POS SYSTEM</h3>
                <p>123 Business Street<br>Jakarta, Indonesia 12345</p>
                <p>Telp: (021) 123-4567</p>
            </div>
            
            <div style="border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; padding: 15px 0; margin: 15px 0;">
                <p><strong>ID Transaksi:</strong> ${transaction.id}</p>
                <p><strong>Tanggal:</strong> ${this.formatDate(transaction.date)}</p>
                <p><strong>Kasir:</strong> ${this.getCurrentUser()}</p>
                <p><strong>Metode Pembayaran:</strong> ${this.getPaymentMethodText(transaction.paymentMethod)}</p>
            </div>
            
            <div style="margin: 15px 0;">
                ${transaction.items.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>${item.name} x${item.quantity}</span>
                        <span>${this.formatCurrency(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="border-top: 1px dashed #ccc; padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal:</span>
                    <span>${this.formatCurrency(transaction.subtotal)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Diskon:</span>
                    <span>${this.formatCurrency(transaction.discount)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Pajak (10%):</span>
                    <span>${this.formatCurrency(transaction.tax)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em; border-top: 1px solid #ccc; padding-top: 10px;">
                    <span>TOTAL:</span>
                    <span>${this.formatCurrency(transaction.total)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ccc;">
                <p>Terima kasih atas kunjungan Anda!</p>
                <p>Silakan datang kembali!</p>
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
                    <title>Struk Pembayaran</title>
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
        const email = prompt('Masukkan email pelanggan:');
        if (email && this.validateEmail(email)) {
            this.showMessage(`Struk dikirim ke ${email}`, 'success');
            this.closeModal();
        } else if (email) {
            this.showMessage('Email tidak valid!', 'error');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    generateTransactionId() {
        return 'TXN' + Date.now().toString().slice(-8);
    }

    calculateTotal() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * this.discountRate;
        const taxableAmount = subtotal - discount;
        const tax = taxableAmount * this.taxRate;
        return taxableAmount + tax;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getCurrentUser() {
        const session = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
        if (session) {
            const userData = JSON.parse(session);
            return userData.fullName || 'User';
        }
        return 'User';
    }

    getPaymentMethodText(method) {
        const methods = {
            'cash': 'Tunai',
            'card': 'Kartu',
            'qris': 'QRIS',
            'ewallet': 'E-Wallet',
            'split': 'Split Payment',
            'credit': 'Store Credit'
        };
        return methods[method] || method;
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

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.pos-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `pos-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// Initialize POS System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pos = new EnhancedPOS();
});
