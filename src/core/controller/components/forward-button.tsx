import React, { useContext } from 'react';
import { ForwardIcon } from '@/icons/forward';
import { PlaylistContext } from '@/context/playlist-context';

export const ForwardButton = () => {
  const { forwardAudio } = useContext(PlaylistContext);

  return (
    <div className="side-controller-button" onClick={forwardAudio}>
      <ForwardIcon />
    </div>
  );
};
