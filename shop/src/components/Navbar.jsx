import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ setSearch, cartCount, toggleCart, wishlistCount, ordersCount, user, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on navigation
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link className="navbar-logo" to="/" onClick={closeMenu}>
          <div className="logo-icon">🌿</div>
          <span className="logo-text">FreshMart</span>
        </Link>

        {/* Desktop search */}
        <div className="navbar-search desktop-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search vegetables, fruits, pantry..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop nav links */}
        <div className="navbar-links">
          <Link to="/offers"   className="navbar-link" onClick={closeMenu}>🎁 Offers</Link>
          <Link to="/orders"   className="navbar-link orders-link" onClick={closeMenu}>
            📦 Orders
            {ordersCount > 0 && <span className="orders-nav-badge">{ordersCount}</span>}
          </Link>
          <Link to="/about"    className="navbar-link" onClick={closeMenu}>About</Link>
          <Link to="/wishlist" className="navbar-link wishlist-link" onClick={closeMenu}>
            ♥ Wishlist
            {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
          </Link>
        </div>

        {/* Desktop user / sign-in */}
        <div className="navbar-right">
          {user ? (
            <div className="navbar-user">
              <div className="navbar-avatar">{user.name[0].toUpperCase()}</div>
              <span className="navbar-username">{user.name.split(" ")[0]}</span>
              <button className="navbar-signout" onClick={onSignOut}>Sign out</button>
            </div>
          ) : (
            <Link to="/signin" className="navbar-signin-btn" onClick={closeMenu}>Sign In</Link>
          )}

          <button className="navbar-cart-btn" onClick={toggleCart}>
            🛒
            <span className="cart-btn-text">Cart</span>
            {cartCount > 0 && <span key={cartCount} className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile: search icon + hamburger */}
        <div className="mobile-actions">
          <button
            className="mobile-icon-btn"
            onClick={() => setSearchOpen(v => !v)}
            aria-label="Search"
          >
            🔍
          </button>
          <button
            className="mobile-icon-btn cart-mobile-btn"
            onClick={toggleCart}
            aria-label="Cart"
          >
            🛒
            {cartCount > 0 && <span className="cart-badge-mobile">{cartCount}</span>}
          </button>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile search bar (slides down) */}
      {searchOpen && (
        <div className="mobile-search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="mobile-search-close" onClick={() => setSearchOpen(false)}>✕</button>
        </div>
      )}

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/offers"   className="mobile-menu-item" onClick={closeMenu}><span>🎁</span> Offers</Link>
          <Link to="/orders"   className="mobile-menu-item" onClick={closeMenu}>
            <span>📦</span> Orders
            {ordersCount > 0 && <span className="mobile-badge">{ordersCount} active</span>}
          </Link>
          <Link to="/wishlist" className="mobile-menu-item" onClick={closeMenu}>
            <span>♥</span> Wishlist
            {wishlistCount > 0 && <span className="mobile-badge">{wishlistCount}</span>}
          </Link>
          <Link to="/about"    className="mobile-menu-item" onClick={closeMenu}><span>ℹ️</span> About</Link>
          <div className="mobile-menu-divider" />
          {user ? (
            <div className="mobile-menu-user">
              <div className="mobile-user-info">
                <div className="navbar-avatar">{user.name[0].toUpperCase()}</div>
                <div>
                  <div className="mobile-user-name">{user.name}</div>
                  <div className="mobile-user-email">{user.email}</div>
                </div>
              </div>
              <button className="mobile-signout-btn" onClick={() => { onSignOut(); closeMenu(); }}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/signin" className="mobile-signin-btn" onClick={closeMenu}>
              Sign In / Create Account →
            </Link>
          )}
        </div>
      )}

      {/* Overlay to close mobile menu */}
      {menuOpen && <div className="mobile-menu-overlay" onClick={closeMenu} />}
    </>
  );
}

export default Navbar;
