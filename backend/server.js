const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json()); // ✅ ADD THIS

// ✅ GET PRODUCTS (keep this)
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// ✅ ADD THIS (NEW API)
app.post("/order", (req, res) => {
  const { items, total } = req.body;

  const query = "INSERT INTO orders (items, total) VALUES (?, ?)";

  db.query(query, [JSON.stringify(items), total], (err, result) => {
    if (err) {
      console.log(err);
      res.send("Error saving order");
    } else {
      res.send("Order saved ✅");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});