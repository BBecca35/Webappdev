const { createPlaylist, getPlaylistsByUserId, deletePlaylistById, getPlaylistContentById } = require("../models/playlist");

const handleCreatePlaylist = async (req, res) => {
  const userId = req.id;
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ error: "A lejátszási lista neve kötelező!" });
  }

  try {
    const newPlaylist = await createPlaylist(userId, name);
    res.status(201).json({ message: "Lejátszási lista létrehozva!", playlist: newPlaylist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hiba történt a létrehozás során." });
  }
};

const handleGetPlaylists = async (req, res) => {
  const userId = req.id;
  
  try {
    const playlists = await getPlaylistsByUserId(userId);
    res.status(200).json({ playlists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Nem sikerült lekérni a lejátszási listákat." });
  }
};

const handleDeletePlaylist = async (req, res) => {
  const userId = req.user.id;
  const playlistId = req.params.id;

  try {
    const deletedPlaylist = await deletePlaylistById(userId, playlistId);

    if (!deletedPlaylist) {
      return res.status(404).json({ error: "Nem található ilyen lejátszási lista!" });
    }

    res.status(200).json({ message: "Lejátszási lista sikeresen törölve!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hiba történt a lejátszási lista törlésekor." });
  }
};

const handleGetPlaylistContent = async (req, res) => {
  const userId = req.user.id;
  const playlistId = req.params.id;

  try {
    const content = await getPlaylistContentById(userId, playlistId);

    if (content.length === 0) {
      return res.status(404).json({ error: "Ez a lejátszási lista üres, vagy nem található!" });
    }

    res.status(200).json({ playlistId, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hiba történt a lejátszási lista tartalmának lekérdezésekor." });
  }
};

module.exports = { handleCreatePlaylist, handleGetPlaylists, handleDeletePlaylist, handleGetPlaylistContent };