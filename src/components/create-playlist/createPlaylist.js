import { useState } from 'react';
import './createPlaylist.css';
import { getLettersAsset } from '../letterAssets';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const CREATE_PLAYLIST_URL = "/api/playlists/create";

export default function CreatePlaylist({ setCreatingPlaylist, setSidebarTitle }) {
    const [playlistName, setPlaylistName] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const handleBackButton = () => {
        setCreatingPlaylist(false);
        setSidebarTitle("Lejátszási listák");
    }
    const handleCreatePlaylist = async () => {
    try {
        const response = await axiosPrivate.post(CREATE_PLAYLIST_URL, 
            { userid: auth?.UserInfo?.id, name: playlistName }, {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        
        setCreatingPlaylist(false);
        setSidebarTitle("Lejátszási listák");
        setPlaylistName('');

      }catch (error) {
        console.error('Hiba történt a kérés során:', error);
    }};

    const assetImage = getLettersAsset(playlistName || "U");

    return (
        <div className="create-playlist-form">
            <button className='form-back-button' onClick={handleBackButton}>
                <FontAwesomeIcon icon={faReply} size='3x' color='#7134C7'/>
            </button>
            <img
                src={assetImage}
                alt="Album kép"
                className="playlist-image"
            />
            <input
                type="text"
                placeholder="Lejátszási lista neve"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="playlist-name-input"
            />
            <button
                onClick={handleCreatePlaylist}
                className="save-playlist-button"
            >Mentés
            </button>
        </div>
    )
}
