function Navbar({ setSearch, cartCount, toggleCart }) {
  return (
    <div className="navbar">
      <h2>🛒 FreshMart</h2>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={toggleCart}>
        Cart ({cartCount})
      </button>
    </div>
  );
}

export default Navbar;