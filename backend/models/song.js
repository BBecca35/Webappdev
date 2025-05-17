const pool = require("../config/db");

const addSong = async (playlistId, title, artist, url) => {
  const result = await pool.query(
    "INSERT INTO songs (playlist_id, title, artist, filename) VALUES ($1, $2, $3, $4) RETURNING *",
    [playlistId, title, artist, url]
  );
  return result.rows[0];
};

const getSongById = async (id) => {
  const result = await pool.query("SELECT * FROM songs WHERE id = $1", [id]);
  return result.rows[0];
};


const getSongsByPlaylistId = async (playlistId) => {
  const result = await pool.query(
    "SELECT * FROM songs WHERE playlist_id = $1 ORDER BY uploaded_at DESC",
    [playlistId]
  );
  return result.rows;
};

const deleteSongById = async (id) => {
  const result = await pool.query("DELETE FROM songs WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

const removeSongFromPlaylist = async (playlistId, songId) => {
  await pool.query(
    "DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2",
    [playlistId, songId]
  );
};

module.exports = {
  addSong,
  getSongById,
  getSongsByPlaylistId,
  deleteSongById,
  removeSongFromPlaylist
};
