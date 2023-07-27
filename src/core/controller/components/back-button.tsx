import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import { BackIcon } from '@/icons/back';
import React, { useContext } from 'react';

export const BackButton = () => {
  const { backAudio } = useContext(PlaylistContext);
  const { resetTime } = useContext(AudioContext);

  return (
    <div
      className="side-controller-button"
      onClick={resetTime}
      onDoubleClick={backAudio}
    >
      <BackIcon />
    </div>
  );
};
