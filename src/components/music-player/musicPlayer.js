import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLettersAsset } from '../letterAssets';
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import "./musicPlayer.css";
import "./volumeSlider.css"
import "./seekBar.css"

const MusicPlayer = ({ playlist, songId, setSongId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const currentSong = playlist[songId];
  // Zene streamelésének elérési útja
  const audioUrl = currentSong
    ? `http://localhost:5000/api/song/${currentSong.id}/stream`
    : null;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !playlist || !playlist.length) return;

    const currentSong = playlist[songId];
    if (!currentSong) return;

    audio.src = `http://localhost:5000/api/song/${currentSong.id}/stream`;
    audio.currentTime = 0;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
      setIsPlaying(true);
      }).catch((error) => {
        console.error("A lejátszás nem indult el automatikusan:", error);
      });
    }

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => handleNext();

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };

  }, [songId, playlist]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setSongId((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setSongId((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  //console.log("Audio src:", audioRef.current?.src);
  //<h3>{currentSong ? currentSong.title : "Nincs kiválasztott zene"}</h3>
  //{currentSong.title}

  return (
    <div className="music-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <img
          src={getLettersAsset(currentSong.artist)}
          alt="Album kép"
          className="artist-image"
      />
      <div className="current-song-title">
        <p className="current-artist">{currentSong.artist} - </p>
        <p className="current-title">{currentSong.title}</p>
      </div>
      <div className="controls">
        <div className="progress">
        <span className="current-time" >{formatTime(currentTime)}</span>
          <input
            name="seek-bar"
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />
          <span className="duration">{formatTime(duration)}</span>
        </div>
        <button className="backward-button" onClick={handlePrevious}>
          <FontAwesomeIcon 
            icon={faBackward} 
            size="2xl"
            color="#2b2b2b" />
        </button>
        <button className="play-pause-button" onClick={handlePlayPause}>
          <FontAwesomeIcon 
            icon={isPlaying ? faPause : faPlay} 
            size="2xl"
            color="#2b2b2b"
          />
        </button>
        <button className="forward-button" onClick={handleNext}>
          <FontAwesomeIcon 
            icon={faForward} 
            size="2xl"
            color="#2b2b2b"
          />
        </button>
      </div>

      <div className="volume-control">
        <FontAwesomeIcon className="volume-icon" 
          icon={faVolumeUp} 
          size="2xl"
          color='#69c1ef'
        />
        <input
          name="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
