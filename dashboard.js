class Dashboard {
  constructor() {
    this.products = [];
    this.transactions = this.getHardcodedTransactions();
    this.chartMode = 'day';
    this.init();
  }

  init() {
    this.setUserNameFromSession();
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.renderTopProducts();
    this.renderRecentTransactions();
    this.bindChartControls();
    this.renderChart(this.chartMode);
  }

  getProducts() { return []; }

  getTransactions() { return []; }

  getHardcodedTransactions() {
    const now = new Date();
    const mkDate = (daysAgo, hoursAgo = 0, minutesAgo = 0) => {
      const d = new Date(now);
      d.setDate(now.getDate() - daysAgo);
      d.setHours(now.getHours() - hoursAgo);
      d.setMinutes(now.getMinutes() - minutesAgo);
      return d.toISOString();
    };
    return [
      { id: 'TRX-001', customer: 'Ahmad Rizki', itemsCount: 3, total: 125000, status: 'completed', date: mkDate(0, 2, 10) },
      { id: 'TRX-002', customer: 'Siti Nurhaliza', itemsCount: 2, total: 78000, status: 'completed', date: mkDate(1, 4, 25) },
      { id: 'TRX-003', customer: 'Budi Santoso', itemsCount: 4, total: 169000, status: 'pending', date: mkDate(1, 6, 5) },
      { id: 'TRX-004', customer: 'Dewi Lestari', itemsCount: 1, total: 54000, status: 'completed', date: mkDate(2, 1, 40) },
      { id: 'TRX-005', customer: 'Eko Prasetyo', itemsCount: 2, total: 89000, status: 'cancelled', date: mkDate(3, 3, 15) }
    ];
  }

  

  renderTopProducts() {
    const listEl = document.getElementById('topProductsList');
    if (!listEl) return;
    
    const topProductsHardcoded = [
      {
        productId: 1,
        name: 'Kopi Arabika Premium',
        price: 35000,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MrK3iDDWL7FdEI8cN5vcjplUrdV-W7eFIg&s',
        qty: 120
      },
      {
        productId: 2,
        name: 'Burger Keju Jumbo',
        price: 54000,
        image: 'https://barburger.id/wp-content/uploads/2020/11/rsz_web_resep-burger-jumbo-enak-ala-barburger.jpg',
        qty: 90
      },
      {
        productId: 3,
        name: 'Pizza Pepperoni Classic',
        price: 89000,
        image: 'https://www.cobsbread.com/us/wp-content//uploads/2022/09/Pepperoni-pizza-850x630-1-650x480.png',
        qty: 75
      }
    ].map(p => ({ ...p, revenue: p.qty * p.price }));

    listEl.innerHTML = topProductsHardcoded.map((r, idx) => `
      <div class="top-product-item">
        <div class="product-rank">${idx + 1}</div>
        <div class="product-thumb" style="width:56px;height:40px;border-radius:8px;overflow:hidden;background:#e2e8f0">
          <img src="${r.image}" alt="${r.name}" style="width:100%;height:100%;object-fit:cover"/>
        </div>
        <div class="product-info">
          <div class="product-name">${r.name}</div>
          <div class="product-sales">${r.qty} item · ${this.formatRupiah(r.revenue)}</div>
        </div>
      </div>
    `).join('');
  }

  renderRecentTransactions() {
    const body = document.getElementById('recentTransactionsBody');
    if (!body) return;
    
    if (this.transactions.length === 0) {
      body.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state">Belum ada transaksi. Mulai berjualan di halaman POS!</td>
        </tr>
      `;
      return;
    }
    
    const recentTransactions = this.transactions.slice(0, 10);
    body.innerHTML = recentTransactions.map(t => `
      <tr>
        <td>${t.id || 'N/A'}</td>
        <td>${t.customer || 'Guest'}</td>
        <td>${t.itemsCount || 0}</td>
        <td>${this.formatRupiah(t.total || 0)}</td>
        <td><span class="status-badge ${t.status || 'pending'}">${this.capitalize(t.status || 'pending')}</span></td>
        <td>${this.formatDate(t.date || new Date())}</td>
      </tr>
    `).join('');
  }

  setUserNameFromSession() {
    try {
      const sessionRaw = localStorage.getItem('posSession') || sessionStorage.getItem('posSession');
      const userNameEl = document.getElementById('userName');
      if (sessionRaw && userNameEl) {
        const s = JSON.parse(sessionRaw);
        if (s?.name) userNameEl.textContent = s.name;
      }
    } catch (_) {}
  }

  updateDateTime() {
    const el = document.getElementById('dateTime');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleString();
  }

  formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Math.round(num || 0));
  }

  formatShortRupiah(num) {
    const n = Math.round(num || 0);
    if (n >= 1_000_000) return `${Math.round(n/1_000_000)}jt`;
    if (n >= 1_000) return `${Math.round(n/1_000)}rb`;
    return `${n}`;
  }

  formatDate(d) {
    const dt = d instanceof Date ? d : new Date(d);
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(dt);
  }

  capitalize(s) { return (s || '').charAt(0).toUpperCase() + (s || '').slice(1); }

  getChartData(mode = 'day') {
    if (mode === 'day') {
      return {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        values: [420000, 380000, 500000, 450000, 620000, 710000, 560000]
      };
    }
    if (mode === 'week') {
      return {
        labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'],
        values: [3200000, 2800000, 3600000, 4000000, 4500000, 3800000, 4200000, 4700000]
      };
    }
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      values: [8200000, 7600000, 9100000, 10800000, 9800000, 11200000, 12500000, 11800000, 13000000, 14000000, 13600000, 15000000]
    };
  }

  bindChartControls() {
    const buttons = document.querySelectorAll('.chart-controls .chart-btn');
    const modes = ['Hari', 'Minggu', 'Bulan'];
    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.chartMode = ['day','week','month'][idx];
        this.renderChart(this.chartMode);
      });
    });
    window.addEventListener('resize', () => this.renderChart(this.chartMode));
  }

  renderChart(mode = 'day') {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const heightCss = parseFloat(getComputedStyle(canvas).height) || 280;
    canvas.width = rect.width * dpr;
    canvas.height = heightCss * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { labels, values } = this.getChartData(mode);
    this.drawBarChart(ctx, labels, values, { width: rect.width, height: heightCss });
  }

  drawBarChart(ctx, labels, values, opts = {}) {
    const { width = 600, height = 280 } = opts;
    ctx.clearRect(0, 0, width, height);

    const pad = { t: 16, r: 16, b: 40, l: 40 };
    const chartW = width - pad.l - pad.r;
    const chartH = height - pad.t - pad.b;

    const maxVal = Math.max(1, ...values);
    const barCount = values.length;
    const barGap = 10;
    const barW = Math.max(12, (chartW - barGap * (barCount - 1)) / barCount);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t);
    ctx.lineTo(pad.l, pad.t + chartH);
    ctx.lineTo(pad.l + chartW, pad.t + chartH);
    ctx.stroke();

    values.forEach((v, i) => {
      const x = pad.l + i * (barW + barGap);
      const h = (v / maxVal) * (chartH - 6);
      const y = pad.t + chartH - h;
      const grad = ctx.createLinearGradient(0, y, 0, y + h);
      grad.addColorStop(0, '#667eea');
      grad.addColorStop(1, '#6b46c1');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barW, h);

      ctx.fillStyle = '#4a5568';
      ctx.font = '12px Segoe UI';
      ctx.textAlign = 'center';
      ctx.fillText(this.formatShortRupiah(v), x + barW / 2, y - 6);
    });

    ctx.fillStyle = '#718096';
    ctx.font = '12px Segoe UI';
    ctx.textAlign = 'center';
    labels.forEach((lbl, i) => {
      const x = pad.l + i * (barW + barGap) + barW / 2;
      ctx.fillText(lbl, x, pad.t + chartH + 16);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.dashboard = new Dashboard();
});