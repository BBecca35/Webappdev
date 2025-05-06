const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db"); // <- importáltuk a db modult

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // ha kell cookie vagy auth header
}));
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashed]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});