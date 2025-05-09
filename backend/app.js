const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes); 

module.exports = app;
