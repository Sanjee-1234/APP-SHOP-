function Cart({ cart, showCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className={`cart-panel ${showCart ? "active" : ""}`}>
      <h3>Your Cart</h3>

      {cart.length === 0 ? (
        <p>Cart is empty 😢</p>
      ) : (
        cart.map((item) => (
          <p key={item.id}>
            {item.name} x {item.qty}
          </p>
        ))
      )}

      <h4>Total: ₹{total}</h4>
      <button>Checkout</button>
    </div>
  );
}

export default Cart;