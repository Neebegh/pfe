// AvatarCreator.jsx
import React, { useEffect } from 'react';

const AvatarCreator = ({ onAvatarCreated }) => {
  const handleMessage = (event) => {
    if (event.data?.eventName === 'v1.avatar.exported') {
      onAvatarCreated(event.data?.data?.url || event.data.url);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      title="Créateur d'avatar"
      src="https://readyplayer.me/avatar?frameApi"
      style={{ width: '100%', height: '600px', border: 'none' }}
      allow="camera; microphone"
    ></iframe>
  );
};

export default AvatarCreator;
