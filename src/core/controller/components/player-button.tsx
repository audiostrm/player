import { PauseIcon } from '@/icons/pause';
import { PlayIcon } from '@/icons/play';
import React from 'react';

type PlayerButtonProps = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayerButton = ({ playing, setPlaying }: PlayerButtonProps) => {
  return (
    <button
      className="controller-play-button"
      onClick={() => setPlaying((prev) => !prev)}
    >
      {!playing ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
