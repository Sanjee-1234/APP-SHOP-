import { Link, useNavigate } from "react-router-dom";

function Navbar({ setSearch, cartCount, toggleCart, wishlistCount }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/">
        <div className="logo-icon">🌿</div>
        <span className="logo-text">FreshMart</span>
      </Link>

      <div className="navbar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search vegetables, fruits, pantry..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="navbar-links">
        <Link to="/offers" className="navbar-link">🎁 Offers</Link>
        <Link to="/about"  className="navbar-link">About</Link>
        <Link to="/wishlist" className="navbar-link wishlist-link">
          ♥ Wishlist
          {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
        </Link>
      </div>

      <button className="navbar-cart-btn" onClick={toggleCart}>
        🛒 Cart
        {cartCount > 0 && <span key={cartCount} className="cart-badge">{cartCount}</span>}
      </button>
    </nav>
  );
}

export default Navbar;
