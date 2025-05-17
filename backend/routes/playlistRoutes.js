const express = require("express");
const router = express.Router();
const { handleCreatePlaylist, handleGetPlaylists, handleDeletePlaylist, handleGetPlaylistContent } = require("../controller/playlistController");
const { handleGetSongsByPlaylistId } = require('../controller/songController');
const authMiddleware = require("../middleware/authMiddleware");

router.get('/:id/songs', authMiddleware, handleGetSongsByPlaylistId);
router.post("/create", authMiddleware, handleCreatePlaylist);
router.get("/get", authMiddleware, handleGetPlaylists);
router.delete("/:id", authMiddleware, handleDeletePlaylist);
router.get("/:id", authMiddleware, handleGetPlaylistContent); 

module.exports = router;

