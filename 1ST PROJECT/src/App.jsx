import { useState, useCallback } from "react";
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
import OrderSuccess from "./components/OrderSuccess";
import AboutPage from "./components/AboutPage";
import SignInPage from "./components/SignInPage";

export const products = [
  { id: 1,  name: "Basmati Rice",       price: 50,  category: "Grains",     unit: "1 kg",   rating: 4.5, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop", desc: "Premium long-grain basmati rice, aged for extra aroma. Perfect for biryani and pulao." },
  { id: 2,  name: "Full Cream Milk",    price: 30,  category: "Dairy",      unit: "500 ml",  rating: 4.8, img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop", desc: "Farm-fresh full cream milk, pasteurized and packed daily for maximum freshness." },
  { id: 3,  name: "Fresh Apple",        price: 80,  category: "Fruits",     unit: "500 g",   rating: 4.6, img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop", desc: "Crisp Shimla apples handpicked at peak ripeness. Sweet, crunchy, and nutrient-rich." },
  { id: 4,  name: "Tomato",             price: 40,  category: "Vegetables", unit: "500 g",   rating: 4.3, img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500&auto=format&fit=crop", desc: "Vine-ripened farm tomatoes, bursting with flavour. Great for curries, salads, and soups." },
  { id: 5,  name: "Potato",             price: 25,  category: "Vegetables", unit: "1 kg",    rating: 4.4, img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop", desc: "Fresh country potatoes, ideal for frying, boiling, or mashing. Starchy and hearty." },
  { id: 6,  name: "Onion",              price: 35,  category: "Vegetables", unit: "500 g",   rating: 4.2, img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=500&auto=format&fit=crop", desc: "Pungent red onions sourced from Nasik farms. Essential for Indian cooking." },
  { id: 7,  name: "Banana",             price: 60,  category: "Fruits",     unit: "6 pcs",   rating: 4.7, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop", desc: "Ripe Robusta bananas, naturally sweet and energy-packed. A perfect snack anytime." },
  { id: 8,  name: "Whole Wheat Bread",  price: 45,  category: "Bakery",     unit: "400 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=500&auto=format&fit=crop", desc: "Freshly baked whole wheat bread, soft and nutritious. No preservatives added." },
  { id: 9,  name: "Farm Eggs",          price: 70,  category: "Dairy",      unit: "6 pcs",   rating: 4.9, img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&auto=format&fit=crop", desc: "Free-range eggs from cage-free hens, rich in protein and naturally flavourful." },
  { id: 10, name: "White Sugar",        price: 55,  category: "Pantry",     unit: "1 kg",    rating: 4.4, img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&auto=format&fit=crop", desc: "Refined crystal white sugar, ideal for all your sweet preparations and beverages." },
  { id: 11, name: "Rock Salt",          price: 20,  category: "Pantry",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1590137876181-2a5a7e340de2?w=500&auto=format&fit=crop", desc: "Natural Himalayan rock salt, mineral-rich and unrefined. A healthier salt choice." },
  { id: 12, name: "Sunflower Oil",      price: 120, category: "Pantry",     unit: "1 L",     rating: 4.6, img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop", desc: "Refined sunflower oil, light on digestion and ideal for everyday Indian cooking." },
  { id: 13, name: "Mango",              price: 90,  category: "Fruits",     unit: "500 g",   rating: 4.9, img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop", desc: "Alphonso mangoes — the king of fruits. Creamy, saffron-hued, and irresistibly sweet." },
  { id: 14, name: "Spinach",            price: 30,  category: "Vegetables", unit: "250 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop", desc: "Tender baby spinach, freshly harvested. Rich in iron and vitamins A, C, and K." },
  { id: 15, name: "Curd / Yogurt",      price: 40,  category: "Dairy",      unit: "400 g",   rating: 4.7, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop", desc: "Thick, creamy set curd made from full-cream milk. A probiotic powerhouse." },
  { id: 16, name: "Carrot",             price: 35,  category: "Vegetables", unit: "500 g",   rating: 4.4, img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500&auto=format&fit=crop", desc: "Sweet, crunchy carrots full of beta-carotene. Great for halwa, salads, and juices." },
  { id: 17, name: "Oats",               price: 85,  category: "Grains",     unit: "500 g",   rating: 4.6, img: "https://images.unsplash.com/photo-1614385451897-1f8e47af264d?w=500&auto=format&fit=crop", desc: "Rolled oats — a fibre-rich breakfast staple. Quick-cook and heart-healthy." },
  { id: 18, name: "Green Grapes",       price: 75,  category: "Fruits",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?w=500&auto=format&fit=crop", desc: "Seedless green grapes, juicy and refreshing. Imported and quality-checked." },
  { id: 19, name: "Paneer",             price: 95,  category: "Dairy",      unit: "200 g",   rating: 4.8, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop", desc: "Fresh cottage cheese made daily. Soft, creamy, and perfect for curries or snacks." },
  { id: 20, name: "Toor Dal",           price: 65,  category: "Grains",     unit: "500 g",   rating: 4.5, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop", desc: "Premium yellow split pigeon peas (Toor Dal). Protein-rich and a dal staple." },
  { id: 21, name: "Cauliflower",        price: 45,  category: "Vegetables", unit: "1 pc",    rating: 4.3, img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop", desc: "Fresh firm cauliflower, perfect for aloo-gobi, manchurian, or simply roasted." },
  { id: 22, name: "Whole Wheat Atta",   price: 70,  category: "Grains",     unit: "1 kg",    rating: 4.7, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop", desc: "Stone-ground whole wheat flour — finely milled for soft rotis and parathas." },
  { id: 23, name: "Watermelon",         price: 50,  category: "Fruits",     unit: "1 pc",    rating: 4.6, img: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=500&auto=format&fit=crop", desc: "Seedless summer watermelon, hydrating and sweet. Ideal for beating the heat." },
  { id: 24, name: "Coconut Oil",        price: 140, category: "Pantry",     unit: "500 ml",  rating: 4.8, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop", desc: "Cold-pressed virgin coconut oil with a natural aroma. Multi-purpose and nutritious." },
  { id: 25, name: "Sourdough Loaf",     price: 110, category: "Bakery",     unit: "400 g",   rating: 4.8, img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop", desc: "Artisanal slow-fermented sourdough, baked fresh each morning. Tangy and chewy." },
  { id: 26, name: "Pomegranate",        price: 85,  category: "Fruits",     unit: "2 pcs",   rating: 4.7, img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop", desc: "Ruby red pomegranates bursting with antioxidants and juicy arils." },
  { id: 27, name: "Green Chilli",       price: 15,  category: "Vegetables", unit: "100 g",   rating: 4.2, img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop", desc: "Fiery green chillies from local farms. Essential for South Indian cooking." },
  { id: 28, name: "Butter",             price: 55,  category: "Dairy",      unit: "100 g",   rating: 4.6, img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop", desc: "Churned white butter made from fresh cream. Rich, luscious, and unsalted." },
  { id: 29, name: "Turmeric Powder",    price: 45,  category: "Pantry",     unit: "100 g",   rating: 4.7, img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&auto=format&fit=crop", desc: "Pure Erode turmeric powder with high curcumin content. Vibrant colour and flavour." },
  { id: 30, name: "Croissant",          price: 60,  category: "Bakery",     unit: "2 pcs",   rating: 4.5, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop", desc: "Butter-laminated croissants baked fresh every morning. Flaky, golden, and rich." },
];

export const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy", "Grains", "Bakery", "Pantry"];

export const OFFERS = [
  { id: "o1", title: "Fresh Week Deal", desc: "20% off all Vegetables", discount: 20, category: "Vegetables", code: "FRESH20", color: "#2d5a3d", expires: "Apr 30, 2025" },
  { id: "o2", title: "Dairy Delight",   desc: "Buy 2 dairy products, get 1 free", discount: 33, category: "Dairy",      code: "DAIRY33", color: "#b45309", expires: "Apr 25, 2025" },
  { id: "o3", title: "Fruit Fiesta",    desc: "15% off all Fruits",     discount: 15, category: "Fruits",     code: "FRUIT15", color: "#be185d", expires: "May 5, 2025" },
  { id: "o4", title: "Pantry Pick",     desc: "₹30 off orders above ₹300", discount: 10, category: "Pantry",  code: "PANTRY10", color: "#1d4ed8", expires: "May 10, 2025" },
];

function App() {
  const [user, setUser]                 = useState(null);
  const [cart, setCart]                 = useState([]);
  const [wishlist, setWishlist]         = useState([]);
  const [search, setSearch]             = useState("");
  const [showCart, setShowCart]         = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort]                 = useState("default");
  const [toast, setToast]               = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      return [...prev, { ...product, qty }];
    });
    showToast(`✓ ${product.name} added to cart`);
  }, [showToast]);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item).filter((item) => item.qty > 0));
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) { showToast(`♡ Removed from wishlist`); return prev.filter((p) => p.id !== product.id); }
      showToast(`♥ Added to wishlist`);
      return [...prev, product];
    });
  }, [showToast]);

  const isWishlisted = useCallback((id) => wishlist.some((p) => p.id === id), [wishlist]);

  const clearCart = useCallback(() => setCart([]), []);

  const filtered = products
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating")     return b.rating - a.rating;
      if (sort === "name")       return a.name.localeCompare(b.name);
      return 0;
    });

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Navbar
        setSearch={setSearch}
        cartCount={totalItems}
        toggleCart={() => setShowCart((v) => !v)}
        wishlistCount={wishlist.length}
        user={user}
        onSignOut={() => setUser(null)}
      />

      {showCart && <div className="overlay" onClick={() => setShowCart(false)} />}

      <Routes>
        <Route path="/" element={
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="hero-tag">🌿 100% Fresh &amp; Organic</div>
                <h1>Fresh from the <span>Market</span><br />to Your Door</h1>
                <p>Handpicked vegetables, fruits, and pantry essentials — delivered fresh every morning right to your doorstep.</p>
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

            {/* Offers Strip */}
            <div className="offers-strip">
              <span className="offers-strip-label">🔥 Hot Deals</span>
              {OFFERS.map(o => (
                <a key={o.id} href="/offers" className="offers-strip-item">
                  <span className="offers-strip-badge">{o.discount}% OFF</span>
                  {o.title}
                </a>
              ))}
            </div>

            {/* Category Filter */}
            <div className="category-section">
              <span className="category-label">Browse</span>
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`category-pill${activeCategory === cat ? " active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
              <div className="sort-wrap">
                <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">A–Z</option>
                </select>
              </div>
            </div>

            {/* Products */}
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
                    <p>Try a different search term or category.</p>
                  </div>
                ) : (
                  filtered.map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted(p.id)} />
                  ))
                )}
              </div>
            </div>

            {/* Why Choose Us */}
            <section className="why-section">
              <h2 className="section-title" style={{ textAlign: "center", marginBottom: 12 }}>Why FreshMart?</h2>
              <p className="why-subtitle">We bring the farm to your doorstep — fresh, fast, and reliable.</p>
              <div className="why-grid">
                {[
                  { icon: "🌾", title: "Farm Direct", desc: "Products sourced directly from 200+ trusted local farms across India." },
                  { icon: "❄️", title: "Cold-Chain Delivery", desc: "Temperature-controlled supply chain ensures maximum freshness." },
                  { icon: "📦", title: "Same-Day Delivery", desc: "Order before 11am and get your groceries delivered by evening." },
                  { icon: "💚", title: "No Chemicals", desc: "Strictly no artificial ripening, pesticides, or chemical additives." },
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

        <Route path="/product/:id" element={<ProductPage products={products} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />} />
        <Route path="/offers"   element={<OffersPage offers={OFFERS} products={products} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} clearCart={clearCart} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/signin"   element={<SignInPage onSignIn={setUser} />} />
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
