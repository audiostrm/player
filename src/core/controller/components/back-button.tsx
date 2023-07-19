import { PlaylistContext } from '@/context/playlist-context';
import { BackIcon } from '@/icons/back';
import React, { useContext } from 'react';

export const BackButton = () => {
  const { backAudio } = useContext(PlaylistContext);

  return (
    <div className="side-controller-button" onClick={backAudio}>
      <BackIcon />
    </div>
  );
};
