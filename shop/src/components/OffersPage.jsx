import ProductCard from "./ProductCard";

function OffersPage({ offers, products, addToCart, toggleWishlist, isWishlisted }) {
  return (
    <div className="offers-page">
      <div className="offers-hero">
        <div className="hero-tag">🎁 Limited Time</div>
        <h1>Today's <span>Best Deals</span></h1>
        <p>Exclusive offers on your favourite groceries. Save more every day!</p>
      </div>
      <div className="offers-grid">
        {offers.map((offer) => (
          <div className="offer-card" key={offer.id} style={{ "--offer-color": offer.color }}>
            <div className="offer-card-top">
              <div className="offer-discount-badge">{offer.discount}% OFF</div>
              <div className="offer-code-chip"><span>Code:</span> <strong>{offer.code}</strong></div>
            </div>
            <h3>{offer.title}</h3>
            <p>{offer.desc}</p>
            <div className="offer-expires">⏰ Expires: {offer.expires}</div>
            <div className="offer-category-tag">{offer.category}</div>
          </div>
        ))}
      </div>
      {offers.map((offer) => {
        const offerProducts = products.filter((p) => p.category === offer.category);
        return (
          <div className="offer-section" key={offer.id}>
            <div className="offer-section-header">
              <h2>{offer.title}</h2>
              <span className="offer-section-code">Use code: <strong>{offer.code}</strong></span>
            </div>
            <p className="offer-section-desc">{offer.desc}</p>
            <div className="products">
              {offerProducts.map((p) => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted(p.id)} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OffersPage;
