import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

function WishlistPage({ wishlist, addToCart, toggleWishlist }) {
  const navigate = useNavigate();

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>♥ My Wishlist</h1>
        <p>{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div style={{ fontSize: 64, marginBottom: 16 }}>♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Save items you love to find them easily later.</p>
          <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => navigate("/")}>
            Browse Products →
          </button>
        </div>
      ) : (
        <>
          <div className="products" style={{ padding: "0 40px 60px" }}>
            {wishlist.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                isWishlisted={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WishlistPage;
