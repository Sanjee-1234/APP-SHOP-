import { useParams } from "react-router-dom";

function ProductPage({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find((p) => p.id == id);

  const suggestions = products
    .filter((p) => p.id != id)
    .slice(0, 4);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>

      <img src={product.img} width="200" />

      <p>Price: ₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <hr />

      <h3>Suggested Items</h3>

      <div className="products">
        {suggestions.map((item) => (
          <div key={item.id} className="card">
            <img src={item.img} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;