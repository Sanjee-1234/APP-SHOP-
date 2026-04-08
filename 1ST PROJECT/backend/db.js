const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sanju", // ⚠️ put your MySQL password here
  database: "grocery"
});

db.connect((err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;