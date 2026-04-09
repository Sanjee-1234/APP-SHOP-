import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart, toggleWishlist, isWishlisted }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="card-image-wrap">
        <img src={product.img} alt={product.name} loading="lazy" />
        <span className="card-badge">{product.category}</span>
        <button
          className={`wishlist-btn${isWishlisted ? " active" : ""}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-unit">{product.unit}</span>
          <span className="card-rating">★ {product.rating}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="card-footer">
          <div className="card-price">₹{product.price}<span>/ {product.unit}</span></div>
          <button
            className="add-btn"
            title={`Add ${product.name} to cart`}
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          >+</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
