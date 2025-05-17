const pool = require("../config/db"); // PostgreSQL kapcsolat (pl. pg Pool)

const createPlaylist = async (userId, name) => {
  const result = await pool.query(
    "INSERT INTO playlists (user_id, name) VALUES ($1, $2) RETURNING *",
    [userId, name]
  );
  return result.rows[0];
};

const getPlaylistsByUserId = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM playlists WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

const deletePlaylistById = async (userId, playlistId) => {
  const result = await pool.query(
    "DELETE FROM playlists WHERE user_id = $1 AND id = $2 RETURNING *",
    [userId, playlistId]
  );
  return result.rows[0]; // Ha nem találja, akkor üres tömböt ad vissza
};

const getPlaylistContentById = async (userId, playlistId) => {
  const result = await pool.query(
    `SELECT s.id, s.title, s.artist, s.url
     FROM playlists p
     JOIN playlist_songs ps ON p.id = ps.playlist_id
     JOIN songs s ON ps.song_id = s.id
     WHERE p.user_id = $1 AND p.id = $2`,
    [userId, playlistId]
  );
  return result.rows;
};

module.exports = {
  createPlaylist,
  getPlaylistsByUserId,
  deletePlaylistById,
  getPlaylistContentById  // új függvény
};