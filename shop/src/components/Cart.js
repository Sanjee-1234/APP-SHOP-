import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COUPONS = {
  FRESH20:  { label: "Fresh Week Deal", discount: 0.20 },
  DAIRY33:  { label: "Dairy Delight",   discount: 0.33 },
  FRUIT15:  { label: "Fruit Fiesta",    discount: 0.15 },
  PANTRY10: { label: "Pantry Pick",     discount: 0.10 },
  SAVE50:   { label: "Save ₹50 flat",   flat: 50 },
};

function Cart({ cart, showCart, updateQty, removeFromCart, onClose, appliedCoupon, setAppliedCoupon }) {
  const navigate   = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal  = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery  = subtotal > 0 ? (subtotal >= 499 ? 0 : 30) : 0;

  let discount = 0;
  if (appliedCoupon) {
    const c = COUPONS[appliedCoupon.code];
    if (c) discount = c.flat ? Math.min(c.flat, subtotal) : Math.round(subtotal * c.discount);
  }

  const total     = subtotal + delivery - discount;
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon({ code, ...COUPONS[code] });
      setCouponError("");
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code. Try FRESH20 or SAVE50.");
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className={`cart-panel${showCart ? " active" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart {itemCount > 0 && `(${itemCount})`}</h3>
        <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
      </div>

      <div className="cart-body">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h4>Your cart is empty</h4>
            <p>Browse our fresh products and add something delicious!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price} × {item.qty}</div>
              </div>
              <div className="cart-qty-controls">
                <button className="qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease">−</button>
                <span className="qty-count">{item.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase">+</button>
              </div>
              <div className="cart-item-subtotal">₹{item.price * item.qty}</div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>✕</button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          {/* Coupon */}
          <div className="coupon-wrap">
            {appliedCoupon ? (
              <div className="coupon-applied">
                <span>🎟 <strong>{appliedCoupon.code}</strong> applied! Saving ₹{discount}</span>
                <button onClick={() => setAppliedCoupon(null)} className="coupon-remove">✕</button>
              </div>
            ) : (
              <div className="coupon-row">
                <input
                  className="coupon-input"
                  placeholder="Coupon code"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                />
                <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
              </div>
            )}
            {couponError && <div className="coupon-error">{couponError}</div>}
          </div>

          <div className="cart-summary"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="cart-summary">
            <span>Delivery {subtotal >= 499 && <em style={{ color: "#3d7a50", fontStyle: "normal" }}>(Free!)</em>}</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
          </div>
          {discount > 0 && <div className="cart-summary" style={{ color: "#16a34a" }}><span>Discount</span><span>−₹{discount}</span></div>}
          {subtotal < 499 && (
            <div style={{ fontSize: 12, color: "#9a9a9a", marginTop: 6, marginBottom: 4 }}>
              Add ₹{499 - subtotal} more for free delivery
            </div>
          )}
          <div className="cart-total-row"><span>Total</span><span>₹{total}</span></div>
          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout →</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
