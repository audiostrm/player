import { ShuffleIcon } from '@/icons/shuffle';
import React from 'react';
// import { shuffleStatusColor } from '../utils/shuffle-status-color';
// import { PlaylistContext } from '@/context/playlist-context';

export const ShuffleButton = () => {
  // const { isShuffle, toggleShuffle } = useContext(PlaylistContext);

  // const shuffleIconColor = useMemo(
  //   () => shuffleStatusColor(isShuffle),
  //   [isShuffle]
  // );

  return (
    <div className="side-controller-button">
      <ShuffleIcon color={'#868686'} />
    </div>
  );
};
