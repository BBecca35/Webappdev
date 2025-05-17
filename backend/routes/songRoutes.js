const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploads");

const {
  handleGetSongById,
  handleDeleteSongById,
  handleUploadSong,
  handleStreamSong 
} = require("../controller/songController");

router.get("/songs/:id", authMiddleware, handleGetSongById);
router.delete("/songs/:id", authMiddleware, handleDeleteSongById);
router.get("/:songId/stream", handleStreamSong);
router.post("/upload", upload.single("audio"), handleUploadSong);

module.exports = router;
