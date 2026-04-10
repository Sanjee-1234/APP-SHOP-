import { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import OffersPage from "./components/OffersPage";
import WishlistPage from "./components/WishlistPage";
import CheckoutPage from "./components/CheckoutPage";
import OrdersPage from "./components/OrdersPage";
import AboutPage from "./components/AboutPage";
import SignInPage from "./components/SignInPage";

export const products = [
  { id: 1,  name: "Tomato",             price: 40,  category: "Vegetables", unit: "500 g",   rating: 4.3, img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500&auto=format&fit=crop&q=80", desc: "Vine-ripened farm tomatoes bursting with flavour. Great for curries, salads, and soups." },
  { id: 2,  name: "Potato",             price: 25,  category: "Vegetables", unit: "1 kg",    rating: 4.4, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80", desc: "Fresh country potatoes, ideal for frying, boiling, or mashing. Starchy and hearty." },
  { id: 3,  name: "Onion",              price: 35,  category: "Vegetables", unit: "500 g",   rating: 4.2, img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=500&auto=format&fit=crop&q=80", desc: "Pungent red onions sourced from Nasik farms. The backbone of Indian cooking." },
  { id: 4,  name: "Spinach",            price: 30,  category: "Vegetables", unit: "250 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80", desc: "Tender baby spinach, freshly harvested. Rich in iron and vitamins A, C, and K." },
  { id: 5,  name: "Carrot",             price: 35,  category: "Vegetables", unit: "500 g",   rating: 4.4, img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500&auto=format&fit=crop&q=80", desc: "Sweet, crunchy carrots full of beta-carotene. Great for halwa, salads, and juices." },
  { id: 6,  name: "Cauliflower",        price: 45,  category: "Vegetables", unit: "1 pc",    rating: 4.3, img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop&q=80", desc: "Fresh firm cauliflower, perfect for aloo-gobi, manchurian, or roasted dishes." },
  { id: 7,  name: "Green Chilli",       price: 15,  category: "Vegetables", unit: "100 g",   rating: 4.2, img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80", desc: "Fiery green chillies from local farms. Essential for South Indian cooking." },
  { id: 8,  name: "Brinjal",            price: 30,  category: "Vegetables", unit: "500 g",   rating: 4.1, img: "https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=500&auto=format&fit=crop&q=80", desc: "Glossy, fresh brinjals (eggplant) perfect for baingan bharta or stir fries." },
  { id: 9,  name: "Capsicum",           price: 50,  category: "Vegetables", unit: "250 g",   rating: 4.3, img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80", desc: "Colourful bell peppers — sweet, crunchy, and loaded with Vitamin C." },
  { id: 10, name: "Lady's Finger",      price: 28,  category: "Vegetables", unit: "250 g",   rating: 4.2, img: "https://images.unsplash.com/photo-1639359312498-e2eb2937b1e9?w=500&auto=format&fit=crop&q=80", desc: "Fresh okra with a characteristic tender crunch. Ideal for sambar and stir fries." },
  { id: 11, name: "Fresh Apple",        price: 80,  category: "Fruits",     unit: "500 g",   rating: 4.6, img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop&q=80", desc: "Crisp Shimla apples handpicked at peak ripeness. Sweet, crunchy, and nutrient-rich." },
  { id: 12, name: "Banana",             price: 60,  category: "Fruits",     unit: "6 pcs",   rating: 4.7, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80", desc: "Ripe Robusta bananas, naturally sweet and energy-packed. A perfect snack anytime." },
  { id: 13, name: "Mango",              price: 90,  category: "Fruits",     unit: "500 g",   rating: 4.9, img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80", desc: "Alphonso mangoes — the king of fruits. Creamy, saffron-hued, and irresistibly sweet." },
  { id: 14, name: "Green Grapes",       price: 75,  category: "Fruits",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?w=500&auto=format&fit=crop&q=80", desc: "Seedless green grapes, juicy and refreshing. Imported and quality-checked." },
  { id: 15, name: "Watermelon",         price: 50,  category: "Fruits",     unit: "1 pc",    rating: 4.6, img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=500&auto=format&fit=crop&q=80", desc: "Seedless summer watermelon, hydrating and sweet. Ideal for beating the heat." },
  { id: 16, name: "Pomegranate",        price: 85,  category: "Fruits",     unit: "2 pcs",   rating: 4.7, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80", desc: "Ruby red pomegranates bursting with antioxidants and juicy arils." },
  { id: 17, name: "Papaya",             price: 45,  category: "Fruits",     unit: "1 pc",    rating: 4.4, img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=500&auto=format&fit=crop&q=80", desc: "Ripe, buttery papaya with a tropical sweetness. Rich in papain and digestive enzymes." },
  { id: 18, name: "Guava",              price: 40,  category: "Fruits",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=500&auto=format&fit=crop&q=80", desc: "Fresh guavas with pink flesh — high in Vitamin C and fibre. Great eaten fresh or juiced." },
  { id: 19, name: "Full Cream Milk",    price: 30,  category: "Dairy",      unit: "500 ml",  rating: 4.8, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80", desc: "Farm-fresh full cream milk, pasteurized and packed daily for maximum freshness." },
  { id: 20, name: "Farm Eggs",          price: 70,  category: "Dairy",      unit: "6 pcs",   rating: 4.9, img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop&q=80", desc: "Free-range eggs from cage-free hens, rich in protein and naturally flavourful." },
  { id: 21, name: "Curd / Yogurt",      price: 40,  category: "Dairy",      unit: "400 g",   rating: 4.7, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80", desc: "Thick, creamy set curd made from full-cream milk. A probiotic powerhouse." },
  { id: 22, name: "Paneer",             price: 95,  category: "Dairy",      unit: "200 g",   rating: 4.8, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80", desc: "Fresh cottage cheese made daily. Soft, creamy, and perfect for curries or snacks." },
  { id: 23, name: "Butter",             price: 55,  category: "Dairy",      unit: "100 g",   rating: 4.6, img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=80", desc: "Churned white butter made from fresh cream. Rich, luscious, and unsalted." },
  { id: 24, name: "Cheese Slices",      price: 85,  category: "Dairy",      unit: "200 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80", desc: "Processed cheese slices, perfect for sandwiches, burgers, and grilled dishes." },
  { id: 25, name: "Basmati Rice",       price: 50,  category: "Grains",     unit: "1 kg",    rating: 4.5, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80", desc: "Premium long-grain basmati rice, aged for extra aroma. Perfect for biryani and pulao." },
  { id: 26, name: "Oats",               price: 85,  category: "Grains",     unit: "500 g",   rating: 4.6, img: "https://images.unsplash.com/photo-1614385451897-1f8e47af264d?w=500&auto=format&fit=crop&q=80", desc: "Rolled oats — a fibre-rich breakfast staple. Quick-cook and heart-healthy." },
  { id: 27, name: "Toor Dal",           price: 65,  category: "Grains",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80", desc: "Premium yellow split pigeon peas (Toor Dal). Protein-rich and a dal staple." },
  { id: 28, name: "Whole Wheat Atta",   price: 70,  category: "Grains",     unit: "1 kg",    rating: 4.7, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80", desc: "Stone-ground whole wheat flour — finely milled for soft rotis and parathas." },
  { id: 29, name: "Moong Dal",          price: 60,  category: "Grains",     unit: "500 g",   rating: 4.4, img: "https://images.unsplash.com/photo-1612257416648-8c0f6cf21fa0?w=500&auto=format&fit=crop&q=80", desc: "Split green gram lentils, easy to digest and loaded with plant protein." },
  { id: 30, name: "Brown Rice",         price: 90,  category: "Grains",     unit: "1 kg",    rating: 4.5, img: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=500&auto=format&fit=crop&q=80", desc: "Nutty, wholesome brown rice retaining its bran layer for extra nutrition and fibre." },
  { id: 31, name: "Whole Wheat Bread",  price: 45,  category: "Bakery",     unit: "400 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=500&auto=format&fit=crop&q=80", desc: "Freshly baked whole wheat bread, soft and nutritious. No preservatives added." },
  { id: 32, name: "Sourdough Loaf",     price: 110, category: "Bakery",     unit: "400 g",   rating: 4.8, img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop&q=80", desc: "Artisanal slow-fermented sourdough, baked fresh each morning. Tangy and chewy." },
  { id: 33, name: "Croissant",          price: 60,  category: "Bakery",     unit: "2 pcs",   rating: 4.5, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80", desc: "Butter-laminated croissants baked fresh every morning. Flaky, golden, and rich." },
  { id: 34, name: "Multigrain Bun",     price: 35,  category: "Bakery",     unit: "4 pcs",   rating: 4.3, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80", desc: "Soft multigrain buns packed with seeds and grains. Perfect for healthy burgers." },
  { id: 35, name: "White Sugar",        price: 55,  category: "Pantry",     unit: "1 kg",    rating: 4.4, img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&auto=format&fit=crop&q=80", desc: "Refined crystal white sugar, ideal for all your sweet preparations and beverages." },
  { id: 36, name: "Rock Salt",          price: 20,  category: "Pantry",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1590137876181-2a5a7e340de2?w=500&auto=format&fit=crop&q=80", desc: "Natural Himalayan rock salt, mineral-rich and unrefined. A healthier salt choice." },
  { id: 37, name: "Sunflower Oil",      price: 120, category: "Pantry",     unit: "1 L",     rating: 4.6, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80", desc: "Refined sunflower oil, light on digestion and ideal for everyday Indian cooking." },
  { id: 38, name: "Coconut Oil",        price: 140, category: "Pantry",     unit: "500 ml",  rating: 4.8, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80", desc: "Cold-pressed virgin coconut oil with a natural aroma. Multi-purpose and nutritious." },
  { id: 39, name: "Turmeric Powder",    price: 45,  category: "Pantry",     unit: "100 g",   rating: 4.7, img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&auto=format&fit=crop&q=80", desc: "Pure Erode turmeric powder with high curcumin content. Vibrant colour and flavour." },
  { id: 40, name: "Honey",              price: 180, category: "Pantry",     unit: "500 g",   rating: 4.9, img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80", desc: "Raw wildflower honey, unprocessed and packed with natural enzymes and antioxidants." },
];

export const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy", "Grains", "Bakery", "Pantry"];

export const OFFERS = [
  { id: "o1", title: "Fresh Week Deal", desc: "20% off all Vegetables", discount: 20, category: "Vegetables", code: "FRESH20", color: "#2d5a3d", expires: "Apr 30, 2025" },
  { id: "o2", title: "Dairy Delight",   desc: "Buy 2 dairy products, get 1 free", discount: 33, category: "Dairy", code: "DAIRY33", color: "#b45309", expires: "Apr 25, 2025" },
  { id: "o3", title: "Fruit Fiesta",    desc: "15% off all Fruits", discount: 15, category: "Fruits", code: "FRUIT15", color: "#be185d", expires: "May 5, 2025" },
  { id: "o4", title: "Pantry Pick",     desc: "₹30 off orders above ₹300", discount: 10, category: "Pantry", code: "PANTRY10", color: "#1d4ed8", expires: "May 10, 2025" },
];

// ── localStorage helpers (per-account storage) ──────────────────────────────
const STORAGE_KEY = (email) => `fm_account_${email.toLowerCase().trim()}`;

function loadAccount(email) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(email));
    if (!raw) return { orders: [], wishlist: [] };
    return JSON.parse(raw);
  } catch { return { orders: [], wishlist: [] }; }
}

function saveAccount(email, data) {
  try {
    localStorage.setItem(STORAGE_KEY(email), JSON.stringify(data));
  } catch {}
}

// Save logged-in session so page refresh keeps user signed in
function loadSession() {
  try {
    const raw = localStorage.getItem("fm_session");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSession(user) {
  try {
    if (user) localStorage.setItem("fm_session", JSON.stringify(user));
    else localStorage.removeItem("fm_session");
  } catch {}
}
// ────────────────────────────────────────────────────────────────────────────

function App() {
  // Restore session on mount
  const [user, setUser]   = useState(() => loadSession());

  // Load orders/wishlist from localStorage when user is known
  const [orders, setOrders]     = useState(() => user ? loadAccount(user.email).orders   : []);
  const [wishlist, setWishlist] = useState(() => user ? loadAccount(user.email).wishlist : []);

  const [cart, setCart]                     = useState([]);
  const [search, setSearch]                 = useState("");
  const [showCart, setShowCart]             = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort]                     = useState("default");
  const [toast, setToast]                   = useState(null);
  const [appliedCoupon, setAppliedCoupon]   = useState(null);

  // ── Persist orders + wishlist to localStorage whenever they change ──
  useEffect(() => {
    if (!user) return;
    saveAccount(user.email, { orders, wishlist });
  }, [orders, wishlist, user]);

  // ── Sign in: restore that account's data ──
  const handleSignIn = useCallback((userInfo) => {
    setUser(userInfo);
    saveSession(userInfo);
    const saved = loadAccount(userInfo.email);
    setOrders(saved.orders);
    setWishlist(saved.wishlist);
  }, []);

  // ── Sign out: save data then clear state ──
  const handleSignOut = useCallback(() => {
    setUser(null);
    saveSession(null);
    setOrders([]);
    setWishlist([]);
    setCart([]);
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    showToast(`✓ ${product.name} added to cart`);
  }, [showToast]);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) { showToast("♡ Removed from wishlist"); return prev.filter((p) => p.id !== product.id); }
      showToast("♥ Added to wishlist");
      return [...prev, product];
    });
  }, [showToast]);

  const isWishlisted = useCallback((id) => wishlist.some((p) => p.id === id), [wishlist]);

  const placeOrder = useCallback((orderData) => {
    const newOrder = {
      id: "FM" + Math.floor(100000 + Math.random() * 900000),
      placedAt: Date.now(),
      items: [...cart],
      ...orderData,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
  }, [cart]);

  const filtered = products
    .filter((p) => {
      const ms = p.name.toLowerCase().includes(search.toLowerCase());
      const mc = activeCategory === "All" || p.category === activeCategory;
      return ms && mc;
    })
    .sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating")     return b.rating - a.rating;
      if (sort === "name")       return a.name.localeCompare(b.name);
      return 0;
    });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const activeOrdersCount = orders.filter(o => Date.now() - o.placedAt < 6 * 60 * 60 * 1000).length;

  return (
    <>
      <Navbar
        setSearch={setSearch}
        cartCount={totalItems}
        toggleCart={() => setShowCart((v) => !v)}
        wishlistCount={wishlist.length}
        ordersCount={activeOrdersCount}
        user={user}
        onSignOut={handleSignOut}
      />

      {showCart && <div className="overlay" onClick={() => setShowCart(false)} />}

      <Routes>
        <Route path="/" element={
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="hero-tag">🌿 100% Fresh &amp; Organic</div>
                <h1>Fresh from the <span>Market</span><br />to Your Door</h1>
                <p>Handpicked vegetables, fruits, and pantry essentials — delivered fresh every morning.</p>
                <div className="hero-actions">
                  <button className="btn-primary" onClick={() => document.querySelector(".products-section")?.scrollIntoView({ behavior: "smooth" })}>Shop Now →</button>
                  <a href="/offers" className="btn-outline">View Offers 🎁</a>
                </div>
              </div>
              <div className="hero-badges">
                <div className="hero-badge"><span>🚚</span>Free delivery over ₹499</div>
                <div className="hero-badge"><span>⭐</span>4.8 rated service</div>
                <div className="hero-badge"><span>🔄</span>Easy returns</div>
                <div className="hero-badge"><span>🌿</span>100% Organic</div>
              </div>
            </section>

            <div className="offers-strip">
              <span className="offers-strip-label">🔥 Hot Deals</span>
              {OFFERS.map(o => (
                <a key={o.id} href="/offers" className="offers-strip-item">
                  <span className="offers-strip-badge">{o.discount}% OFF</span>
                  {o.title}
                </a>
              ))}
            </div>

            <div className="category-section">
              <span className="category-label">Browse</span>
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`category-pill${activeCategory === cat ? " active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
              <div className="sort-wrap">
                <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">A – Z</option>
                </select>
              </div>
            </div>

            <div className="products-section">
              <div className="section-header">
                <h2 className="section-title">{activeCategory === "All" ? "All Products" : activeCategory}</h2>
                <span className="products-count">{filtered.length} items</span>
              </div>
              <div className="products">
                {filtered.length === 0 ? (
                  <div className="empty-products">
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                    <h3>No products found</h3>
                    <p>Try a different search or category.</p>
                  </div>
                ) : (
                  filtered.map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted(p.id)} />
                  ))
                )}
              </div>
            </div>

            <section className="why-section">
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Why FreshMart?</h2>
              <p className="why-subtitle">We bring the farm to your doorstep — fresh, fast, and reliable.</p>
              <div className="why-grid">
                {[
                  { icon: "🌾", title: "Farm Direct",        desc: "Products sourced directly from 200+ trusted local farms across India." },
                  { icon: "❄️", title: "Cold-Chain Delivery", desc: "Temperature-controlled supply chain ensures maximum freshness." },
                  { icon: "📦", title: "Same-Day Delivery",   desc: "Order before 11am and get your groceries delivered by evening." },
                  { icon: "💚", title: "No Chemicals",        desc: "Strictly no artificial ripening, pesticides, or chemical additives." },
                ].map(w => (
                  <div className="why-card" key={w.title}>
                    <div className="why-icon">{w.icon}</div>
                    <h4>{w.title}</h4>
                    <p>{w.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        } />

        <Route path="/product/:id"   element={<ProductPage products={products} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />} />
        <Route path="/offers"        element={<OffersPage offers={OFFERS} products={products} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />} />
        <Route path="/wishlist"      element={<WishlistPage wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
        <Route path="/checkout"      element={<CheckoutPage cart={cart} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} placeOrder={placeOrder} />} />
        <Route path="/orders"        element={<OrdersPage orders={orders} user={user} />} />
        <Route path="/about"         element={<AboutPage />} />
        <Route path="/signin"        element={<SignInPage onSignIn={handleSignIn} />} />
      </Routes>

      <Footer />

      <Cart
        cart={cart}
        showCart={showCart}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        onClose={() => setShowCart(false)}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}

export default App;
