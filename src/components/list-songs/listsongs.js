import { useEffect, useState } from 'react';
import './listSongs.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const SongList = ({ selectedPlaylistId, songs, setSongs, setPlaySong, setSongId }) => {
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [displayPlaylist, setDisplayPlaylist] = useState([]);
  const [prevPlaylistId, setPrevPlaylistId] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handlePlaySong = (songId) => {
    if(songs.length === 0 || prevPlaylistId !== selectedPlaylistId){
      setSongs(displayPlaylist);
      setPrevPlaylistId(selectedPlaylistId);
    }
    setPlaySong(true);
    setSongId(displayPlaylist.findIndex(song => song.id === songId));
  }
  
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axiosPrivate.get(`/api/playlists/${selectedPlaylistId}/songs`);
        const newSongs = response.data.songs;

        setDisplayPlaylist(newSongs); 
        
        if (songs.length === 0 || selectedPlaylistId !== prevPlaylistId) {
          setSongs(newSongs);
          setPrevPlaylistId(selectedPlaylistId);
        }

      } catch (error) {
        console.error('Hiba a zenék lekérésekor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedPlaylistId) {
      fetchSongs();
    }
  }, [selectedPlaylistId]);

  if (loading) {
    return <p>Betöltés...</p>;
  }

  return (
    <div className="song-list">
      {displayPlaylist.length === 0 ? (
        <p className='no-song'>A lejátszási lista üres.</p>
      ) : (
        <div>
          {displayPlaylist.map((song, index) => (
            <div className='song'>
              <button 
                className='song-number' 
                key={song.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handlePlaySong(song.id)}
              >
                {hoveredIndex === index
                  ? <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  : index + 1}
              </button> 
              <div className='song-name'>
                {song.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongList;