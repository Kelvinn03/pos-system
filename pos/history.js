// history.js - renders and filters transaction history
(function () {
  function formatCurrency(v) {
    return (v || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  }

  function renderRows(data) {
    const body = document.getElementById('historyBody');
    if (!body) return;
    if (!data.length) {
      body.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#718096;padding:20px">Tidak ada transaksi.</td></tr>';
      return;
    }

    body.innerHTML = data.map(t => `
      <tr>
        <td>${t.id}</td>
  <td>${new Date(t.timestamp || t.date || t.time || t.createdAt).toLocaleString()}</td>
        <td>${t.customerName || 'Walk-in Customer'}</td>
        <td>${(t.items || []).length}</td>
        <td>${formatCurrency(t.total)}</td>
        <td><a class="action-refund" href="/pos/refund.html?trx=${t.id}"><i class="fas fa-undo"></i> Refund</a></td>
      </tr>
    `).join('');
  }

  function sortData(data, key, dir) {
    const sorted = data.slice();
    sorted.sort((a, b) => {
      let va = a[key];
      let vb = b[key];
      if (key === 'items') { va = (a.items || []).length; vb = (b.items || []).length; }
      if (key === 'timestamp') { va = new Date(a.timestamp || a.date || a.time || a.createdAt).getTime(); vb = new Date(b.timestamp || b.date || b.time || b.createdAt).getTime(); }
      // normalize
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va > vb) return dir === 'asc' ? 1 : -1;
      if (va < vb) return dir === 'asc' ? -1 : 1;
      return 0;
    });
    return sorted;
  }

  function getTransactions() {
    try {
      return JSON.parse(localStorage.getItem('posTransactions') || '[]');
    } catch (e) { return []; }
  }

  function applyFilters(all, term, days) {
    const now = Date.now();
    const cutoff = days ? now - (days * 24 * 60 * 60 * 1000) : 0;
    const lc = (s) => String(s || '').toLowerCase();
    return all.filter(t => {
      const inTerm = !term || lc(t.id).includes(lc(term)) || lc(t.customerName).includes(lc(term));
      const itemTime = new Date(t.timestamp || t.date || t.time || t.createdAt).getTime();
      const inRange = !days || itemTime >= cutoff;
      return inTerm && inRange;
    }).sort((a,b) => new Date(b.date) - new Date(a.date));
  }

  function debounce(fn, wait) {
    let t;
    return function() { clearTimeout(t); t = setTimeout(() => fn.apply(this, arguments), wait); };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('historySearch');
    const period = document.getElementById('historyPeriod');
    const headers = Array.from(document.querySelectorAll('table thead th[data-key]'));

    let currentSort = { key: 'timestamp', dir: 'desc' };

    const doRender = () => {
      const all = getTransactions();
      const term = search ? search.value.trim() : '';
      const days = period ? parseInt(period.value, 10) : 0;
      let filtered = applyFilters(all, term, days);
      if (currentSort && currentSort.key) {
        filtered = sortData(filtered, currentSort.key, currentSort.dir);
      }
      renderRows(filtered);
      // update header indicators
      headers.forEach(h => {
        h.classList.toggle('sorted-asc', h.dataset.key === currentSort.key && currentSort.dir === 'asc');
        h.classList.toggle('sorted-desc', h.dataset.key === currentSort.key && currentSort.dir === 'desc');
      });
    };

    // initial render
    doRender();

    if (search) search.addEventListener('input', debounce(doRender, 250));
    if (period) period.addEventListener('change', doRender);

    // header sorting handlers
    headers.forEach(h => {
      h.style.cursor = 'pointer';
      h.addEventListener('click', () => {
        const key = h.dataset.key;
        if (!key) return;
        if (currentSort.key === key) {
          currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
        } else {
          currentSort.key = key; currentSort.dir = 'asc';
        }
        doRender();
      });
    });

    // Listen to storage events so this page updates when transactions are added in other windows/tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'posTransactions') {
        doRender();
      }
    });
  });
})();
