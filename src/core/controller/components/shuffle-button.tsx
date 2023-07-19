import { ShuffleIcon } from '@/icons/shuffle';
import React, { useContext, useMemo } from 'react';
import { shuffleStatusColor } from '../utils/shuffle-status-color';
import { PlaylistContext } from '@/context/playlist-context';

export const ShuffleButton = () => {
  const { isShuffle, toggleShuffle } = useContext(PlaylistContext);

  const shuffleIconColor = useMemo(
    () => shuffleStatusColor(isShuffle),
    [isShuffle]
  );

  return (
    <div className="side-controller-button" onClick={toggleShuffle}>
      <ShuffleIcon color={shuffleIconColor} />
    </div>
  );
};
