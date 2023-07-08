import { PauseIcon } from '@/icons/pause';
import { PlayIcon } from '@/icons/play';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import React from 'react';

export const PlayerButton = () => {
  const { togglePlay, isPlaying } = useAudio();

  return (
    <button className="controller-play-button" onClick={() => togglePlay()}>
      {!isPlaying ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
