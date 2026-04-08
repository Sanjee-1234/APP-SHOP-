import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const STEPS = [
  { icon: "✅", label: "Order Confirmed",   desc: "Your order has been placed successfully." },
  { icon: "📦", label: "Being Packed",      desc: "Our team is carefully packing your items." },
  { icon: "🚚", label: "Out for Delivery",  desc: "Your order is on its way to you!" },
  { icon: "🏠", label: "Delivered",         desc: "Delivered to your doorstep. Enjoy!" },
];

function OrderSuccess() {
  const navigate = useNavigate();
  const [orderId]    = useState(() => "FM" + Math.floor(100000 + Math.random() * 900000));
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timers = [
      setTimeout(() => setActiveStep(1), 1200),
      setTimeout(() => setActiveStep(2), 2600),
      setTimeout(() => setActiveStep(3), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="order-success-page">
      <div className="order-success-card">

        <div className={`order-success-icon${activeStep >= 3 ? " gold" : ""}`}>
          {activeStep >= 3 ? "🎉" : "✓"}
        </div>

        <h1>{activeStep >= 3 ? "Delivered!" : "Order Placed!"}</h1>
        <p className="order-success-sub">
          {activeStep >= 3
            ? "Your fresh groceries have arrived. Enjoy! 🌿"
            : "Thank you for shopping with FreshMart 🌿"}
        </p>

        <div className="order-id-box">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        {/* Animated Progress Track */}
        <div className="order-track">
          {STEPS.map((s, i) => {
            const isDone   = i < activeStep;
            const isActive = i === activeStep;
            return (
              <div key={i} className="order-track-item">
                {/* connector line */}
                {i > 0 && (
                  <div className={`order-track-line${isDone || isActive ? " filled" : ""}`} />
                )}
                <div className={`order-track-dot${isDone ? " done" : isActive ? " active" : " pending"}`}>
                  {isDone ? "✓" : s.icon}
                </div>
                <span className={`order-track-label${isDone ? " done" : isActive ? " active" : " pending"}`}>
                  {s.label}
                </span>
                {isActive && <p className="order-track-desc">{s.desc}</p>}
              </div>
            );
          })}
        </div>

        <div className="order-eta">
          ⏰ Estimated delivery:{" "}
          <strong>{activeStep >= 3 ? "Delivered ✓" : "Today by 7:00 PM"}</strong>
        </div>

        <div className="order-success-actions">
          <button className="btn-primary" onClick={() => navigate("/")}>Continue Shopping →</button>
          <button className="btn-outline" style={{ color: "#1a3a2a", borderColor: "#1a3a2a" }} onClick={() => navigate("/offers")}>
            View Offers 🎁
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
