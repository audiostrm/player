import { usePlayer } from '@/hooks/usePlayer';
import React from 'react';

export const Image = () => {
  const { track } = usePlayer();

  return (
    <div className="audio-info">
      <div className="image-wrapper">
        <img src={track.image as string} draggable={false} />
      </div>
      <summary>
        <p className="audio-title">{track.title}</p>
        <p className="audio-artist">{track.artist}</p>
      </summary>
    </div>
  );
};
