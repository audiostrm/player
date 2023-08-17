import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import { BackIcon } from '@/icons/back';
import React from 'react';

export const BackButton = () => {
  const { backAudio } = React.useContext(PlaylistContext);
  const { seek } = React.useContext(AudioContext);

  return (
    <div
      className="side-controller-button"
      onClick={() => seek(0)}
      onDoubleClick={backAudio}
    >
      <BackIcon />
    </div>
  );
};
