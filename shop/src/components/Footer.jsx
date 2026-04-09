import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon-sm">🌿</span>
            <span className="footer-logo-text">FreshMart</span>
          </div>
          <p>Bringing the freshest farm produce directly to your doorstep since 2021.</p>
          <div className="footer-social">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Shop</h5>
          <Link to="/">All Products</Link>
          <Link to="/offers">Offers &amp; Deals</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <Link to="/about">About Us</Link>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">Press</a>
        </div>

        <div className="footer-col">
          <h5>Support</h5>
          <a href="#">Help Centre</a>
          <a href="#">Track Order</a>
          <a href="#">Returns</a>
          <a href="#">Contact Us</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 FreshMart. All rights reserved.</span>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
