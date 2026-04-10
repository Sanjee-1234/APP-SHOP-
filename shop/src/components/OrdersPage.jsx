import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STEP_DELAY_MS = 2 * 60 * 60 * 1000; // 2 hours

const STEPS = [
  { icon: "✅", label: "Order Confirmed",  desc: "Your order has been placed successfully." },
  { icon: "📦", label: "Being Packed",     desc: "Our team is carefully packing your fresh items." },
  { icon: "🚚", label: "Out for Delivery", desc: "Your order is on the way!" },
  { icon: "🏠", label: "Delivered",        desc: "Delivered to your doorstep. Enjoy!" },
];

function fmt(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function fmtDate(ts) {
  return new Date(ts).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
}

function getStep(placedAt) {
  const elapsed = Date.now() - placedAt;
  if (elapsed >= STEP_DELAY_MS * 3) return 3;
  if (elapsed >= STEP_DELAY_MS * 2) return 2;
  if (elapsed >= STEP_DELAY_MS * 1) return 1;
  return 0;
}

/* ── Single order card with its own live tracker ── */
function OrderCard({ order }) {
  const [activeStep, setActiveStep] = useState(() => getStep(order.placedAt));

  // Refresh every 30s so card auto-advances when real time crosses threshold
  useEffect(() => {
    const id = setInterval(() => setActiveStep(getStep(order.placedAt)), 30_000);
    return () => clearInterval(id);
  }, [order.placedAt]);

  const stepTimes = STEPS.map((_, i) => new Date(order.placedAt + STEP_DELAY_MS * i));
  const isDelivered = activeStep >= 3;
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0) + (order.total - order.subtotal || 0);

  return (
    <div className={`order-card${isDelivered ? " delivered" : ""}`}>
      {/* Order header */}
      <div className="order-card-header">
        <div className="order-card-meta">
          <span className="order-card-id">#{order.id}</span>
          <span className="order-card-date">{fmtDate(order.placedAt)}</span>
        </div>
        <div className={`order-status-pill ${isDelivered ? "pill-delivered" : "pill-active"}`}>
          {isDelivered ? "✓ Delivered" : "🚚 In Progress"}
        </div>
      </div>

      <div className="order-card-body">
        {/* Items preview */}
        <div className="order-items-preview">
          {order.items.slice(0, 4).map((item) => (
            <div className="order-item-chip" key={item.id}>
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
              <span className="order-item-qty">×{item.qty}</span>
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="order-item-more">+{order.items.length - 4} more</div>
          )}
        </div>

        {/* Delivery address */}
        {order.address && (
          <div className="order-address">
            <span className="order-address-icon">📍</span>
            <span>{order.address.name} · {order.address.address}, {order.address.city} – {order.address.pincode}</span>
          </div>
        )}

        {/* Live tracker */}
        <div className="order-tracker">
          {STEPS.map((s, i) => {
            const isDone   = i < activeStep;
            const isActive = i === activeStep;
            return (
              <div key={i} className="otrack-step">
                {/* Connector line */}
                {i > 0 && (
                  <div className={`otrack-line${isDone || isActive ? " filled" : ""}`} />
                )}
                <div className={`otrack-dot${isDone ? " done" : isActive ? " active" : " pending"}`}>
                  {isDone ? "✓" : s.icon}
                </div>
                <div className="otrack-info">
                  <span className={`otrack-label${isDone ? " done" : isActive ? " active" : ""}`}>
                    {s.label}
                  </span>
                  <span className="otrack-time">
                    {isDone || isActive ? fmt(stepTimes[i]) : `~${fmt(stepTimes[i])}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="order-card-footer">
          <span className="order-total-label">{order.items.reduce((s,i) => s + i.qty, 0)} items</span>
          <span className="order-total-amt">Total: <strong>₹{order.total}</strong></span>
        </div>
      </div>
    </div>
  );
}

/* ── Orders page ── */
export default function OrdersPage({ orders }) {
  const navigate = useNavigate();
  // Re-render every minute to keep all trackers fresh
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-hero">
        <h1>📦 My Orders</h1>
        <p>Track all your deliveries in real time. Each order updates automatically every 2 hours.</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-empty-icon">🛍️</div>
          <h3>No orders yet</h3>
          <p>Place your first order and track it live right here.</p>
          <button className="btn-primary" onClick={() => navigate("/")}>Shop Now →</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
