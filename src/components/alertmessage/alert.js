import React, { useEffect } from 'react';

const Alert = ({ type = 'info', message, onClose, duration = 3000 }) => {
  const colors = {
    success: { background: '#d4edda', border: '#c3e6cb', color: '#155724' },
    error: { background: '#f8d7da', border: '#f5c6cb', color: '#721c24' },
    warning: { background: '#fff3cd', border: '#ffeeba', color: '#856404' },
    info: { background: '#d1ecf1', border: '#bee5eb', color: '#0c5460' },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const style = {
    backgroundColor: colors[type].background,
    color: colors[type].color,
    border: `1px solid ${colors[type].border}`,
    padding: '10px 15px',
    borderRadius: '5px',
    margin: '87px 0 -150px 33%',
    position: 'relative',
    width: '480px',
  };

  return (
    <div style={style}>
      {message}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '5px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          color: colors[type].color
        }}
      >
      </button>
    </div>
  );
};

export default Alert;
