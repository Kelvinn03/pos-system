class PaymentSystem {
  constructor() {
    this.currentPaymentMethod = null;
    this.cart = [];
    this.discountRate = 0;
    this.taxRate = 0.1;

    this.init();
  }

  init() {
    this.updateDateTime();

    this.loadCartFromLocalStorage();
    this.setupEventListeners();
    this.displayOrderSummary();
    setInterval(() => this.updateDateTime(), 1000);
  }

  loadCartFromLocalStorage() {
    try {
      const savedCart = localStorage.getItem("posCurrentCart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    } catch (e) {
      console.error("Error loading cart from localStorage", e);
      this.cart = [];
    }
  }

  updateDateTime() {
    const now = new Date();
    const dateTimeElement = document.getElementById("dateTime");
    if (dateTimeElement) {
      dateTimeElement.textContent = now.toLocaleString();
    }
  }

  setupEventListeners() {
    const paymentOptions = document.querySelectorAll(".payment-option");
    paymentOptions.forEach((option) => {
      option.addEventListener("click", () => {
        paymentOptions.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");

        const paymentInputSection = document.getElementById(
          "paymentInputSection"
        );
        const qrisSection = document.getElementById("qrisSection");

        if (paymentInputSection) {
          paymentInputSection.style.display =
            option.dataset.method === "cash" ? "block" : "none";
        }

        if (qrisSection) {
          qrisSection.style.display =
            option.dataset.method === "qris" ? "block" : "none";
        }

        const processPaymentBtn = document.getElementById("processPaymentBtn");
        if (processPaymentBtn) {
          processPaymentBtn.disabled = false;
          this.currentPaymentMethod = option.dataset.method;
        }
      });
    });

    const quickAmountButtons = document.querySelectorAll(
      ".quick-amounts button"
    );
    quickAmountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const paymentAmountInput = document.getElementById("paymentAmount");
        if (paymentAmountInput) {
          if (button.dataset.amount === "exact") {
            paymentAmountInput.value = this.calculateTotal();
          } else {
            paymentAmountInput.value = button.dataset.amount;
          }
        }
      });
    });

    const processPaymentBtn = document.getElementById("processPaymentBtn");
    if (processPaymentBtn) {
      processPaymentBtn.addEventListener("click", () => this.processPayment());
    }

    const backToPos = document.getElementById("backToPos");
    if (backToPos) {
      backToPos.addEventListener("click", () => {
        window.location.href = "/pos/pos.html";
      });
    }

    const closeModal = document.getElementById("closeModal");
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        const receiptModal = document.getElementById("receiptModal");
        if (receiptModal) {
          receiptModal.style.display = "none";
        }
      });
    }

    const printReceipt = document.getElementById("printReceipt");
    if (printReceipt) {
      printReceipt.addEventListener("click", () => {
        window.print();
      });
    }

    const emailReceipt = document.getElementById("emailReceipt");
    if (emailReceipt) {
      emailReceipt.addEventListener("click", () => {
        this.emailReceipt();
      });
    }
    
    // QRIS modal handlers
    const closeQrisModal = document.getElementById("closeQrisModal");
    if (closeQrisModal) {
      closeQrisModal.addEventListener("click", () => {
        const qrisModal = document.getElementById("qrisModal");
        if (qrisModal) {
          qrisModal.style.display = "none";
        }
      });
    }
    
    const qrisConfirmBtn = document.getElementById("qrisConfirmBtn");
    if (qrisConfirmBtn) {
      qrisConfirmBtn.addEventListener("click", () => {
        window.location.href = "/pos/payment-success.html";
      });
    }
  }

  displayOrderSummary() {
    const orderItemsList = document.getElementById("orderItemsList");
    if (orderItemsList) {
      if (this.cart.length === 0) {
        orderItemsList.innerHTML =
          '<p class="empty-message">Tidak ada item</p>';
      } else {
        orderItemsList.innerHTML = this.cart
          .map(
            (item) => `
                    <div class="order-item">
                        <div class="order-item-details">
                            <span class="order-item-name">${item.name}</span>
                            <span class="order-item-quantity">x ${
                              item.quantity
                            }</span>
                        </div>
                        <span class="order-item-price">${this.formatRupiah(
                          item.price * item.quantity
                        )}</span>
                    </div>
                `
          )
          .join("");
      }
    }

    const paymentDetails = document.getElementById("paymentDetails");
    if (paymentDetails) {
      const subtotal = this.calculateSubtotal();
      const discount = this.calculateDiscount(subtotal);
      const tax = this.calculateTax(subtotal - discount);
      const total = subtotal - discount + tax;

      paymentDetails.innerHTML = `
                <div class="summary-item">
                    <span>Jumlah Item:</span>
                    <span>${this.cart.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )} item</span>
                </div>
                <div class="summary-item">
                    <span>Subtotal:</span>
                    <span>${this.formatRupiah(subtotal)}</span>
                </div>
                <div class="summary-item">
                    <span>Diskon:</span>
                    <span>${this.formatRupiah(discount)}</span>
                </div>
                <div class="summary-item">
                    <span>Pajak (10%):</span>
                    <span>${this.formatRupiah(tax)}</span>
                </div>
                <div class="summary-item total">
                    <span>Total:</span>
                    <span>${this.formatRupiah(total)}</span>
                </div>
            `;
    }
  }

  calculateSubtotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  calculateDiscount(subtotal) {
    return subtotal * this.discountRate;
  }

  calculateTax(taxableAmount) {
    return taxableAmount * this.taxRate;
  }

  calculateTotal() {
    const subtotal = this.calculateSubtotal();
    const discount = this.calculateDiscount(subtotal);
    const tax = this.calculateTax(subtotal - discount);
    return subtotal - discount + tax;
  }

  processPayment() {
    if (!this.currentPaymentMethod) {
      this.showNotification(
        "Pilih metode pembayaran terlebih dahulu",
        "warning"
      );
      return;
    }

    if (this.currentPaymentMethod === "cash") {
      const paymentAmountInput = document.getElementById("paymentAmount");
      if (!paymentAmountInput || !paymentAmountInput.value) {
        this.showNotification("Masukkan jumlah pembayaran", "warning");
        return;
      }

      const paymentAmount = parseFloat(paymentAmountInput.value);
      const total = this.calculateTotal();

      if (paymentAmount < total) {
        this.showNotification("Jumlah pembayaran kurang dari total", "warning");
        return;
      }
    }

    const transactionId = "TRX-" + Date.now();
    const subtotal = this.calculateSubtotal();
    const discount = this.calculateDiscount(subtotal);
    const tax = this.calculateTax(subtotal - discount);
    const total = subtotal - discount + tax;

    const transaction = {
      id: transactionId,
      items: [...this.cart],
      subtotal: subtotal,
      discount: discount,
      tax: tax,
      total: total,
      paymentMethod: this.currentPaymentMethod,
      timestamp: new Date().toISOString(),
      status: "completed",
    };

    try {
      let transactions = [];
      const savedTransactions = localStorage.getItem("posTransactions");

      if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
      }

      transactions.push(transaction);
      localStorage.setItem("posTransactions", JSON.stringify(transactions));
      localStorage.removeItem("posCurrentCart");
    } catch (e) {
      console.error("Error saving transaction", e);
    }

    // Generate the receipt HTML and save it to localStorage
    const receiptHTML = this.generateReceiptHTML(transaction);
    localStorage.setItem("posLastReceipt", receiptHTML);

    // Handle different payment methods
    if (this.currentPaymentMethod === "qris") {
      // Show QRIS modal for QRIS payment
      document.getElementById("qrisModal").style.display = "block";
    } else {
      // Direct redirect for other payment methods
      window.location.href = "/pos/payment-success.html";
    }
  }

  generateReceiptHTML(transaction) {
    let changeAmount = 0;
    if (transaction.paymentMethod === "cash") {
      const paymentAmountInput = document.getElementById("paymentAmount");
      if (paymentAmountInput && paymentAmountInput.value) {
        const paymentAmount = parseFloat(paymentAmountInput.value);
        changeAmount = paymentAmount - transaction.total;
      }
    }

    const transactionDate = new Date(transaction.timestamp);
    const formattedDate = transactionDate.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = transactionDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `
      <div class="receipt-header">
          <h3>POS System</h3>
          <p>Jl. Contoh No. 123, Kota Contoh</p>
          <p>Telp: (021) 1234-5678</p>
      </div>
      
      <div class="receipt-info">
          <p><strong>No. Transaksi:</strong> ${transaction.id}</p>
          <p><strong>Tanggal:</strong> ${formattedDate}</p>
          <p><strong>Waktu:</strong> ${formattedTime}</p>
          <p><strong>Kasir:</strong> ${
            localStorage.getItem("posUserName") || "Admin"
          }</p>
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-items">
          ${transaction.items
            .map(
              (item) => `
              <div class="receipt-item">
                  <div class="item-details">
                      <span>${item.name} x ${item.quantity}</span>
                      <span>${this.formatRupiah(
                        item.price * item.quantity
                      )}</span>
                  </div>
                  <div class="item-price-single">
                      <span>@${this.formatRupiah(item.price)}</span>
                  </div>
              </div>
          `
            )
            .join("")}
      </div>
      
      <div class="receipt-divider"></div>
      
      <div class="receipt-summary">
          <div class="summary-row">
              <span>Subtotal:</span>
              <span>${this.formatRupiah(transaction.subtotal)}</span>
          </div>
          
          <div class="summary-row">
              <span>Diskon:</span>
              <span>${this.formatRupiah(transaction.discount)}</span>
          </div>
          
          <div class="summary-row">
              <span>Pajak (10%):</span>
              <span>${this.formatRupiah(transaction.tax)}</span>
          </div>
          
          <div class="summary-row total">
              <span>Total:</span>
              <span>${this.formatRupiah(transaction.total)}</span>
          </div>
          
          <div class="payment-info">
              <div class="payment-row">
                  <span>Metode Pembayaran:</span>
                  <span>${this.getPaymentMethodName(
                    transaction.paymentMethod
                  )}</span>
              </div>
              
              ${
                transaction.paymentMethod === "cash"
                  ? `
                  <div class="payment-row">
                      <span>Tunai:</span>
                      <span>${this.formatRupiah(
                        parseFloat(
                          document.getElementById("paymentAmount").value
                        )
                      )}</span>
                  </div>
                  
                  <div class="payment-row">
                      <span>Kembalian:</span>
                      <span>${this.formatRupiah(changeAmount)}</span>
                  </div>
              `
                  : ""
              }
          </div>
      </div>
      
      <div class="receipt-footer">
          <p>Terima kasih atas kunjungan Anda</p>
          <p>Barang yang sudah dibeli tidak dapat dikembalikan</p>
      </div>
    `;
  }

  showReceipt(transaction) {
    const receiptModal = document.getElementById("receiptModal");
    const receiptContent = document.getElementById("receiptContent");

    if (!receiptModal || !receiptContent) return;

    receiptContent.innerHTML = this.generateReceiptHTML(transaction);
    receiptModal.style.display = "flex";
  }

  showReceipt(transaction) {
    const receiptModal = document.getElementById("receiptModal");
    const receiptContent = document.getElementById("receiptContent");

    if (!receiptModal || !receiptContent) return;

    let changeAmount = 0;
    if (transaction.paymentMethod === "cash") {
      const paymentAmountInput = document.getElementById("paymentAmount");
      if (paymentAmountInput && paymentAmountInput.value) {
        const paymentAmount = parseFloat(paymentAmountInput.value);
        changeAmount = paymentAmount - transaction.total;
      }
    }

    const transactionDate = new Date(transaction.timestamp);
    const formattedDate = transactionDate.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = transactionDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    receiptContent.innerHTML = `
            <div class="receipt-header">
                <h3>POS System</h3>
                <p>Jl. Contoh No. 123, Kota Contoh</p>
                <p>Telp: (021) 1234-5678</p>
            </div>
            
            <div class="receipt-info">
                <p><strong>No. Transaksi:</strong> ${transaction.id}</p>
                <p><strong>Tanggal:</strong> ${formattedDate}</p>
                <p><strong>Waktu:</strong> ${formattedTime}</p>
                <p><strong>Kasir:</strong> ${
                  localStorage.getItem("posUserName") || "Admin"
                }</p>
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-items">
                ${transaction.items
                  .map(
                    (item) => `
                    <div class="receipt-item">
                        <div class="item-details">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>${this.formatRupiah(
                              item.price * item.quantity
                            )}</span>
                        </div>
                        <div class="item-price-single">
                            <span>@${this.formatRupiah(item.price)}</span>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="receipt-divider"></div>
            
            <div class="receipt-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>${this.formatRupiah(transaction.subtotal)}</span>
                </div>
                
                <div class="summary-row">
                    <span>Diskon:</span>
                    <span>${this.formatRupiah(transaction.discount)}</span>
                </div>
                
                <div class="summary-row">
                    <span>Pajak (10%):</span>
                    <span>${this.formatRupiah(transaction.tax)}</span>
                </div>
                
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${this.formatRupiah(transaction.total)}</span>
                </div>
                
                <div class="payment-info">
                    <div class="payment-row">
                        <span>Metode Pembayaran:</span>
                        <span>${this.getPaymentMethodName(
                          transaction.paymentMethod
                        )}</span>
                    </div>
                    
                    ${
                      transaction.paymentMethod === "cash"
                        ? `
                        <div class="payment-row">
                            <span>Tunai:</span>
                            <span>${this.formatRupiah(
                              parseFloat(
                                document.getElementById("paymentAmount").value
                              )
                            )}</span>
                        </div>
                        
                        <div class="payment-row">
                            <span>Kembalian:</span>
                            <span>${this.formatRupiah(changeAmount)}</span>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
            
            <div class="receipt-footer">
                <p>Terima kasih atas kunjungan Anda</p>
                <p>Barang yang sudah dibeli tidak dapat dikembalikan</p>
            </div>
        `;

    receiptModal.style.display = "flex";
  }

  getPaymentMethodName(method) {
    const methods = {
      cash: "Tunai",
      card: "Kartu Kredit/Debit",
      qris: "QRIS",
      ewallet: "E-Wallet",
      split: "Split Payment",
      credit: "Store Credit",
    };

    return methods[method] || method;
  }

  emailReceipt() {
    this.showNotification("Email struk telah dikirim", "success");
  }

  formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "warning"
                ? "exclamation-triangle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.paymentSystem = new PaymentSystem();
});
