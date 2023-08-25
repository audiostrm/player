import { usePlayer } from '@/hooks/usePlayer/usePlayer';
import React from 'react';

export const Image = () => {
  const { audio } = usePlayer();

  return (
    <div className="audio-info">
      <div className="image-wrapper">
        <img src={audio.image as string} draggable={false} />
      </div>
      <summary>
        <p className="audio-title">{audio.title}</p>
        <p className="audio-artist">{audio.uploader?.name}</p>
      </summary>
    </div>
  );
};
