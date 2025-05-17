import './getAllPlaylist.css';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getLettersAsset } from '../letterAssets';

export default function Playlists({setPlaylistContent, setSelectedPlaylistId, setSelectedPlaylistName}) {
  const axiosPrivate = useAxiosPrivate();
  const [playlists, setPlaylists] = useState([]);

  const handleSelectedPlaylist = (playlistName, playlistId) => {
    setPlaylistContent(playlistName);
    setSelectedPlaylistId(playlistId);
    setSelectedPlaylistName(playlistName);
  }

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axiosPrivate.get('/api/playlists/get');
        console.log('Lekért adatok:', response.data.playlists);
        setPlaylists(response.data.playlists); // feltételezve, hogy a válaszban a lista maga a body
      } catch (err) {
        console.error('Hiba a lejátszási listák lekérésekor:', err);
      }
    };

    fetchPlaylists();
  }, [axiosPrivate]);

  return (
    <div>
      {playlists.length === 0 ? (
        <p>Nincs még lejátszási lista.</p>
      ) : (
        <div>
          {playlists.map((playlist) => (
            <button className='playlist-row' key={playlist.id} onClick={() => handleSelectedPlaylist(playlist.name, playlist.id)}>
              <img
                src={getLettersAsset(playlist.name)}
                alt="Album kép"
                className="row-playlist-image"
              />
              <p className='row-playlist-name'>{playlist.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

