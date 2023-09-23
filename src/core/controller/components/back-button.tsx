import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import { BackIcon } from '@/icons/back';
import React from 'react';

export const BackButton = () => {
  const { backAudio } = React.useContext(PlaylistContext);
  const { seek } = React.useContext(AudioContext);

  return (
    <div
      className="rounded-full hover:bg-white/20 w-8 h-8 flex-none flex items-center justify-center pr-0.5"
      onClick={() => seek(0)}
      onDoubleClick={backAudio}
    >
      <BackIcon />
    </div>
  );
};
