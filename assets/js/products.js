// products.js

// Event listener ini akan berjalan saat seluruh konten halaman HTML selesai dimuat.
document.addEventListener('DOMContentLoaded', () => {

    // === ELEMEN DOM ===
    // Mengambil semua elemen HTML yang kita butuhkan untuk interaksi.
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const productForm = document.getElementById('productForm');
    const productTableBody = document.getElementById('productTableBody');
    const modalTitle = document.getElementById('modalTitle');
    const userNameElement = document.getElementById('userName');

    // === STATE APLIKASI ===
    // Mengambil data produk dari localStorage. Jika tidak ada, gunakan array kosong.
    let products = JSON.parse(localStorage.getItem('posProducts')) || [];

    // === FUNGSI-FUNGSI ===

    /**
     * Fungsi untuk merender atau menampilkan semua produk ke dalam tabel.
     */
    const renderProducts = () => {
        // Kosongkan isi tabel terlebih dahulu.
        productTableBody.innerHTML = '';
        if (products.length === 0) {
            productTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Belum ada produk.</td></tr>';
            return;
        }

        // Loop setiap produk dan buat baris tabel (<tr>) untuk masing-masing produk.
        products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.sku}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>
                    <span class="status-badge ${product.status === 'active' ? 'active' : 'inactive'}">
                        ${product.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                </td>
                <td class="action-btns">
                    <button class="edit-btn" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            productTableBody.appendChild(tr);
        });
    };

    /**
     * Menampilkan modal (pop-up) form.
     * @param {object|null} product - Data produk untuk diedit, atau null untuk menambah produk baru.
     */
    const showModal = (product = null) => {
        productForm.reset(); // Bersihkan form.
        if (product) {
            // Jika ada data produk, kita sedang dalam mode 'edit'.
            modalTitle.textContent = 'Edit Produk';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productSku').value = product.sku;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStatus').value = product.status;
        } else {
            // Jika tidak ada, kita dalam mode 'tambah'.
            modalTitle.textContent = 'Tambah Produk Baru';
            document.getElementById('productId').value = ''; // Pastikan ID kosong.
        }
        productModal.style.display = 'block'; // Tampilkan modal.
    };

    /**
     * Menyembunyikan modal form.
     */
    const closeModal = () => {
        productModal.style.display = 'none';
    };

    /**
     * Fungsi untuk menyimpan data produk (baik baru maupun yang diedit).
     */
    const saveProducts = () => {
        localStorage.setItem('posProducts', JSON.stringify(products));
    };

    /**
     * Menangani event saat form produk disubmit.
     * @param {Event} e - Event object dari form submission.
     */
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Mencegah halaman refresh.

        const id = document.getElementById('productId').value;
        const productData = {
            name: document.getElementById('productName').value,
            sku: document.getElementById('productSku').value,
            category: document.getElementById('productCategory').value,
            stock: parseInt(document.getElementById('productStock').value),
            price: parseFloat(document.getElementById('productPrice').value),
            status: document.getElementById('productStatus').value
        };

        if (id) {
            // Jika ada ID, berarti kita mengedit produk yang sudah ada.
            const index = products.findIndex(p => p.id == id);
            products[index] = { ...products[index], ...productData };
        } else {
            // Jika tidak ada ID, kita membuat produk baru.
            productData.id = Date.now(); // Buat ID unik berdasarkan timestamp.
            products.push(productData);
        }

        saveProducts();   // Simpan ke localStorage.
        renderProducts(); // Perbarui tampilan tabel.
        closeModal();     // Tutup modal.
    };

    /**
     * Menangani klik pada tombol edit atau hapus.
     * @param {Event} e - Event object dari klik.
     */
    const handleTableClick = (e) => {
        const target = e.target.closest('button'); // Dapatkan tombol yang diklik.
        if (!target) return;

        const id = target.dataset.id;
        if (target.classList.contains('edit-btn')) {
            // Jika tombol 'edit' yang diklik.
            const product = products.find(p => p.id == id);
            showModal(product);
        }

        if (target.classList.contains('delete-btn')) {
            // Jika tombol 'delete' yang diklik.
            if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
                products = products.filter(p => p.id != id);
                saveProducts();
                renderProducts();
            }
        }
    };
    
    /**
     * Memformat angka menjadi format mata uang Rupiah.
     * @param {number} amount - Angka yang akan diformat.
     */
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    /**
     * Memuat informasi pengguna dari session.
     */
    const loadUserInfo = () => {
        const session = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
        if (session) {
            const userData = JSON.parse(session);
            if (userNameElement) {
                userNameElement.textContent = userData.fullName || 'User';
            }
        }
    };

    // === EVENT LISTENERS ===
    // Menambahkan event listener ke elemen-elemen yang sudah kita siapkan.
    addProductBtn.addEventListener('click', () => showModal());
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeModal();
        }
    });
    productForm.addEventListener('submit', handleFormSubmit);
    productTableBody.addEventListener('click', handleTableClick);

    // === INISIALISASI ===
    // Panggil fungsi-fungsi ini saat halaman pertama kali dimuat.
    loadUserInfo();
    renderProducts();
});