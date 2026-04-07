import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.img} alt={product.name} />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation(); // IMPORTANT
          addToCart(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;