import { PauseIcon } from '@/icons/pause';
import { PlayIcon } from '@/icons/play';
import React from 'react';

export const PlayerButton = () => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <button
      className="controller-play-button"
      onClick={() => setPlaying((prev) => !prev)}
    >
      {!playing ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
