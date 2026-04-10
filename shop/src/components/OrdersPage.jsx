import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STEP_DELAY_MS = 2 * 60 * 60 * 1000;

const STEPS = [
  { icon: "✅", label: "Order Confirmed",  desc: "Your order has been placed." },
  { icon: "📦", label: "Being Packed",     desc: "Carefully packing your fresh items." },
  { icon: "🚚", label: "Out for Delivery", desc: "Your order is on the way!" },
  { icon: "🏠", label: "Delivered",        desc: "Delivered to your doorstep!" },
];

function fmt(d) { return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
function fmtDate(ts) { return new Date(ts).toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" }); }
function getStep(placedAt) {
  const e = Date.now() - placedAt;
  if (e >= STEP_DELAY_MS * 3) return 3;
  if (e >= STEP_DELAY_MS * 2) return 2;
  if (e >= STEP_DELAY_MS)     return 1;
  return 0;
}

function OrderCard({ order }) {
  const [activeStep, setActiveStep] = useState(() => getStep(order.placedAt));
  useEffect(() => {
    const id = setInterval(() => setActiveStep(getStep(order.placedAt)), 30_000);
    return () => clearInterval(id);
  }, [order.placedAt]);

  const stepTimes = STEPS.map((_, i) => new Date(order.placedAt + STEP_DELAY_MS * i));
  const isDelivered = activeStep >= 3;

  return (
    <div className={`order-card${isDelivered ? " delivered" : ""}`}>
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

        {order.address && (
          <div className="order-address">
            <span className="order-address-icon">📍</span>
            <span>{order.address.name} · {order.address.address}, {order.address.city} – {order.address.pincode}</span>
          </div>
        )}

        <div className="order-tracker">
          {STEPS.map((s, i) => {
            const isDone = i < activeStep, isActive = i === activeStep;
            return (
              <div key={i} className="otrack-step">
                {i > 0 && <div className={`otrack-line${isDone || isActive ? " filled" : ""}`} />}
                <div className={`otrack-dot${isDone ? " done" : isActive ? " active" : " pending"}`}>
                  {isDone ? "✓" : s.icon}
                </div>
                <div className="otrack-info">
                  <span className={`otrack-label${isDone ? " done" : isActive ? " active" : ""}`}>{s.label}</span>
                  <span className="otrack-time">{isDone || isActive ? fmt(stepTimes[i]) : `~${fmt(stepTimes[i])}`}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-card-footer">
          <span className="order-total-label">{order.items.reduce((s, i) => s + i.qty, 0)} items</span>
          <span className="order-total-amt">Total: <strong>₹{order.total}</strong></span>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage({ orders, user }) {
  const navigate = useNavigate();
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-hero">
          <h1>📦 My Orders</h1>
          <p>Sign in to view your order history and track deliveries in real time.</p>
        </div>
        <div className="orders-signin-prompt">
          <div className="orders-prompt-icon">🔐</div>
          <h3>Sign in to see your orders</h3>
          <p>Orders are saved to your account and synced across all your devices — even after refresh.</p>
          <Link to="/signin" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", marginTop: 8 }}>
            Sign In / Create Account →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-hero">
        <h1>📦 My Orders</h1>
        <p>{orders.length > 0
          ? `${orders.length} order${orders.length !== 1 ? "s" : ""} · Updates every 2 hours based on your device time.`
          : "Track all your deliveries in real time."}
        </p>
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
          {orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </div>
  );
}
