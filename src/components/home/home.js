import './home.css';
import Navbar from '../navbar/navbar';
import CreatePlaylist from '../create-playlist/createPlaylist';
import Playlists from '../get-all-playlist/getAllPlaylist';
import UploadSong from '../upload-songs/uploadSongs';
import SongList from '../list-songs/listsongs';
import MusicPlayer from '../music-player/musicPlayer';
import { useState } from 'react';

export default function Home() {
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [uploadingSong, setUploadingSong] = useState(false);
  const [playSong, setPlaySong] = useState(false);
  const [sidebarTitle, setSidebarTitle] = useState("Lejátszási listák");
  const [selectedPlaylistName, setSelectedPlaylistName] = useState(null);
  const [playlistContent, setPlaylistContent] = useState("Nincs még kiválasztva lejátszási lista!");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState(0);

  return (
    <div className="home-container">
      <Navbar />
      <div className='content'>
        <div className="sidebar">
          <h2 className='sidebar-title'>{sidebarTitle}</h2>
          <hr className='home-line'></hr>
          {!creatingPlaylist ? (
            <div className='playlist-table'>
              <Playlists 
                setPlaylistContent={setPlaylistContent}
                setSelectedPlaylistName={setSelectedPlaylistName}
                setSelectedPlaylistId={(id) => {
                  setSelectedPlaylistId(id);
                  setPlaySong(false);
                  setSongId(null);     // Nincs kiválasztott szám
                }}
              />
              <button
                className="create-playlist-button"
                id='create-playlist-button'
                onClick={() => {
                  setCreatingPlaylist(true);
                  setSidebarTitle("Új lista létrehozása");
                }}
              >
                +
              </button>
              <label htmlFor='create-playlist-button' className='button-label'>Új lista létrehozása</label>
            </div>
            ) : (
              <CreatePlaylist
                className="create-playlist-component"
                setCreatingPlaylist={setCreatingPlaylist}
                setSidebarTitle={setSidebarTitle}
              />
          )}
        </div>

        <div className="playlist-content">
          <h2 className='playlist-title'>{playlistContent}</h2>
          <hr className='home-line'></hr>
          {!uploadingSong ? (
            playlistContent !== "Nincs még kiválasztva lejátszási lista!" && (
              <div className='songs-component'>
                <SongList 
                  selectedPlaylistId={selectedPlaylistId}
                  songs={songs}
                  setSongs={setSongs}
                  setPlaySong={setPlaySong}
                  setSongId={setSongId}
                />
                <button
                  className="upload-song-button"
                  id='upload-song-button'
                  onClick={() => {
                    setUploadingSong(true);
                    setPlaylistContent("Új zene feltöltése");
                  }}
                >
                  +
                </button>
                <label htmlFor='upload-song-button' className='upload-song-button-label'>Új zene feltöltése a listába</label>
              </div>
            )
          ) : (
            <UploadSong 
              selectedPlaylistId={selectedPlaylistId}
              selectedPlaylistName={selectedPlaylistName}
              setPlaylistContent={setPlaylistContent}
              setUploadingSong={setUploadingSong}
              className="upload-song-window"
            />
          )}
        </div>

      </div>
      <div className="music-player-bar">
          {playSong && (
            <MusicPlayer 
              playlist={songs}
              songId={songId}
              setSongId={setSongId}
            />
          )}
          
      </div>
    </div>
  );
}
