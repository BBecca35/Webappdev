const {
  addSong,
  getSongsByPlaylistId,
  getSongById,
  deleteSongById,
} = require("../models/song");
const path = require("path");
const fs = require("fs");

const handleGetSongById = async (req, res) => {
  const songId = req.params.id;

  try {
    const song = await getSongById(songId);
    if (!song) {
      return res.status(404).json({ error: "A keresett zene nem található." });
    }
    res.status(200).json({ song });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a lekérdezés során." });
  }
};

const handleGetSongsByPlaylistId = async (req, res) => {
  const playlistId = req.params.id;

  try {
    const songs = await getSongsByPlaylistId(playlistId);
    res.status(200).json({ songs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a zenék lekérdezése során." });
  }
};

const handleDeleteSongById = async (req, res) => {
  const songId = req.params.id;

  try {
    const song = await deleteSongById(songId);
    if (!song) {
      return res.status(404).json({ error: "A zene nem található vagy már törölve lett." });
    }
    res.status(200).json({ message: "Zene sikeresen törölve!", song });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a törlés során." });
  }
};

const handleStreamSong = async (req, res) => {
  const { songId } = req.params;
  //console.log(songId);

  try {
    const song = await getSongById(songId);
    if (!song || !song.filename) {
      return res.status(404).json({ error: "Zene nem található." });
    }

    //console.log("Lekért zene:", song);
    const filePath = path.resolve(song.filename); // relatív útvonalból abszolút
    //console.log("Fájl abszolút útvonala:", filePath);

    // Ellenőrzés, hogy létezik-e a fájl
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Zene fájl nem található." });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Részleges stream (pl. böngésző kér részletet)
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "audio/mpeg"
      });

      file.pipe(res);
    } else {
      // Teljes fájl stream
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "audio/mpeg"
      });

      fs.createReadStream(filePath).pipe(res);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a zene streamelése közben." });
  }
};


const handleUploadSong = async (req, res) => {
  const { title, artist, playlistId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "Nincs fájl feltöltve!" });
  }

  try {
    const filePath = path.join("uploads", file.filename);
    const newSong = await addSong(playlistId, title, artist, filePath);
    res.status(201).json({ message: "Zene feltöltve!", song: newSong });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba a zene feltöltésekor." });
  }
};

module.exports = {
  handleGetSongById,
  handleGetSongsByPlaylistId,
  handleDeleteSongById,
  handleStreamSong,
  handleUploadSong
};
