import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const STEPS = [
  { icon: "✅", label: "Order Confirmed",  desc: "Your order has been placed successfully." },
  { icon: "📦", label: "Being Packed",     desc: "Our team is carefully packing your fresh items." },
  { icon: "🚚", label: "Out for Delivery", desc: "Your order is on the way — hang tight!" },
  { icon: "🏠", label: "Delivered",        desc: "Delivered to your doorstep. Enjoy your groceries!" },
];

// Each step unlocks 2 hours (7200 seconds) after the previous one.
const STEP_DELAY_MS = 2 * 60 * 60 * 1000; // 2 hours in ms

function fmt(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function OrderSuccess() {
  const navigate = useNavigate();

  // Generate/retrieve a stable order ID and order placement time
  const [orderId] = useState(() => {
    const saved = sessionStorage.getItem("fm_order_id");
    if (saved) return saved;
    const id = "FM" + Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem("fm_order_id", id);
    return id;
  });

  const [orderTime] = useState(() => {
    const saved = sessionStorage.getItem("fm_order_time");
    if (saved) return parseInt(saved, 10);
    const now = Date.now();
    sessionStorage.setItem("fm_order_time", String(now));
    return now;
  });

  // Compute current step based on real device time
  const getStep = () => {
    const elapsed = Date.now() - orderTime;
    if (elapsed >= STEP_DELAY_MS * 3) return 3; // Delivered
    if (elapsed >= STEP_DELAY_MS * 2) return 2; // Out for Delivery
    if (elapsed >= STEP_DELAY_MS * 1) return 1; // Being Packed
    return 0; // Order Confirmed
  };

  const [activeStep, setActiveStep] = useState(getStep);

  // Re-check every 30 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep(getStep());
    }, 30_000);
    return () => clearInterval(id);
  }, [orderTime]);

  // Step timestamps
  const stepTimes = STEPS.map((_, i) => new Date(orderTime + STEP_DELAY_MS * i));

  const deliveredTime = stepTimes[3];
  const isDelivered = activeStep >= 3;

  return (
    <div className="order-success-page">
      <div className="order-success-card">

        <div className={`order-success-icon${isDelivered ? " gold" : ""}`}>
          {isDelivered ? "🎉" : "✓"}
        </div>

        <h1>{isDelivered ? "Delivered!" : "Order Placed!"}</h1>
        <p className="order-success-sub">
          {isDelivered
            ? "Your fresh groceries have arrived. Enjoy! 🌿"
            : "Thank you for shopping with FreshMart 🌿"}
        </p>

        <div className="order-id-box">
          <span>Order ID</span>
          <strong>{orderId}</strong>
        </div>

        {/* Real-time delivery tracker */}
        <div className="order-track">
          {STEPS.map((s, i) => {
            const isDone   = i < activeStep;
            const isActive = i === activeStep;
            return (
              <div key={i} className="order-track-item">
                {i > 0 && (
                  <div className={`order-track-line${isDone || isActive ? " filled" : ""}`} />
                )}

                <div className={`order-track-dot${isDone ? " done" : isActive ? " active" : " pending"}`}>
                  {isDone ? "✓" : s.icon}
                </div>

                <div className="order-track-right">
                  <span className={`order-track-label${isDone ? " done" : isActive ? " active" : " pending"}`}>
                    {s.label}
                  </span>
                  <span className="order-track-time">
                    {isDone || isActive
                      ? fmt(stepTimes[i])
                      : `~${fmt(stepTimes[i])}`}
                  </span>
                </div>

                {isActive && <p className="order-track-desc">{s.desc}</p>}
              </div>
            );
          })}
        </div>

        <div className="order-eta">
          {isDelivered
            ? <span>✅ Delivered at <strong>{fmt(deliveredTime)}</strong></span>
            : <span>⏰ Expected delivery by <strong>{fmt(deliveredTime)}</strong></span>
          }
        </div>

        <div className="order-success-actions">
          <button className="btn-primary" onClick={() => {
            // Clear so next order gets fresh tracking
            sessionStorage.removeItem("fm_order_id");
            sessionStorage.removeItem("fm_order_time");
            navigate("/");
          }}>
            Continue Shopping →
          </button>
          <button
            className="btn-outline"
            style={{ color: "#1a3a2a", borderColor: "#1a3a2a" }}
            onClick={() => navigate("/offers")}
          >
            View Offers 🎁
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderSuccess;
