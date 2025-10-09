class EnhancedPOSSystem {
  constructor() {
    this.cart = [];
    this.products = [];
    this.filteredProducts = [];
    this.taxRate = 0.1;
    this.currentPaymentMethod = null;
    this.discountRate = 0;

    this.init();
  }

  init() {
    this.loadProducts();
    this.setupEventListeners();
    this.renderProducts();
    this.updateCartDisplay();
    this.updateCheckoutButton();
  }

  loadProducts() {
    if (window.catalogPage && window.catalogPage.products) {
      this.products = window.catalogPage.products;
    } else {
      try {
        const raw = localStorage.getItem("catalogProducts");
        if (raw) {
          this.products = JSON.parse(raw);
        } else {
          this.products = this.getSampleProducts();
        }
      } catch (e) {
        this.products = this.getSampleProducts();
      }
    }

    this.filteredProducts = this.products.filter(
      (product) => product.stock > 0 && product.status === "Available"
    );
  }

  getSampleProducts() {
    return [
      {
        id: 1,
        name: "Kopi Arabika Premium",
        price: 35000,
        icon: "fas fa-coffee",
        description: "Kopi Arabika dengan cita rasa halus dan aroma khas.",
        stock: 50,
        status: "Available",
        tags: ["Minuman", "Arabika", "Premium"],
      },
      {
        id: 2,
        name: "Burger Keju Jumbo",
        price: 54000,
        icon: "fas fa-hamburger",
        description:
          "Burger jumbo dengan daging tebal, keju meleleh, dan sayuran segar.",
        stock: 30,
        status: "Available",
        tags: ["Makanan", "Burger", "Keju"],
      },
    ];
  }

  setupEventListeners() {
    const searchInput = document.getElementById("productSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) =>
        this.filterProducts(e.target.value)
      );
    }

    const clearCartBtn = document.getElementById("clearCart");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => this.clearCart());
    }

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => this.showPaymentModal());
    }

    const productGrid = document.getElementById("productGrid");
    if (productGrid) {
      productGrid.addEventListener("click", (e) => {
        const productCard = e.target.closest(".product-card");
        if (productCard) {
          const productId = parseInt(productCard.dataset.productId);
          this.addToCart(productId);
        }
      });
    }

    const cartItems = document.getElementById("cartItems");
    if (cartItems) {
      cartItems.addEventListener("click", (e) => {
        let target = e.target;
        if (target.tagName === 'I') {
          target = target.parentElement;
        }
        
        const cartItem = target.closest(".cart-item");
        if (!cartItem) return;

        const productId = parseInt(cartItem.dataset.productId);

        if (target.classList.contains("increase-qty")) {
          this.updateCartItemQuantity(productId, 1);
        } else if (target.classList.contains("decrease-qty")) {
          this.updateCartItemQuantity(productId, -1);
        } else if (target.classList.contains("remove-btn") || target.parentElement.classList.contains("remove-btn")) {
          this.removeFromCart(productId);
        }
      });
    }
  }

  renderProducts() {
    const productGrid = document.getElementById("productGrid");
    if (!productGrid) return;

    if (this.filteredProducts.length === 0) {
      productGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open"></i>
                    <p>Tidak ada produk tersedia</p>
                </div>
            `;
      return;
    }

    productGrid.innerHTML = this.filteredProducts
      .map(
        (product) => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${this.formatRupiah(
                      product.price
                    )}</p>
                    <p class="product-stock">Stok: ${product.stock}</p>
                </div>
                <div class="product-overlay">
                    <i class="fas fa-plus"></i>
                    <span>Tambah ke Keranjang</span>
                </div>
            </div>
        `
      )
      .join("");
  }

  filterProducts(searchTerm) {
    const term = searchTerm.toLowerCase();

    if (!term) {
      this.filteredProducts = this.products.filter(
        (product) => product.stock > 0 && product.status === "Available"
      );
    } else {
      this.filteredProducts = this.products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(term) ||
          (product.description &&
            product.description.toLowerCase().includes(term)) ||
          (product.tags &&
            product.tags.some((tag) => tag.toLowerCase().includes(term)));

        return (
          matchesSearch && product.stock > 0 && product.status === "Available"
        );
      });
    }

    this.renderProducts();
  }

  addToCart(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else {
        this.showNotification("Stok tidak mencukupi!", "warning");
        return;
      }
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        maxStock: product.stock,
      });
    }

    this.updateCartDisplay();
    this.updateCheckoutButton();
    this.showNotification(
      `${product.name} ditambahkan ke keranjang`,
      "success"
    );
  }

  updateCartItemQuantity(productId, change) {
    const cartItem = this.cart.find((item) => item.id === productId);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + change;

    if (newQuantity <= 0) {
      this.removeFromCart(productId);
    } else if (newQuantity <= cartItem.maxStock) {
      cartItem.quantity = newQuantity;
      this.updateCartDisplay();
      this.updateCheckoutButton();
    } else {
      this.showNotification("Stok tidak mencukupi!", "warning");
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.updateCartDisplay();
    this.updateCheckoutButton();
  }

  clearCart() {
    if (this.cart.length === 0) return;

    if (confirm("Yakin ingin mengosongkan keranjang?")) {
      this.cart = [];
      this.updateCartDisplay();
      this.updateCheckoutButton();
      this.showNotification("Keranjang berhasil dikosongkan", "info");
    }
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cartItems");
    if (!cartItemsContainer) return;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Keranjang kosong</p>
                </div>
            `;
    } else {
      cartItemsContainer.innerHTML = this.cart
        .map(
          (item) => `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-image">
                        ${
                          item.image
                            ? `<img src="${item.image}" alt="${item.name}" />`
                            : `<i class="fas fa-utensils"></i>`
                        }
                    </div>
                    <div class="cart-item-details">
                        <h5 class="cart-item-name">${item.name}</h5>
                        <p class="cart-item-price">${this.formatRupiah(
                          item.price
                        )}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease-qty" ${
                          item.quantity <= 1 ? "disabled" : ""
                        }>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-qty" ${
                          item.quantity >= item.maxStock ? "disabled" : ""
                        }>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">
                        ${this.formatRupiah(item.price * item.quantity)}
                    </div>
                    <button class="remove-btn" title="Hapus item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `
        )
        .join("");
    }

    this.updateCartSummary();
  }

  updateCartSummary() {
    const subtotal = this.calculateSubtotal();
    const discount = this.calculateDiscount(subtotal);
    const tax = this.calculateTax(subtotal - discount);
    const total = subtotal - discount + tax;

    document.getElementById("subtotal").textContent =
      this.formatRupiah(subtotal);
    document.getElementById("discount").textContent =
      this.formatRupiah(discount);
    document.getElementById("tax").textContent = this.formatRupiah(tax);
    document.getElementById("total").textContent = this.formatRupiah(total);
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

  updateCheckoutButton() {
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (!checkoutBtn) return;

    if (this.cart.length === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML =
        '<i class="fas fa-arrow-right"></i> Lanjut ke Pembayaran';
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = `<i class="fas fa-arrow-right"></i> Lanjut ke Pembayaran (${this.cart.length} item)`;
    }
  }

  showPaymentModal() {
    try {
      localStorage.setItem("posCurrentCart", JSON.stringify(this.cart));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
      this.showNotification(
        "Terjadi kesalahan saat menyimpan data keranjang",
        "error"
      );
      return;
    }

    window.location.href = "/pos/payment.html";
  }

  processTransaction() {
    const transactionId = "TRX-" + Date.now();
    const total =
      this.calculateSubtotal() -
      this.calculateDiscount(this.calculateSubtotal()) +
      this.calculateTax(
        this.calculateSubtotal() -
          this.calculateDiscount(this.calculateSubtotal())
      );

    const transaction = {
      id: transactionId,
      items: [...this.cart],
      subtotal: this.calculateSubtotal(),
      discount: this.calculateDiscount(this.calculateSubtotal()),
      tax: this.calculateTax(
        this.calculateSubtotal() -
          this.calculateDiscount(this.calculateSubtotal())
      ),
      total: total,
      timestamp: new Date().toISOString(),
      status: "completed",
    };

    this.cart = [];
    this.updateCartDisplay();
    this.updateCheckoutButton();

    this.showNotification(
      `Transaksi berhasil! ID: ${transactionId}`,
      "success"
    );
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
  setTimeout(() => {
    window.enhancedPOSSystem = new EnhancedPOSSystem();
  }, 100);
});
