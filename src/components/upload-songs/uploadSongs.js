import { use, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { getLettersAsset } from "../letterAssets";
import './uploadSongs.css'

const UploadSong = ({selectedPlaylistId, selectedPlaylistName, setPlaylistContent, setUploadingSong}) => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("Nincs kiválasztott fájl")
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setAudioFile(file);
    } else {
      setFileName("Nincs kiválasztott fájl");
    }
  };

  const handleBackButton = () => {
    setPlaylistContent(selectedPlaylistName);
    setUploadingSong(false);
  }

  const handleUpload = async () => {
    if (!artist || !title || !audioFile) {
      setMessage("Kérlek tölts ki minden mezőt és válassz ki egy audio fájlt!");
      return;
    }

    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("title", title);
    formData.append("audio", audioFile);
    formData.append("playlistId", selectedPlaylistId); 

    try {
      setIsUploading(true);
      setMessage("");

      const response = await axiosPrivate.post(
        "/api/song/upload", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Sikeres feltöltés!");
      setArtist("");
      setTitle("");
      setAudioFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Hiba történt a feltöltés során.");
    } finally {
      setIsUploading(false);
    }
  };
 //onClick={handleBackButton}
  return (
    <>
    <div className="upload-song-container">
      <div className="display-playlist">
        <button className='upload-form-back-button' onClick={handleBackButton}>
            <FontAwesomeIcon icon={faReply} size='3x' color='#7134C7'/>
        </button>
        <img
            src={getLettersAsset(selectedPlaylistName)}
            alt="Album kép"
            className="display-playlist-image"
        />
        <h2 className="display-playlist-name">
          {selectedPlaylistName}
        </h2>
      </div>
      <div className="upload-input-fields">
        <input
          className="song-input"
          type="text"
          placeholder="Előadó neve"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          className="song-input"
          type="text"
          placeholder="Zene címe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="upload-submission" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? "Feltöltés..." : "Feltöltés"}
        </button>
      </div>
      <div className="file-uploader-container">
        <input className="file-uploader" 
          type="file" accept="audio/mp3" 
            onChange={handleFileChange}
            id="file-uploader"
        />
        <label className="song-uploader" 
          htmlFor="file-uploader">
          Audio fájl tallózása
        </label>
        <p className="file-name-display">{fileName}</p>
      </div>
    </div>
    {message && <p className="response-message">{message}</p>}
    </>
  );
};

export default UploadSong;
