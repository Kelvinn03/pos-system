//#region layout for sidebar navigation

document.addEventListener('DOMContentLoaded', () => {
  try {
    const session =
      localStorage.getItem("posSession") || sessionStorage.getItem("posSession");
    const userData = session ? JSON.parse(session) : {};

    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return; // no sidebar on this page

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
          <li class="menu-item ${currentUrl.startsWith('/pos/') ? 'parent' : ''}">
              <a href="#" class="parent-link">
                  <i class="fas fa-shopping-cart"></i>
                  <span>Kasir / POS</span>
              </a>
              <ul class="submenu">
                  <li class="submenu-item ${currentUrl === '/pos/pos.html' ? 'active' : ''}"><a href="/pos/pos.html">Jual &amp; Bayar</a></li>
                  <li class="submenu-item ${currentUrl === '/pos/refund.html' ? 'active' : ''}"><a href="/pos/refund.html">Refund</a></li>
                  <li class="submenu-item ${currentUrl === '/pos/history.html' ? 'active' : ''}"><a href="/pos/history.html">History Pembelian</a></li>
              </ul>
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
                  <span class="user-name" id="userName">${userData.fullName || "User"}</span>
                  <span class="user-role">Admin</span>
              </div>
          </div>
          <button class="logout-btn" onclick="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Logout
          </button>
      </div>
    `;
  } catch (e) {
    console.error('Error initializing sidebar:', e);
  }
});

//#endregion layout for sidebar navigation
