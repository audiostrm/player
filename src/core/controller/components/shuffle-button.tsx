import { ShuffleIcon } from '@/icons/shuffle';
import React, { useMemo, useState } from 'react';
import { shuffleStatusColor } from '../utils/shuffle-status-color';

export const ShuffleButton = () => {
  const [isShuffle, setIsShuffle] = useState<boolean>(false);

  const shuffleIconColor = useMemo(
    () => shuffleStatusColor(isShuffle),
    [isShuffle]
  );

  return (
    <button
      className="side-controller-button"
      onClick={() => setIsShuffle((prev) => !prev)}
    >
      <ShuffleIcon color={shuffleIconColor} />
    </button>
  );
};
