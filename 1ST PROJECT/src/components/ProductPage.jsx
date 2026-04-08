import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const REVIEWS = [
  { name: "Priya S.",    rating: 5, comment: "Absolutely fresh! Delivered within 3 hours of ordering. Will buy again.", date: "2 days ago" },
  { name: "Rahul M.",    rating: 4, comment: "Great quality, the packaging was neat and the product was in perfect condition.", date: "1 week ago" },
  { name: "Ananya K.",   rating: 5, comment: "Best grocery delivery app. The produce is always fresh and prices are reasonable.", date: "2 weeks ago" },
  { name: "Karthik R.",  rating: 4, comment: "Good product. Slightly smaller than expected but the taste is excellent.", date: "3 weeks ago" },
];

function StarRating({ value }) {
  return (
    <span className="product-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= value ? "#c8973a" : "#d1d5db" }}>★</span>
      ))}
    </span>
  );
}

function ProductPage({ products, addToCart, toggleWishlist, isWishlisted }) {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id == id);

  if (!product) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center", color: "#9a9a9a" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h2 style={{ marginBottom: 12 }}>Product not found</h2>
        <button className="btn-primary" style={{ display: "inline-flex" }} onClick={() => navigate("/")}>← Back to shop</button>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id != id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-page">
      <button className="product-back" onClick={() => navigate(-1)}>← Back to products</button>

      <div className="product-layout">
        <div className="product-image-box">
          <img src={product.img} alt={product.name} />
          <button
            className={`product-wishlist-btn${wishlisted ? " active" : ""}`}
            onClick={() => toggleWishlist(product)}
          >
            {wishlisted ? "♥" : "♡"} {wishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>

        <div className="product-info">
          <span className="product-category-badge">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="product-unit">Per {product.unit}</div>

          <div className="product-rating">
            <StarRating value={Math.round(product.rating)} />
            <span>{product.rating} · {REVIEWS.length} reviews</span>
          </div>

          <div className="product-price">₹{product.price}</div>

          <p className="product-desc">{product.desc}</p>

          <div className="product-qty-row">
            <div className="product-qty-controls">
              <button className="product-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="product-qty-display">{qty}</span>
              <button className="product-qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button className="product-add-btn" onClick={() => addToCart(product, qty)}>
              Add {qty > 1 ? `${qty} ×` : ""} to Cart — ₹{product.price * qty}
            </button>
          </div>

          <hr className="product-divider" />

          <div className="product-features">
            {[
              ["✓", "Quality-checked & fresh daily"],
              ["🚚", "Same-day delivery available"],
              ["🔄", "Easy 24h return policy"],
              ["🌿", "Sourced from trusted farmers"],
            ].map(([icon, text]) => (
              <div className="product-feature" key={text}>
                <div className="feature-icon">{icon}</div>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews-summary">
          <div className="reviews-avg">
            <span className="reviews-avg-num">{product.rating}</span>
            <StarRating value={Math.round(product.rating)} />
            <span className="reviews-count">{REVIEWS.length} reviews</span>
          </div>
        </div>
        <div className="reviews-list">
          {REVIEWS.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-header">
                <div className="review-avatar">{r.name[0]}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-date">{r.date}</div>
                </div>
                <StarRating value={r.rating} />
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2>More {product.category}</h2>
          <div className="products">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted(item.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
