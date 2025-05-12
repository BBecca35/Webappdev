const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const logoutRoutes = require("./routes/logoutRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api", logoutRoutes); 

module.exports = app;
