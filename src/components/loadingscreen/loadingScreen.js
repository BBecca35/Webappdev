import React from 'react';
import './loadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Betöltés folyamatban...</p>
    </div>
  );
};

export default LoadingScreen;
