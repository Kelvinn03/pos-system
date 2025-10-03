// Enhanced Refund System JavaScript
class RefundSystem {
    constructor() {
        this.selectedTransaction = null;
        this.refundItems = [];
        this.refundTotal = 0;
        
        this.init();
    }

    init() {
        this.loadUserInfo();
        this.updateDateTime();
        this.setupEventListeners();
        this.loadRecentRefunds();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
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
        // Transaction search
        const searchTransactionBtn = document.getElementById('searchTransactionBtn');
        if (searchTransactionBtn) {
            searchTransactionBtn.addEventListener('click', () => this.searchTransaction());
        }

        // Search input enter key
        const transactionSearch = document.getElementById('transactionSearch');
        if (transactionSearch) {
            transactionSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchTransaction();
                }
            });
        }

        // Process refund button
        const processRefundBtn = document.getElementById('processRefundBtn');
        if (processRefundBtn) {
            processRefundBtn.addEventListener('click', () => this.showRefundConfirmation());
        }

        // Cancel refund button
        const cancelRefundBtn = document.getElementById('cancelRefundBtn');
        if (cancelRefundBtn) {
            cancelRefundBtn.addEventListener('click', () => this.cancelRefund());
        }

        // Refund confirmation modal controls
        const closeConfirmModal = document.getElementById('closeConfirmModal');
        if (closeConfirmModal) {
            closeConfirmModal.addEventListener('click', () => this.closeConfirmModal());
        }

        const confirmRefundBtn = document.getElementById('confirmRefundBtn');
        if (confirmRefundBtn) {
            confirmRefundBtn.addEventListener('click', () => this.processRefund());
        }

        const cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
        if (cancelConfirmBtn) {
            cancelConfirmBtn.addEventListener('click', () => this.closeConfirmModal());
        }

        // Refund receipt modal controls
        const closeRefundReceiptModal = document.getElementById('closeRefundReceiptModal');
        if (closeRefundReceiptModal) {
            closeRefundReceiptModal.addEventListener('click', () => this.closeRefundReceiptModal());
        }

        const printRefundBtn = document.getElementById('printRefundReceipt');
        if (printRefundBtn) {
            printRefundBtn.addEventListener('click', () => this.printRefundReceipt());
        }

        const emailRefundBtn = document.getElementById('emailRefundReceipt');
        if (emailRefundBtn) {
            emailRefundBtn.addEventListener('click', () => this.emailRefundReceipt());
        }

        // Close modals when clicking outside
        const refundConfirmModal = document.getElementById('refundConfirmModal');
        if (refundConfirmModal) {
            refundConfirmModal.addEventListener('click', (e) => {
                if (e.target === refundConfirmModal) {
                    this.closeConfirmModal();
                }
            });
        }

        const refundReceiptModal = document.getElementById('refundReceiptModal');
        if (refundReceiptModal) {
            refundReceiptModal.addEventListener('click', (e) => {
                if (e.target === refundReceiptModal) {
                    this.closeRefundReceiptModal();
                }
            });
        }
    }

    searchTransaction() {
        const searchTerm = document.getElementById('transactionSearch').value.trim();
        if (!searchTerm) {
            this.showMessage('Silakan masukkan ID transaksi atau nama pelanggan', 'error');
            return;
        }

        const transactions = JSON.parse(localStorage.getItem('posTransactions') || '[]');
        const results = transactions.filter(t => 
            t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (t.customerName && t.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        this.displayTransactionResults(results);
    }

    displayTransactionResults(results) {
        const refundResults = document.getElementById('refundResults');
        if (!refundResults) return;

        if (results.length === 0) {
            refundResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h4>Tidak ada transaksi ditemukan</h4>
                    <p>Coba gunakan kata kunci yang berbeda</p>
                </div>
            `;
            return;
        }

        refundResults.innerHTML = `
            <h4>Hasil Pencarian (${results.length} transaksi)</h4>
            <div class="transaction-results-grid">
                ${results.map(transaction => `
                    <div class="transaction-result-card" data-transaction-id="${transaction.id}">
                        <div class="transaction-result-header">
                            <h5>${transaction.id}</h5>
                            <span class="transaction-status ${transaction.status}">${transaction.status}</span>
                        </div>
                        <div class="transaction-result-body">
                            <p><i class="fas fa-calendar"></i> ${this.formatDate(transaction.date)}</p>
                            <p><i class="fas fa-shopping-cart"></i> ${transaction.items.length} item(s)</p>
                            <p><i class="fas fa-money-bill-wave"></i> ${this.formatCurrency(transaction.total)}</p>
                            <p><i class="fas fa-credit-card"></i> ${this.getPaymentMethodText(transaction.paymentMethod)}</p>
                        </div>
                        <div class="transaction-result-footer">
                            <button class="select-transaction-btn" onclick="refundSystem.selectTransaction('${transaction.id}')">
                                <i class="fas fa-check"></i> Pilih Transaksi
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    selectTransaction(transactionId) {
        const transactions = JSON.parse(localStorage.getItem('posTransactions') || '[]');
        this.selectedTransaction = transactions.find(t => t.id === transactionId);
        
        if (this.selectedTransaction) {
            // Check if transaction has already been refunded
            const refunds = JSON.parse(localStorage.getItem('posRefunds') || '[]');
            const existingRefund = refunds.find(r => r.originalTransactionId === transactionId);
            
            if (existingRefund) {
                this.showMessage('Transaksi ini sudah pernah di-refund', 'warning');
                return;
            }

            this.displayRefundItems();
            this.showMessage('Transaksi dipilih. Pilih item yang akan di-refund.', 'success');
        }
    }

    displayRefundItems() {
        const refundItems = document.getElementById('refundItems');
        const refundItemsList = document.getElementById('refundItemsList');
        
        if (!refundItems || !refundItemsList || !this.selectedTransaction) return;

        refundItems.style.display = 'block';
        
        refundItemsList.innerHTML = `
            <div class="selected-transaction-info">
                <h4>Transaksi: ${this.selectedTransaction.id}</h4>
                <p>Tanggal: ${this.formatDate(this.selectedTransaction.date)}</p>
                <p>Total Asli: ${this.formatCurrency(this.selectedTransaction.total)}</p>
            </div>
            <div class="refund-items-grid">
                ${this.selectedTransaction.items.map(item => `
                    <div class="refund-item-card">
                        <div class="refund-item-info">
                            <h5>${item.name}</h5>
                            <p class="item-details">${this.formatCurrency(item.price)} x ${item.quantity} = ${this.formatCurrency(item.price * item.quantity)}</p>
                            <p class="item-category">${item.category}</p>
                        </div>
                        <div class="refund-item-controls">
                            <div class="refund-checkbox-container">
                                <label class="refund-checkbox-label">
                                    <input type="checkbox" class="refund-checkbox" data-item-id="${item.id}" data-item-price="${item.price * item.quantity}">
                                    <span class="checkmark"></span>
                                    Pilih untuk refund
                                </label>
                            </div>
                            <div class="refund-reason-container">
                                <label>Alasan Refund:</label>
                                <select class="refund-reason" data-item-id="${item.id}">
                                    <option value="customer-request">Permintaan Pelanggan</option>
                                    <option value="damaged">Barang Rusak</option>
                                    <option value="defective">Barang Cacat</option>
                                    <option value="wrong-item">Barang Salah</option>
                                    <option value="expired">Barang Kedaluwarsa</option>
                                    <option value="other">Lainnya</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listeners for refund checkboxes
        document.querySelectorAll('.refund-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateRefundSummary());
        });

        // Scroll to refund items section
        refundItems.scrollIntoView({ behavior: 'smooth' });
    }

    updateRefundSummary() {
        const checkedItems = document.querySelectorAll('.refund-checkbox:checked');
        const processRefundBtn = document.getElementById('processRefundBtn');
        const refundSummary = document.getElementById('refundSummary');
        const refundSummaryContent = document.getElementById('refundSummaryContent');
        
        if (checkedItems.length === 0) {
            if (processRefundBtn) processRefundBtn.disabled = true;
            if (refundSummary) refundSummary.style.display = 'none';
            this.refundTotal = 0;
            return;
        }

        // Calculate refund total
        this.refundTotal = Array.from(checkedItems).reduce((total, checkbox) => {
            return total + parseFloat(checkbox.dataset.itemPrice);
        }, 0);

        // Show summary
        if (refundSummary && refundSummaryContent) {
            refundSummary.style.display = 'block';
            refundSummaryContent.innerHTML = `
                <div class="refund-summary-item">
                    <span>Jumlah Item:</span>
                    <span>${checkedItems.length} item(s)</span>
                </div>
                <div class="refund-summary-item">
                    <span>Total Refund:</span>
                    <span class="refund-total">${this.formatCurrency(this.refundTotal)}</span>
                </div>
            `;
        }

        if (processRefundBtn) processRefundBtn.disabled = false;
    }

    showRefundConfirmation() {
        const checkedItems = document.querySelectorAll('.refund-checkbox:checked');
        if (checkedItems.length === 0) return;

        const refundItems = Array.from(checkedItems).map(checkbox => {
            const itemId = parseInt(checkbox.dataset.itemId);
            const reason = document.querySelector(`[data-item-id="${itemId}"].refund-reason`).value;
            const originalItem = this.selectedTransaction.items.find(item => item.id === itemId);
            
            return {
                ...originalItem,
                reason: reason,
                refundAmount: originalItem.price * originalItem.quantity
            };
        });

        const modal = document.getElementById('refundConfirmModal');
        const content = document.getElementById('refundConfirmContent');
        
        if (!modal || !content) return;

        content.innerHTML = `
            <div class="refund-confirmation-details">
                <div class="confirmation-section">
                    <h4>Detail Transaksi Asli</h4>
                    <p><strong>ID Transaksi:</strong> ${this.selectedTransaction.id}</p>
                    <p><strong>Tanggal:</strong> ${this.formatDate(this.selectedTransaction.date)}</p>
                    <p><strong>Total Asli:</strong> ${this.formatCurrency(this.selectedTransaction.total)}</p>
                </div>
                
                <div class="confirmation-section">
                    <h4>Item yang akan di-refund</h4>
                    <div class="refund-items-confirmation">
                        ${refundItems.map(item => `
                            <div class="refund-item-confirmation">
                                <div class="item-info">
                                    <span class="item-name">${item.name}</span>
                                    <span class="item-amount">${this.formatCurrency(item.refundAmount)}</span>
                                </div>
                                <div class="item-reason">
                                    <small>Alasan: ${this.getRefundReasonText(item.reason)}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="confirmation-section refund-total-section">
                    <h4>Total Refund: ${this.formatCurrency(this.refundTotal)}</h4>
                </div>
                
                <div class="confirmation-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Pastikan semua informasi sudah benar. Refund yang sudah diproses tidak dapat dibatalkan.</p>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    processRefund() {
        const checkedItems = document.querySelectorAll('.refund-checkbox:checked');
        if (checkedItems.length === 0) return;

        // Show processing state
        const confirmBtn = document.getElementById('confirmRefundBtn');
        const originalText = confirmBtn.innerHTML;
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        confirmBtn.disabled = true;

        // Simulate processing delay
        setTimeout(() => {
            this.completeRefund();
            confirmBtn.innerHTML = originalText;
            confirmBtn.disabled = false;
        }, 2000);
    }

    completeRefund() {
        const checkedItems = document.querySelectorAll('.refund-checkbox:checked');
        
        const refundItems = Array.from(checkedItems).map(checkbox => {
            const itemId = parseInt(checkbox.dataset.itemId);
            const reason = document.querySelector(`[data-item-id="${itemId}"].refund-reason`).value;
            const originalItem = this.selectedTransaction.items.find(item => item.id === itemId);
            
            return {
                ...originalItem,
                reason: reason,
                refundAmount: originalItem.price * originalItem.quantity
            };
        });

        // Create refund record
        const refund = {
            id: this.generateRefundId(),
            originalTransactionId: this.selectedTransaction.id,
            date: new Date().toISOString(),
            items: refundItems,
            total: this.refundTotal,
            status: 'completed',
            processedBy: this.getCurrentUser(),
            customerName: this.selectedTransaction.customerName || 'Walk-in Customer'
        };

        // Save refund
        const refunds = JSON.parse(localStorage.getItem('posRefunds') || '[]');
        refunds.push(refund);
        localStorage.setItem('posRefunds', JSON.stringify(refunds));

        // Update product stock (add back to inventory)
        this.updateProductStock(refundItems);

        // Close confirmation modal
        this.closeConfirmModal();

        // Show refund receipt
        this.showRefundReceipt(refund);

        // Clear refund form
        this.clearRefundForm();

        // Reload recent refunds
        this.loadRecentRefunds();

        this.showMessage('Refund berhasil diproses!', 'success');
    }

    updateProductStock(refundItems) {
        const products = JSON.parse(localStorage.getItem('posProducts') || '[]');
        
        refundItems.forEach(refundItem => {
            const product = products.find(p => p.id === refundItem.id);
            if (product) {
                product.stock += refundItem.quantity;
            }
        });
        
        localStorage.setItem('posProducts', JSON.stringify(products));
    }

    showRefundReceipt(refund) {
        const modal = document.getElementById('refundReceiptModal');
        const content = document.getElementById('refundReceiptContent');
        
        if (!modal || !content) return;

        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h3>POS SYSTEM - REFUND</h3>
                <p>123 Business Street<br>Jakarta, Indonesia 12345</p>
                <p>Telp: (021) 123-4567</p>
            </div>
            
            <div style="border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; padding: 15px 0; margin: 15px 0;">
                <p><strong>ID Refund:</strong> ${refund.id}</p>
                <p><strong>ID Transaksi Asli:</strong> ${refund.originalTransactionId}</p>
                <p><strong>Tanggal Refund:</strong> ${this.formatDate(refund.date)}</p>
                <p><strong>Kasir:</strong> ${refund.processedBy}</p>
                <p><strong>Pelanggan:</strong> ${refund.customerName}</p>
            </div>
            
            <div style="margin: 15px 0;">
                <h4>Item yang di-refund:</h4>
                ${refund.items.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding: 5px 0; border-bottom: 1px dotted #ddd;">
                        <div>
                            <div style="font-weight: bold;">${item.name}</div>
                            <div style="font-size: 0.9em; color: #666;">${item.quantity} x ${this.formatCurrency(item.price)}</div>
                            <div style="font-size: 0.8em; color: #888; font-style: italic;">Alasan: ${this.getRefundReasonText(item.reason)}</div>
                        </div>
                        <span style="font-weight: bold;">${this.formatCurrency(item.refundAmount)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="border-top: 1px dashed #ccc; padding-top: 15px;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1em;">
                    <span>TOTAL REFUND:</span>
                    <span>${this.formatCurrency(refund.total)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ccc;">
                <p>Refund telah diproses</p>
                <p>Simpan struk ini sebagai bukti</p>
            </div>
        `;

        modal.style.display = 'block';
    }

    loadRecentRefunds() {
        const refunds = JSON.parse(localStorage.getItem('posRefunds') || '[]');
        const recentRefunds = refunds.slice(-5).reverse(); // Show 5 most recent
        
        const recentRefundsList = document.getElementById('recentRefundsList');
        if (!recentRefundsList) return;

        if (recentRefunds.length === 0) {
            recentRefundsList.innerHTML = `
                <div class="no-recent-refunds">
                    <i class="fas fa-clipboard-list"></i>
                    <p>Belum ada refund yang diproses</p>
                </div>
            `;
            return;
        }

        recentRefundsList.innerHTML = recentRefunds.map(refund => `
            <div class="recent-refund-card">
                <div class="refund-card-header">
                    <h5>${refund.id}</h5>
                    <span class="refund-amount">${this.formatCurrency(refund.total)}</span>
                </div>
                <div class="refund-card-body">
                    <p><i class="fas fa-receipt"></i> Transaksi: ${refund.originalTransactionId}</p>
                    <p><i class="fas fa-calendar"></i> ${this.formatDate(refund.date)}</p>
                    <p><i class="fas fa-shopping-cart"></i> ${refund.items.length} item(s)</p>
                    <p><i class="fas fa-user"></i> ${refund.customerName}</p>
                </div>
                <div class="refund-card-footer">
                    <button class="view-refund-btn" onclick="refundSystem.viewRefundDetails('${refund.id}')">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
            </div>
        `).join('');
    }

    viewRefundDetails(refundId) {
        const refunds = JSON.parse(localStorage.getItem('posRefunds') || '[]');
        const refund = refunds.find(r => r.id === refundId);
        
        if (refund) {
            this.showRefundReceipt(refund);
        }
    }

    cancelRefund() {
        if (confirm('Apakah Anda yakin ingin membatalkan proses refund ini?')) {
            this.clearRefundForm();
        }
    }

    clearRefundForm() {
        document.getElementById('transactionSearch').value = '';
        document.getElementById('refundResults').innerHTML = '';
        document.getElementById('refundItems').style.display = 'none';
        this.selectedTransaction = null;
        this.refundTotal = 0;
    }

    closeConfirmModal() {
        const modal = document.getElementById('refundConfirmModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    closeRefundReceiptModal() {
        const modal = document.getElementById('refundReceiptModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    printRefundReceipt() {
        const receiptContent = document.getElementById('refundReceiptContent');
        if (!receiptContent) return;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Struk Refund</title>
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

    emailRefundReceipt() {
        const email = prompt('Masukkan email pelanggan:');
        if (email && this.validateEmail(email)) {
            this.showMessage(`Struk refund dikirim ke ${email}`, 'success');
            this.closeRefundReceiptModal();
        } else if (email) {
            this.showMessage('Email tidak valid!', 'error');
        }
    }

    generateRefundId() {
        return 'REF' + Date.now().toString().slice(-8);
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

    getRefundReasonText(reason) {
        const reasons = {
            'customer-request': 'Permintaan Pelanggan',
            'damaged': 'Barang Rusak',
            'defective': 'Barang Cacat',
            'wrong-item': 'Barang Salah',
            'expired': 'Barang Kedaluwarsa',
            'other': 'Lainnya'
        };
        return reasons[reason] || reason;
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

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.refund-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `refund-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'warning' : 'exclamation-circle'}"></i>
            ${message}
        `;

        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 4000);
    }
}

// Initialize Refund System when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.refundSystem = new RefundSystem();
});