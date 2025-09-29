// Dashboard JavaScript
class Dashboard {
    constructor() {
        this.init();
    }

    init() {
        this.loadUserInfo();
        this.updateDateTime();
        this.loadDashboardData();
        this.setupEventListeners();
        
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

    loadDashboardData() {
        this.loadSummaryCards();
        this.loadTopProducts();
        this.loadRecentTransactions();
        this.initializeChart();
    }

    loadSummaryCards() {
        // Load summary data from localStorage or use mock data
        const summaryData = this.getSummaryData();
        
        document.getElementById('totalRevenue').textContent = summaryData.revenue;
        document.getElementById('totalTransactions').textContent = summaryData.transactions;
        document.getElementById('totalProducts').textContent = summaryData.products;
        document.getElementById('todayCustomers').textContent = summaryData.customers;
    }

    getSummaryData() {
        // Get data from localStorage or use mock data
        const transactions = JSON.parse(localStorage.getItem('posTransactions') || '[]');
        const products = JSON.parse(localStorage.getItem('posProducts') || '[]');
        
        const today = new Date().toDateString();
        const todayTransactions = transactions.filter(t => 
            new Date(t.date).toDateString() === today
        );
        
        const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
        const todayRevenue = todayTransactions.reduce((sum, t) => sum + t.total, 0);
        
        return {
            revenue: this.formatCurrency(totalRevenue),
            transactions: transactions.length,
            products: products.length,
            customers: todayTransactions.length
        };
    }

    loadTopProducts() {
        const topProductsList = document.getElementById('topProductsList');
        if (!topProductsList) return;

        const topProducts = this.getTopProducts();
        
        topProductsList.innerHTML = topProducts.map((product, index) => `
            <div class="top-product-item">
                <div class="product-rank">${index + 1}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-sales">${product.sales} terjual</div>
                </div>
            </div>
        `).join('');
    }

    getTopProducts() {
        // Mock data for top products
        return [
            { name: 'Coffee Latte', sales: 45 },
            { name: 'Burger Deluxe', sales: 32 },
            { name: 'Pizza Margherita', sales: 28 },
            { name: 'Ice Cream Vanilla', sales: 25 },
            { name: 'Chocolate Cookie', sales: 22 }
        ];
    }

    loadRecentTransactions() {
        const transactionsTable = document.getElementById('recentTransactionsTable');
        if (!transactionsTable) return;

        const recentTransactions = this.getRecentTransactions();
        
        transactionsTable.innerHTML = recentTransactions.map(transaction => `
            <tr>
                <td>${transaction.id}</td>
                <td>${this.formatDate(transaction.date)}</td>
                <td>${transaction.customer}</td>
                <td>${this.formatCurrency(transaction.total)}</td>
                <td><span class="status-badge ${transaction.status}">${this.getStatusText(transaction.status)}</span></td>
                <td>
                    <button class="action-btn-small" onclick="viewTransaction('${transaction.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getRecentTransactions() {
        const transactions = JSON.parse(localStorage.getItem('posTransactions') || '[]');
        return transactions.slice(-5).reverse(); // Get last 5 transactions
    }

    initializeChart() {
        const canvas = document.getElementById('salesChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Simple chart implementation (you can replace with Chart.js for better charts)
        this.drawSimpleChart(ctx, canvas.width, canvas.height);
    }

    drawSimpleChart(ctx, width, height) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Chart data (mock data for 7 days)
        const data = [120, 150, 180, 200, 160, 220, 250];
        const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        const maxValue = Math.max(...data);
        const stepX = chartWidth / (data.length - 1);
        const stepY = chartHeight / maxValue;
        
        // Draw grid lines
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i < data.length; i++) {
            const x = padding + stepX * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }
        
        // Draw chart line
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = padding + stepX * index;
            const y = height - padding - (value * stepY);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw data points
        ctx.fillStyle = '#667eea';
        data.forEach((value, index) => {
            const x = padding + stepX * index;
            const y = height - padding - (value * stepY);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw labels
        ctx.fillStyle = '#718096';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        labels.forEach((label, index) => {
            const x = padding + stepX * index;
            ctx.fillText(label, x, height - 10);
        });
    }

    setupEventListeners() {
        // Chart period buttons
        document.querySelectorAll('.chart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateChart(e.target.dataset.period);
            });
        });
    }

    updateChart(period) {
        // Update chart based on selected period
        console.log(`Updating chart for period: ${period}`);
        // You can implement different data sets for different periods
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

    getStatusText(status) {
        const statusMap = {
            'completed': 'Selesai',
            'pending': 'Pending',
            'cancelled': 'Dibatalkan'
        };
        return statusMap[status] || status;
    }
}

// Utility functions
function viewTransaction(transactionId) {
    // Navigate to transaction detail page
    window.location.href = `transaction-detail.html?id=${transactionId}`;
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
});

// Add some mock data for demonstration
function initializeMockData() {
    // Mock transactions
    const mockTransactions = [
        {
            id: 'TXN001',
            date: new Date().toISOString(),
            customer: 'John Doe',
            total: 150000,
            status: 'completed'
        },
        {
            id: 'TXN002',
            date: new Date(Date.now() - 3600000).toISOString(),
            customer: 'Jane Smith',
            total: 75000,
            status: 'completed'
        },
        {
            id: 'TXN003',
            date: new Date(Date.now() - 7200000).toISOString(),
            customer: 'Bob Johnson',
            total: 200000,
            status: 'pending'
        }
    ];

    // Mock products
    const mockProducts = [
        { id: 1, name: 'Coffee Latte', price: 25000, stock: 50 },
        { id: 2, name: 'Burger Deluxe', price: 45000, stock: 30 },
        { id: 3, name: 'Pizza Margherita', price: 80000, stock: 20 },
        { id: 4, name: 'Ice Cream Vanilla', price: 15000, stock: 40 },
        { id: 5, name: 'Chocolate Cookie', price: 10000, stock: 60 }
    ];

    // Store mock data if not exists
    if (!localStorage.getItem('posTransactions')) {
        localStorage.setItem('posTransactions', JSON.stringify(mockTransactions));
    }
    
    if (!localStorage.getItem('posProducts')) {
        localStorage.setItem('posProducts', JSON.stringify(mockProducts));
    }
}

// Initialize mock data on first load
document.addEventListener('DOMContentLoaded', initializeMockData);
