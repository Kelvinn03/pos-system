class CatalogPage {
  constructor() {
    this.products = [
      {
        id: 1,
        name: "Kopi Arabika Premium",
        price: 35000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MrK3iDDWL7FdEI8cN5vcjplUrdV-W7eFIg&s",
        description:
          "Kopi Arabika dengan cita rasa halus dan aroma khas. Cocok untuk pecinta kopi yang menginginkan kualitas premium.",
        tags: ["Minuman", "Arabika", "Premium"],
      },
      {
        id: 2,
        name: "Burger Keju Jumbo",
        price: 54000,
        image: "https://barburger.id/wp-content/uploads/2020/11/rsz_web_resep-burger-jumbo-enak-ala-barburger.jpg",
        description:
          "Burger jumbo dengan daging tebal, keju meleleh, dan sayuran segar. Nikmat untuk makan siang atau malam.",
        tags: ["Makanan", "Burger", "Keju"],
      },
      {
        id: 3,
        name: "Pizza Pepperoni Classic",
        price: 89000,
        image: "https://www.cobsbread.com/us/wp-content//uploads/2022/09/Pepperoni-pizza-850x630-1-650x480.png",
        description:
          "Pizza klasik dengan topping pepperoni dan keju mozzarella. Adonan tipis renyah dan saus tomat autentik.",
        tags: ["Makanan", "Pizza", "Pepperoni"],
      },
      {
        id: 4,
        name: "Es Krim Matcha",
        price: 28000,
        image: "https://www.justonecookbook.com/wp-content/uploads/2021/08/Green-Tea-Ice-Cream-0120-II-760x1140.jpg",
        description:
          "Es krim matcha lembut dengan rasa teh hijau yang menyegarkan. Cocok sebagai pencuci mulut.",
        tags: ["Dessert", "Matcha", "Es Krim"],
      },
      {
        id: 5,
        name: "Cookies Choco Chip",
        price: 22000,
        image: "https://asset.kompas.com/crops/VnqoA6qVt8W13t9l8ffMTPchAmY=/10x7:1000x667/1200x800/data/photo/2020/10/12/5f840dcab3c2b.jpg",
        description:
          "Cookies choco chip renyah dengan banyak potongan cokelat. Pas untuk teman minum teh atau kopi.",
        tags: ["Snack", "Cookies", "Cokelat"],
      },
      {
        id: 6,
        name: "Teh Lemon Madu",
        price: 18000,
        image: "https://asset.kompas.com/crops/hvC6pC6ykiaGT5SGWKO0LpbRacA=/101x66:899x599/1200x800/data/photo/2022/09/29/633577195127d.jpg",
        description:
          "Minuman teh lemon dengan madu alami, menyegarkan dan baik untuk tenggorokan.",
        tags: ["Minuman", "Teh", "Madu"],
      },
      {
        id: 7,
        name: "Nasi Goreng Spesial",
        price: 32000,
        image: "https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg",
        description: "Nasi goreng dengan topping ayam, telur, dan kerupuk.",
        tags: ["Makanan", "Nasi", "Ayam"],
      },
      {
        id: 8,
        name: "Sushi Salmon",
        price: 75000,
        image: "https://www.kikkoman.eu/fileadmin/_processed_/2/9/csm_942-recipe-page-smoked-salmon-and-avocado-roll_desktop_dba1a3c8d9.webp",
        description: "Sushi isi salmon segar dengan nasi pulen dan nori.",
        tags: ["Makanan", "Sushi", "Ikan"],
      },
      {
        id: 9,
        name: "Ramen Pedas",
        price: 56000,
        image: "https://asset.kompas.com/crops/2jVzsRlqOnYL325vIBgbVq8JFSU=/81x43:907x594/1200x800/data/photo/2023/02/06/63e03736f1845.jpeg",
        description: "Mi ramen kuah pedas dengan irisan daging dan telur.",
        tags: ["Makanan", "Ramen", "Pedas"],
      },
      {
        id: 10,
        name: "Ayam Goreng Crispy",
        price: 45000,
        image: "https://asset.kompas.com/crops/pbx_yXJty_AXSF_LLbyppjE8A1k=/72x15:952x601/1200x800/data/photo/2022/08/01/62e73d60a9595.jpg",
        description: "Ayam goreng renyah dengan bumbu khas, cocok untuk makan siang.",
        tags: ["Makanan", "Ayam", "Goreng"],
      },
      {
        id: 11,
        name: "Sate Ayam Kacang",
        price: 38000,
        image: "https://cdn.grid.id/crop/0x0:0x0/700x465/photo/2018/12/31/3758182134.jpg",
        description: "Sate ayam dengan bumbu kacang gurih dan lontong.",
        tags: ["Makanan", "Sate", "Kacang"],
      },
      {
        id: 12,
        name: "Jus Alpukat",
        price: 24000,
        image: "https://cdn.rri.co.id/berita/Sintang/o/1748540345251-t/epflbie5452jx8u.jpeg",
        description: "Jus alpukat kental dengan sedikit cokelat dan susu.",
        tags: ["Minuman", "Jus", "Alpukat"],
      },
      {
        id: 13,
        name: "Smoothie Berry",
        price: 26000,
        image: "https://wholefoodsoulfoodkitchen.com/wp-content/uploads/2022/07/frozen-berry-smoothie-2-2-720x900.jpg",
        description: "Smoothie campuran stroberi, blueberry, dan yoghurt.",
        tags: ["Minuman", "Smoothie", "Buah"],
      },
      {
        id: 14,
        name: "Croissant Mentega",
        price: 21000,
        image: "https://www.cookwithkushi.com/wp-content/uploads/2021/09/IMG_0243l-720x874.jpg",
        description: "Pastry croissant lembut dengan aroma mentega.",
        tags: ["Snack", "Pastry", "Mentega"],
      },
      {
        id: 15,
        name: "Tiramisu",
        price: 48000,
        image: "https://www.reluctantgourmet.com/wp-content/uploads/2012/07/classic-tiramisu-r-720x720.jpg",
        description: "Dessert tiramisu dengan lapisan mascarpone dan kopi.",
        tags: ["Dessert", "Kopi", "Kue"],
      },
      {
        id: 16,
        name: "Brownies Cokelat",
        price: 26000,
        image: "https://image.idntimes.com/post/20220208/whatsapp-image-2022-02-09-at-033059-66934c0cbeade5e56b2fec27e2f98983-c5b3167d3e38290284c9958c7eebd5db.jpeg?tr=w-750,f-webp,q-75&width=750&format=webp&quality=75",
        description: "Brownies cokelat fudgy dengan topping kacang.",
        tags: ["Dessert", "Cokelat", "Kue"],
      },
      {
        id: 17,
        name: "Pasta Carbonara",
        price: 62000,
        image: "https://akcdn.detik.net.id/visual/2021/12/13/spaghetti_169.jpeg?w=750&q=90",
        description: "Spaghetti carbonara creamy dengan daging asap dan keju.",
        tags: ["Makanan", "Pasta", "Keju"],
      },
      {
        id: 18,
        name: "Steak Daging Sapi",
        price: 125000,
        image: "https://image.idntimes.com/post/20250607/1000050611.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75",
        description: "Steak sapi juicy dengan saus lada hitam dan kentang.",
        tags: ["Makanan", "Steak", "Sapi"],
      },
      {
        id: 19,
        name: "Sandwich Tuna",
        price: 34000,
        image: "https://cdns.klimg.com/mav-prod-resized/720x/webp/newsCover/2024/10/1/1727777201320-wqj52k.jpeg",
        description: "Sandwich isi tuna, sayuran segar, dan saus mayo.",
        tags: ["Snack", "Shandwich", "Ikan"],
      },
      {
        id: 20,
        name: "Donat Glaze",
        price: 16000,
        image: "https://cdn.grid.id/crop/0x0:0x0/700x465/photo/sasefoto/original/28092_empat-langkah-membuat-donat-gula-klasik-nan-lembut.jpg",
        description: "Donat klasik dengan lapisan gula manis.",
        tags: ["Dessert", "Donat", "Manis"],
      },
      {
        id: 21,
        name: "Kue Lapis Legit",
        price: 68000,
        image: "https://imgx.sonora.id/crop/0x0:0x0/700x465/filters:format(webp):quality(50)/photo/2025/07/01/kue-lapis-legit-pandanjpg-20250701024523.jpg",
        description: "Kue lapis legit lembut dengan aroma rempah.",
        tags: ["Dessert", "Kue", "Rempah"],
      },
      {
        id: 22,
        name: "Matcha Latte",
        price: 32000,
        image: "https://itoen-ultrajaya.co.id/wp-content/uploads/2024/08/08-06-matcha-latte-no-sugar.jpg",
        description: "Matcha latte lembut dengan susu.",
        tags: ["Minuman", "Matcha", "Susu"],
      },
      {
        id: 23,
        name: "Latte Caramel",
        price: 36000,
        image: "https://cornercoffeestore.com/wp-content/uploads/2020/01/how-to-make-a-caramel-latte.webp",
        description: "Kopi latte dengan sirup caramel manis.",
        tags: ["Minuman", "Kopi", "Caramel"],
      },
      {
        id: 24,
        name: "Es Kopi Susu",
        price: 28000,
        image: "https://sumeks.disway.id/upload/8753fba56cb3e0ac6d185546904efb86.jpg",
        description: "Kopi susu dingin penyegar hari Anda.",
        tags: ["Minuman", "Kopi", "Susu"],
      },
      {
        id: 25,
        name: "Thai Tea",
        price: 26000,
        image: "http://forestbubbledrink.com/image/data/blog/Tren%20Minuman%20Thai%20Tea.jpg",
        description: "Teh khas Thailand dengan susu dan es.",
        tags: ["Minuman", "Teh", "Susu"],
      },
      {
        id: 26,
        name: "Keripik Kentang BBQ",
        price: 18000,
        image: "https://media.suara.com/pictures/653x366/2015/08/24/o_19telrjfh1unpcn71dlq1bai16oja.jpg",
        description: "Keripik kentang rasa BBQ gurih.",
        tags: ["Snack", "Keripik", "BBQ"],
      },
      {
        id: 27,
        name: "Keripik Pisang Manis",
        price: 16000,
        image: "https://asset.kompas.com/crops/DkGdTd89XNa6adESIAw7t9q8d8M=/28x18:996x663/1200x800/data/photo/2022/07/21/62d9074aee727.jpg",
        description: "Keripik pisang manis renyah.",
        tags: ["Snack", "Keripik", "Pisang"],
      },
      {
        id: 28,
        name: "Es Teler",
        price: 30000,
        image: "https://statik.tempo.co/data/2023/03/24/id_1191446/1191446_720.jpg",
        description: "Campuran alpukat, kelapa, dan nangka dengan susu.",
        tags: ["Dessert", "Buah", "Susu"],
      },
      {
        id: 29,
        name: "Sop Buah",
        price: 28000,
        image: "https://asset.kompas.com/crops/eqfYlo4Yl1BOYECcMQ7tNH16U-0=/55x28:935x615/1200x800/data/photo/2024/04/10/6616bbe543b00.jpg",
        description: "Minuman segar campuran buah dan sirup.",
        tags: ["Minuman", "Buah", "Segar"],
      },
      {
        id: 30,
        name: "Es Cincau",
        price: 20000,
        image: "https://image.idntimes.com/post/20210414/59571122-3181886058491906-4322097717596254720-n-a069fdf4d2426e18db53ce9b5a8a3e2b.jpg?tr=w-1200,f-webp,q-75&width=1200&format=webp&quality=75",
        description: "Minuman cincau dingin dengan gula merah.",
        tags: ["Minuman", "Cincau", "Dingin"],
      },
    ];
    const params = new URLSearchParams(window.location.search);
    const useDummyParam = params.get("useDummy");
    const useDummy = useDummyParam === null ? true : useDummyParam === "1";
    const resetCatalog = params.get("resetCatalog") === "1";
    const CATALOG_VERSION = "2";
    const storedVersion = localStorage.getItem("catalogVersion");
    if (storedVersion !== CATALOG_VERSION) {
      try { localStorage.removeItem("catalogProducts"); } catch (_) {}
      try { localStorage.setItem("catalogVersion", CATALOG_VERSION); } catch (_) {}
    }
    if (resetCatalog) {
      try { localStorage.removeItem("catalogProducts"); } catch (_) {}
    }
    if (!useDummy) {
      this.products = [];
    }
    this.loadProductsFromStorage();
    this.normalizeProducts();
    this.randomizeStocks(0, 200);
    this.filtered = [...this.products];
    this.grid = document.getElementById("catalogGrid");
    this.searchInput = document.getElementById("catalogSearch");
    this.categoryFilterEl = document.getElementById("categoryFilter");
    this.selectedCategory = null;
    this.searchQuery = "";
    this.detailModal = document.getElementById("productDetailModal");
    this.detailContent = document.getElementById("productDetailContent");
    this.closeDetailBtn = document.getElementById("closeDetailModal");
    this.productFormModal = document.getElementById("productFormModal");
    this.productFormTitle = document.getElementById("productFormTitle");
    this.closeProductFormBtn = document.getElementById("closeProductFormModal");
    this.productForm = document.getElementById("productForm");
    this.addProductBtn = document.getElementById("addProductBtn");
    this.gridDelegationBound = false;
    this.categories = [
      { slug: "food", label: "Food" },
      { slug: "fresh-drinks", label: "Fresh Drinks" },
      { slug: "snacks", label: "Snacks" },
      { slug: "cake", label: "Cake" },
      { slug: "juice", label: "Juice" },
      { slug: "burger", label: "Burger" },
    ];

    this.init();
  }

  init() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.renderCategoryFilter();
    this.renderGrid();
    this.bindEvents();
    this.setUserNameFromSession();
  }

  debounce(fn, delay = 250) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  bindEvents() {
    if (this.searchInput) {
      const onSearch = this.debounce((e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.applyFilters();
      }, 250);
      this.searchInput.addEventListener("input", onSearch);
    }

    if (this.addProductBtn) {
      this.addProductBtn.addEventListener("click", () => this.openForm());
    }
    if (this.closeProductFormBtn) {
      this.closeProductFormBtn.addEventListener("click", () => this.closeForm());
    }
    if (this.productForm) {
      this.productForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveForm();
      });
    }

    if (this.closeDetailBtn) {
      this.closeDetailBtn.addEventListener("click", () => this.closeDetail());
    }
    if (this.detailModal) {
      this.detailModal.addEventListener("click", (e) => {
        if (e.target === this.detailModal) this.closeDetail();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.detailModal.style.display === "block") {
        this.closeDetail();
      }
    });
    if (this.grid && !this.gridDelegationBound) {
      this.grid.addEventListener("click", this.handleGridClick.bind(this));
      this.gridDelegationBound = true;
    }
  }
  loadProductsFromStorage() {
    try {
      const raw = localStorage.getItem("catalogProducts");
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data) && data.length) this.products = data;
      }
    } catch (_) {}
  }

  saveProductsToStorage() {
    try {
      localStorage.setItem("catalogProducts", JSON.stringify(this.products));
    } catch (_) {}
  }

  normalizeProducts() {
    this.products = this.products.map((p, idx) => {
      const id = p.id ?? idx + 1;
      const category = p.category ?? this.getCategory(p);
      const sku = p.sku ?? `SKU-${String(id).padStart(4, "0")}`;
      const stock = p.stock ?? 0;
      const status = p.status ?? (stock > 0 ? "Available" : "Out of Stock");
      const discountPrice = p.discountPrice ?? null;
      const rawPrice = Number(p.price) || 0;
      const roundedPrice = Math.round(rawPrice / 1000) * 1000;
      const price = Math.max(5000, roundedPrice || 0);
      const hpp = Math.round(price * 0.4);
      const variants = p.variants ?? [];
      const searchText = (p.name || "").toLowerCase();
      return { ...p, id, category, sku, stock, status, hpp, discountPrice, price, variants, searchText };
    });
    this.saveProductsToStorage();
  }
  
  randomizeStocks(min = 0, max = 200) {
    const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
    this.products = this.products.map((p) => {
      const stock = rand(min, max);
      const status = stock > 0 ? "Available" : "Out of Stock";
      return { ...p, stock, status };
    });
    this.saveProductsToStorage();
  }

  renderCategoryFilter() {
    if (!this.categoryFilterEl) return;
    const counts = this.categories.reduce((acc, c) => {
      acc[c.slug] = this.products.filter(p => p.category === c.slug).length;
      return acc;
    }, {});
    this.categoryFilterEl.innerHTML = this.categories
      .map((c) => `<span class="category-chip" data-cat="${c.slug}">${c.label} (${counts[c.slug] || 0})</span>`)
      .join("");

    [...this.categoryFilterEl.querySelectorAll(".category-chip")].forEach((chip) => {
      chip.addEventListener("click", () => {
        const cat = chip.getAttribute("data-cat");
        if (this.selectedCategory === cat) {
          this.selectedCategory = null;
          chip.classList.remove("active");
        } else {
          this.selectedCategory = cat;
          [...this.categoryFilterEl.querySelectorAll(".category-chip")].forEach((c) =>
            c.classList.remove("active")
          );
          chip.classList.add("active");
        }
        this.applyFilters();
      });
    });
  }

  getCategory(product) {
    const name = (product.name || "").toLowerCase();
    const tags = (product.tags || []).map((t) => t.toLowerCase());

    if (name.includes("burger") || tags.includes("burger")) return "burger";
    if (name.includes("jus") || tags.includes("jus")) return "juice";
    if (
      tags.includes("snack") ||
      name.includes("keripik") ||
      name.includes("cookies") ||
      name.includes("sandwich") ||
      name.includes("croissant")
    )
      return "snacks";
    if (
      tags.includes("dessert") ||
      tags.includes("kue") ||
      name.includes("tiramisu") ||
      name.includes("brownies") ||
      name.includes("donat") ||
      name.includes("cake")
    )
      return "cake";
    if (tags.includes("makanan")) return "food";
    if (tags.includes("minuman") || name.includes("es") || name.includes("tea") || name.includes("latte"))
      return "fresh-drinks";
    return "food";
  }

  applyFilters() {
    const q = this.searchQuery;
    this.filtered = this.products.filter((p) => {
      const matchesText = p.searchText.includes(q);
      if (!matchesText) return false;
      if (!this.selectedCategory) return true;
      return p.category === this.selectedCategory;
    });
    this.renderGrid();
  }

  handleGridClick(e) {
    const target = e.target.closest("a.product-name, button[data-action]");
    if (!target) return;
    if (target.matches("a.product-name")) {
      e.preventDefault();
      const id = Number(target.getAttribute("data-id"));
      const product = this.findProductById(id);
      if (product) this.openDetail(product);
      return;
    }
    const action = target.getAttribute("data-action");
    const id = Number(target.getAttribute("data-id"));
    const product = this.findProductById(id);
    if (!action || !product) return;
    if (action === "edit") {
      this.openForm(product);
    } else if (action === "stock") {
      const amount = Number(prompt("Tambah jumlah stok:", "1"));
      if (Number.isFinite(amount) && amount > 0) {
        product.stock += amount;
        this.updateProductStatus(product);
        this.saveProductsToStorage();
        this.applyFilters();
      }
    } else if (action === "delete") {
      const ok = confirm(`Hapus produk "${product.name}"? Tindakan ini tidak dapat dibatalkan.`);
      if (!ok) return;
      this.products = this.products.filter((p) => p.id !== id);
      this.saveProductsToStorage();
      this.applyFilters();
    }
  }

  findProductById(id) {
    return this.products.find((p) => p.id === id);
  }

  updateProductStatus(product) {
    product.status = product.stock > 0 ? "Available" : "Out of Stock";
  }

  setUserNameFromSession() {
    try {
      const sessionRaw =
        localStorage.getItem("posSession") ||
        sessionStorage.getItem("posSession");
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        const nameEl = document.getElementById("userName");
        if (nameEl && session.fullName) nameEl.textContent = session.fullName;
      }
    } catch (_) {}
  }

  updateDateTime() {
    const now = new Date();
    const el = document.getElementById("dateTime");
    if (el) el.textContent = now.toLocaleString();
  }

  formatRupiah(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  }

  renderGrid() {
    if (!this.grid) return;
    const hasRows = this.filtered && this.filtered.length > 0;
    this.grid.innerHTML = `
      <div class="product-table-wrapper">
        <table class="product-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${hasRows
              ? this.filtered
                  .map((p) => {
                    const statusClass = p.status === "Available" ? "available" : "oos";
                    const nameHtml = this.highlight(p.name, this.searchQuery);
                    return `
                <tr data-id="${p.id}">
                  <td>${p.sku}</td>
                  <td><a href="#" class="product-name" data-id="${p.id}">${nameHtml}</a></td>
                  <td>${p.category}</td>
                  <td>${p.stock}</td>
                  <td>${this.formatRupiah(p.price)}</td>
                  <td class="product-status ${statusClass}">${p.status}</td>
                  <td>
                    <div class="table-actions">
                      <button class="btn small" data-action="edit" data-id="${p.id}"><i class="fas fa-edit"></i> Edit</button>
                      <button class="btn small" data-action="stock" data-id="${p.id}"><i class="fas fa-plus"></i> Tambah Stok</button>
                      <button class="btn small danger" data-action="delete" data-id="${p.id}"><i class="fas fa-trash"></i> Hapus</button>
                    </div>
                  </td>
                </tr>`;
                  })
                  .join("")
              : `<tr><td colspan="7" class="empty-state">Belum ada produk</td></tr>`}
          </tbody>
        </table>
      </div>`;
  }

  highlight(text, query) {
    if (!query) return text;
    const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(esc, 'gi');
    return String(text).replace(re, (m) => `<mark>${m}</mark>`);
  }

  openDetail(product) {
    if (!this.detailModal || !this.detailContent) return;
    const variants = (product.variants || [])
      .map((v) => `<span class="product-tag">${v}</span>`)
      .join(" ");
    this.detailContent.innerHTML = `
            <div class="product-detail-body">
                <img class="product-detail-image" src="${product.image || "https://picsum.photos/seed/noimg/600/400"}" alt="${
      product.name
    }" />
                <div class="product-detail-info">
                    <h3>${product.name}</h3>
                    <div class="product-detail-price">Harga: ${this.formatRupiah(product.price || 0)}</div>
                    ${product.discountPrice ? `<div class="product-detail-price">Diskon: ${this.formatRupiah(product.discountPrice)}</div>` : ""}
                    <div class="product-detail-price">HPP: ${this.formatRupiah(product.hpp || 0)}</div>
                    <p class="product-detail-desc">${product.description || ""}</p>
                    <p>Kategori: ${product.category}</p>
                    <p>SKU: ${product.sku}</p>
                    <p>Stok: ${product.stock} (${product.status})</p>
                    <div class="product-tags">${variants}</div>
                </div>
            </div>
        `;
    this.detailModal.style.display = "block";
  }

  openForm(product = null) {
    if (!this.productFormModal || !this.productForm) return;
    const editing = !!product;
    this.productFormTitle.textContent = editing ? "Edit Produk" : "Tambah Produk";
    this.productForm.dataset.editingId = editing ? String(product.id) : "";
    const q = (sel) => this.productForm.querySelector(`#${sel}`);
    q("formSku").value = editing ? product.sku : "";
    q("formName").value = editing ? product.name : "";
    q("formCategory").value = editing ? product.category : "food";
    q("formStock").value = editing ? product.stock : 0;
    q("formPrice").value = editing ? product.price : 0;
    q("formDiscountPrice").value = editing && product.discountPrice ? product.discountPrice : "";
    q("formHpp").value = editing ? product.hpp : 0;
    q("formStatus").value = editing ? product.status : "Available";
    q("formImage").value = editing ? (product.image || "") : "";
    q("formDescription").value = editing ? (product.description || "") : "";
    q("formVariants").value = editing ? (product.variants || []).join(", ") : "";
    this.productFormModal.style.display = "block";
    
    const overlayClose = (e) => { if (e.target === this.productFormModal) this.closeForm(); };
    const escClose = (e) => { if (e.key === 'Escape') this.closeForm(); };
    this.productFormModal.addEventListener('click', overlayClose, { once: true });
    document.addEventListener('keydown', escClose, { once: true });
  }

  closeForm() {
    if (this.productFormModal) this.productFormModal.style.display = "none";
  }

  saveForm() {
    const form = this.productForm;
    const editingId = form.dataset.editingId || "";
    const q = (sel) => form.querySelector(`#${sel}`);
    const sku = q("formSku").value.trim();
    const name = q("formName").value.trim();
    const category = q("formCategory").value;
    const stock = Number(q("formStock").value) || 0;
    const price = Number(q("formPrice").value) || 0;
    const discountRaw = q("formDiscountPrice").value;
    const discountPrice = discountRaw ? Number(discountRaw) : null;
    const hpp = Number(q("formHpp").value) || 0;
    const status = q("formStatus").value;
    const image = q("formImage").value.trim();
    const description = q("formDescription").value.trim();
    const variantsStr = q("formVariants").value.trim();
    const variants = variantsStr ? variantsStr.split(",").map((s) => s.trim()).filter(Boolean) : [];

    if (!name) return alert("Nama produk wajib diisi");
    if (!sku) return alert("SKU wajib diisi");
    if (!Number.isFinite(price) || price <= 0) return alert("Harga harus lebih dari 0");
    if (discountPrice !== null && (!Number.isFinite(discountPrice) || discountPrice <= 0)) {
      return alert("Harga diskon tidak valid");
    }
    if (discountPrice !== null && discountPrice >= price) {
      return alert("Harga diskon harus lebih kecil dari harga");
    }
    if (image) {
      try { new URL(image); } catch (_) { return alert("URL gambar tidak valid"); }
    }

    if (editingId) {
      const id = Number(editingId);
      const idx = this.products.findIndex((p) => p.id === id);
      if (idx >= 0) {
        this.products[idx] = { ...this.products[idx], sku, name, category, stock, price, discountPrice, hpp, status, image, description, variants };
      }
    } else {
      const id = Math.max(0, ...this.products.map((p) => p.id || 0)) + 1;
      const statusFinal = stock > 0 ? "Available" : "Out of Stock";
      const newP = { id, sku, name, category, stock, price, discountPrice, hpp, status: statusFinal, image, description, variants };
      this.products.push(newP);
    }
    this.saveProductsToStorage();
    this.applyFilters();
    this.closeForm();
  }

  closeDetail() {
    if (this.detailModal) this.detailModal.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.catalogPage = new CatalogPage();
});
