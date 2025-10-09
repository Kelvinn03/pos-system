//#region layout for sidebar navigation
const sidebar = document.getElementById("sidebar");
const currentUrl = window.location.pathname;
sidebar.innerHTML = `
    <div class="sidebar-header">
        <h2><i class="fas fa-cash-register"></i> POS System</h2>
    </div>

    <ul class="sidebar-menu">
        <li class="menu-item ${
          currentUrl === "/dashboard.html" ? "active" : ""
        }">
            <a href="/dashboard.html">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="menu-item ${currentUrl === "/pos/pos.html" ? "active" : ""}">
            <a href="/pos/pos.html">
                <i class="fas fa-shopping-cart"></i>
                <span>Kasir / POS</span>
            </a>
        </li>
        <li class="menu-item ${
          currentUrl === "/products.html" ? "active" : ""
        }">
            <a href="/products.html">
                <i class="fas fa-box"></i>
                <span>Produk & Katalog</span>
            </a>
        </li>
        <li class="menu-item ${currentUrl === "/contact.html" ? "active" : ""}">
            <a href="/contact.html">
                <i class="fas fa-envelope"></i>
                <span>Contact Us</span>
            </a>
        </li>
        <li class="menu-item ${currentUrl === "/support.html" ? "active" : ""}">
            <a href="/support.html">
                <i class="fas fa-life-ring"></i>
                <span>Support Center</span>
            </a>
        </li>
    </ul>
    
    <div class="sidebar-footer">
        <div class="user-info">
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="user-details">
                <span class="user-name" id="userName">John Doe</span>
                <span class="user-role">Admin</span>
            </div>
        </div>
        <button class="logout-btn" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i>
            Logout
        </button>
    </div>
`;
//#endregion layout for sidebar navigation
