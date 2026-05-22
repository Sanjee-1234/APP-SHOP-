import { useState, useMemo } from "react";

const STEPS = ["Order Confirmed", "Being Packed", "Out for Delivery", "Delivered"];
const STEP_DELAY_MS = 2 * 60 * 60 * 1000;

function getStep(placedAt) {
  const e = Date.now() - placedAt;
  if (e >= STEP_DELAY_MS * 3) return 3;
  if (e >= STEP_DELAY_MS * 2) return 2;
  if (e >= STEP_DELAY_MS)     return 1;
  return 0;
}

function fmtDate(ts) {
  return new Date(ts).toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const STATUS_ICONS = ["✅", "📦", "🚚", "🏠"];
const STATUS_COLORS = ["#2d5a3d", "#c8973a", "#1d6fb5", "#3d7a50"];

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-icon">{icon}</div>
      <div className="admin-stat-body">
        <div className="admin-stat-value">{value}</div>
        <div className="admin-stat-label">{label}</div>
        {sub && <div className="admin-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

function OrderRow({ order, expanded, onToggle }) {
  const step = getStep(order.placedAt);
  const isDelivered = step >= 3;
  const statusLabel = STEPS[step];
  const statusIcon  = STATUS_ICONS[step];
  const statusColor = STATUS_COLORS[step];
  const totalQty = order.items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className={`admin-order-row${expanded ? " admin-row-open" : ""}`} onClick={onToggle}>
        <div className="admin-col admin-col-id">
          <span className="admin-order-id">#{order.id}</span>
          <span className="admin-order-date">{fmtDate(order.placedAt)}</span>
        </div>

        <div className="admin-col admin-col-customer">
          {order.address ? (
            <>
              <span className="admin-customer-name">{order.address.name}</span>
              <span className="admin-customer-contact">{order.address.phone} · {order.address.email}</span>
            </>
          ) : (
            <span className="admin-customer-name">Guest</span>
          )}
        </div>

        <div className="admin-col admin-col-items">
          <span className="admin-items-count">{totalQty} item{totalQty !== 1 ? "s" : ""}</span>
          <span className="admin-items-preview">
            {order.items.slice(0, 2).map(i => i.name).join(", ")}
            {order.items.length > 2 ? ` +${order.items.length - 2}` : ""}
          </span>
        </div>

        <div className="admin-col admin-col-pay">
          <span className="admin-pay-method">{
            { upi: "📱 UPI", card: "💳 Card", cod: "💵 COD", nb: "🏦 Net Banking" }[order.payMethod] || order.payMethod
          }</span>
        </div>

        <div className="admin-col admin-col-total">
          <span className="admin-total-amt">₹{order.total}</span>
          {order.discount > 0 && <span className="admin-discount-tag">−₹{order.discount} off</span>}
        </div>

        <div className="admin-col admin-col-status">
          <span className="admin-status-pill" style={{ background: statusColor + "18", color: statusColor, border: `1px solid ${statusColor}40` }}>
            {statusIcon} {statusLabel}
          </span>
        </div>

        <div className="admin-col admin-col-toggle">
          <span className="admin-expand-btn">{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div className="admin-order-detail">
          <div className="admin-detail-grid">
            {/* Items list */}
            <div className="admin-detail-section">
              <h4>🛒 Items Ordered</h4>
              <div className="admin-detail-items">
                {order.items.map(item => (
                  <div key={item.id} className="admin-detail-item">
                    <img src={item.img} alt={item.name} className="admin-item-img" />
                    <div className="admin-item-info">
                      <span className="admin-item-name">{item.name}</span>
                      <span className="admin-item-unit">{item.unit}</span>
                    </div>
                    <span className="admin-item-qty">×{item.qty}</span>
                    <span className="admin-item-price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="admin-detail-section">
              <h4>📍 Delivery Address</h4>
              {order.address ? (
                <div className="admin-address-block">
                  <p><strong>{order.address.name}</strong></p>
                  <p>{order.address.address}</p>
                  <p>{order.address.city} — {order.address.pincode}</p>
                  {order.address.state && <p>{order.address.state}</p>}
                  <p>📞 {order.address.phone}</p>
                  <p>✉️ {order.address.email}</p>
                </div>
              ) : <p className="admin-na">No address recorded</p>}
            </div>

            {/* Pricing breakdown */}
            <div className="admin-detail-section">
              <h4>💰 Price Breakdown</h4>
              <div className="admin-price-rows">
                <div className="admin-price-row"><span>Subtotal</span><span>₹{order.subtotal ?? order.total}</span></div>
                <div className="admin-price-row"><span>Delivery</span><span>{order.delivery === 0 ? "Free" : `₹${order.delivery}`}</span></div>
                {order.discount > 0 && (
                  <div className="admin-price-row admin-price-discount">
                    <span>Discount {order.coupon ? `(${order.coupon})` : ""}</span>
                    <span>−₹{order.discount}</span>
                  </div>
                )}
                <div className="admin-price-row admin-price-total"><span>Total Paid</span><span>₹{order.total}</span></div>
              </div>
              <div className="admin-pay-badge">
                {{ upi: "📱 UPI / GPay", card: "💳 Card", cod: "💵 Cash on Delivery", nb: "🏦 Net Banking" }[order.payMethod] || order.payMethod}
              </div>
            </div>

            {/* Delivery tracker */}
            <div className="admin-detail-section">
              <h4>🚚 Delivery Status</h4>
              <div className="admin-mini-tracker">
                {STEPS.map((s, i) => {
                  const done   = i < step;
                  const active = i === step;
                  return (
                    <div key={i} className="admin-track-step">
                      <div className={`admin-track-dot${done ? " done" : active ? " active" : " pending"}`}>
                        {done ? "✓" : STATUS_ICONS[i]}
                      </div>
                      <span className={`admin-track-label${done ? " done" : active ? " active" : ""}`}>{s}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function AdminPage({ orders, onBack }) {
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [sortBy, setSortBy]       = useState("newest");

  // Aggregate all orders from all localStorage accounts
  const allOrders = useMemo(() => {
    const global = [];
    try {
      // Collect from global orders store
      const raw = localStorage.getItem("fm_global_orders");
      if (raw) global.push(...JSON.parse(raw));
    } catch {}
    // Merge with current session orders, dedup by id
    const merged = [...orders, ...global];
    const seen = new Set();
    return merged.filter(o => { if (seen.has(o.id)) return false; seen.add(o.id); return true; });
  }, [orders]);

  const filtered = useMemo(() => {
    let list = allOrders.filter(o => {
      const step = getStep(o.placedAt);
      if (filter === "active")    return step < 3;
      if (filter === "delivered") return step >= 3;
      return true;
    });
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.address?.name?.toLowerCase().includes(q) ||
        o.address?.city?.toLowerCase().includes(q) ||
        o.items.some(i => i.name.toLowerCase().includes(q))
      );
    }
    if (sortBy === "newest")    list = [...list].sort((a, b) => b.placedAt - a.placedAt);
    if (sortBy === "oldest")    list = [...list].sort((a, b) => a.placedAt - b.placedAt);
    if (sortBy === "highest")   list = [...list].sort((a, b) => b.total - a.total);
    if (sortBy === "lowest")    list = [...list].sort((a, b) => a.total - b.total);
    return list;
  }, [allOrders, filter, search, sortBy]);

  // Stats
  const totalRevenue  = allOrders.reduce((s, o) => s + o.total, 0);
  const activeCount   = allOrders.filter(o => getStep(o.placedAt) < 3).length;
  const deliveredCount = allOrders.filter(o => getStep(o.placedAt) >= 3).length;
  const avgOrder      = allOrders.length ? Math.round(totalRevenue / allOrders.length) : 0;

  return (
    <div className="admin-root">
      {/* Top bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <button className="admin-back-btn" onClick={onBack}>← Back to Portal</button>
          <div className="admin-brand">
            <span>🌿</span>
            <span>FreshMart Admin</span>
          </div>
        </div>
        <div className="admin-topbar-right">
          <div className="admin-badge-live">● Live</div>
          <div className="admin-topbar-user">⚙️ Admin</div>
        </div>
      </div>

      <div className="admin-body">
        {/* Page title */}
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Orders Dashboard</h1>
            <p className="admin-page-sub">All customer orders · Updates in real time</p>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats-row">
          <StatCard icon="🧾" label="Total Orders"   value={allOrders.length} sub="All time" />
          <StatCard icon="💰" label="Total Revenue"  value={`₹${totalRevenue.toLocaleString()}`} sub={`Avg ₹${avgOrder}/order`} />
          <StatCard icon="🚚" label="Active Deliveries" value={activeCount} sub="In progress" />
          <StatCard icon="✅" label="Delivered"      value={deliveredCount} sub="Completed" />
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-search-wrap">
            <span className="admin-search-icon">🔍</span>
            <input
              className="admin-search"
              placeholder="Search by order ID, customer, city, or product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="admin-search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>

          <div className="admin-filter-tabs">
            {[["all", "All Orders"], ["active", "🚚 Active"], ["delivered", "✅ Delivered"]].map(([val, lbl]) => (
              <button
                key={val}
                className={`admin-filter-tab${filter === val ? " active" : ""}`}
                onClick={() => setFilter(val)}
              >
                {lbl}
                <span className="admin-tab-count">
                  {val === "all" ? allOrders.length
                   : val === "active" ? activeCount
                   : deliveredCount}
                </span>
              </button>
            ))}
          </div>

          <select className="admin-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>

        {/* Table */}
        {allOrders.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">📭</div>
            <h3>No orders yet</h3>
            <p>Customer orders will appear here once they start shopping.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            {/* Column headers */}
            <div className="admin-table-header">
              <div className="admin-col admin-col-id">Order ID / Date</div>
              <div className="admin-col admin-col-customer">Customer</div>
              <div className="admin-col admin-col-items">Items</div>
              <div className="admin-col admin-col-pay">Payment</div>
              <div className="admin-col admin-col-total">Amount</div>
              <div className="admin-col admin-col-status">Status</div>
              <div className="admin-col admin-col-toggle" />
            </div>

            {filtered.length === 0 ? (
              <div className="admin-no-results">
                <span>🔍</span> No orders match your filters
              </div>
            ) : (
              filtered.map(order => (
                <OrderRow
                  key={order.id}
                  order={order}
                  expanded={expandedId === order.id}
                  onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
