import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import { BackIcon } from '@/icons/back';
import React, { MouseEventHandler, useContext } from 'react';

export const BackButton = () => {
  const { backAudio } = useContext(PlaylistContext);
  const { resetTime } = useContext(AudioContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    switch (e.detail) {
      case 1:
        resetTime();
        break;
      case 2:
        backAudio();
        break;
    }
  };

  return (
    <div className="side-controller-button" onClick={handleClick}>
      <BackIcon />
    </div>
  );
};
