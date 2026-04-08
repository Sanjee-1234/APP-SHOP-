import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage({ cart, appliedCoupon, setAppliedCoupon, clearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=delivery, 2=payment
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", pincode: "", state: "",
    payMethod: "upi",
  });
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal >= 499 ? 0 : 30;
  const discount = appliedCoupon
    ? (appliedCoupon.flat ? Math.min(appliedCoupon.flat, subtotal) : Math.round(subtotal * (appliedCoupon.discount || 0)))
    : 0;
  const total = subtotal + delivery - discount;

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.email.includes("@"))     e.email = "Enter a valid email address";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

 const placeOrder = () => {
  const orderData = {
items: cart.map(item => item.name).join(", "),    total: total,
  };

  
  fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);

      clearCart();
      setAppliedCoupon(null);
      navigate("/order-success");
    })
    .catch((err) => console.log(err));
};

  if (cart.length === 0 && step === 1) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
        <h2>Your cart is empty</h2>
        <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => navigate("/")}>Shop Now →</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-steps">
        <div className={`checkout-step ${step >= 1 ? "active" : ""}`}>
          <div className="step-num">1</div>
          <span>Delivery</span>
        </div>
        <div className="step-line" />
        <div className={`checkout-step ${step >= 2 ? "active" : ""}`}>
          <div className="step-num">2</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-wrap">
          {step === 1 && (
            <div className="checkout-section">
              <h2>Delivery Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Ravi Kumar" />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile number" maxLength={10} />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="form-group form-group-full">
                  <label>Email Address</label>
                  <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group form-group-full">
                  <label>Street Address</label>
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="House no, Street, Area" />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Coimbatore" />
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="6-digit pincode" maxLength={6} />
                  {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select value={form.state} onChange={(e) => update("state", e.target.value)}>
                    <option value="">Select State</option>
                    {["Tamil Nadu","Karnataka","Kerala","Andhra Pradesh","Maharashtra","Delhi","Gujarat","Rajasthan","Telangana","West Bengal"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 24, width: "100%", padding: "16px" }}
                onClick={() => { if (validateStep1()) setStep(2); }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-section">
              <button className="product-back" onClick={() => setStep(1)}>← Back to Delivery</button>
              <h2>Payment Method</h2>
              <div className="pay-options">
                {[
                  { value: "upi",  label: "UPI / GPay / PhonePe", icon: "📱" },
                  { value: "card", label: "Credit / Debit Card",   icon: "💳" },
                  { value: "cod",  label: "Cash on Delivery",       icon: "💵" },
                  { value: "nb",   label: "Net Banking",            icon: "🏦" },
                ].map(opt => (
                  <label key={opt.value} className={`pay-option${form.payMethod === opt.value ? " selected" : ""}`}>
                    <input type="radio" name="pay" value={opt.value} checked={form.payMethod === opt.value} onChange={() => update("payMethod", opt.value)} />
                    <span className="pay-icon">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {form.payMethod === "card" && (
                <div className="form-grid" style={{ marginTop: 16 }}>
                  <div className="form-group form-group-full">
                    <label>Card Number</label>
                    <input placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className="form-group">
                    <label>Expiry</label>
                    <input placeholder="MM / YY" maxLength={5} />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input placeholder="•••" maxLength={3} type="password" />
                  </div>
                </div>
              )}
              {form.payMethod === "upi" && (
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label>UPI ID</label>
                  <input placeholder="yourname@upi" />
                </div>
              )}
              <button className="btn-primary" style={{ marginTop: 28, width: "100%", padding: "16px", fontSize: 16 }} onClick={placeOrder}>
                🛒 Place Order — ₹{total}
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#9a9a9a", marginTop: 12 }}>
                🔒 Your payment information is encrypted and secure.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-items">
            {cart.map(item => (
              <div className="checkout-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="checkout-item-info">
                  <span>{item.name}</span>
                  <span style={{ color: "#9a9a9a", fontSize: 12 }}>× {item.qty}</span>
                </div>
                <span className="checkout-item-price">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "14px 0" }} />
          <div className="checkout-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="checkout-row"><span>Delivery</span><span>{delivery === 0 ? "Free" : `₹${delivery}`}</span></div>
          {discount > 0 && <div className="checkout-row" style={{ color: "#16a34a" }}><span>Discount ({appliedCoupon.code})</span><span>−₹{discount}</span></div>}
          <div className="checkout-row checkout-total"><span>Total</span><span>₹{total}</span></div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
