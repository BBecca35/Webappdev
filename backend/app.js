const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const playlistRoutes = require("./routes/playlistRoutes"); // Playlist routes importálása
const songRoutes = require("./routes/songRoutes"); 
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsOptions));

app.use(express.json()); // JSON testek kezelése
app.use(cookieParser()); // Cookie-k kezelése

// API végpontok
app.use("/api/auth", authRoutes);        // Auth végpontok
app.use("/api/token", tokenRoutes);      // Token végpontok
app.use("/api/playlists", playlistRoutes); // Playlist végpontok (új)
app.use("/api/song", songRoutes); 
app.use("/api", logoutRoutes);           // Logout végpontok

module.exports = app;
