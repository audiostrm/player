import React, { useContext } from 'react';
import { ForwardIcon } from '@/icons/forward';
import { PlaylistContext } from '@/context/playlist-context';

export const ForwardButton = () => {
  const { forwardAudio } = useContext(PlaylistContext);

  return (
    <div
      className="rounded-full hover:bg-slate-800 w-8 h-8 pl-0.5 flex-none flex items-center justify-center"
      onClick={forwardAudio}
    >
      <ForwardIcon />
    </div>
  );
};
