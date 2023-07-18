import { usePlayer } from '@/hooks/usePlayer';
import { PauseIcon } from '@/icons/pause';
import { PlayIcon } from '@/icons/play';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import React from 'react';

export const PlayerButton = () => {
  const { togglePlay, isPlaying, loading } = useAudio();
  const { audio } = usePlayer();

  if (loading) {
    return <span className="loader" />;
  }

  return (
    <button
      className="controller-play-button"
      disabled={!audio.id}
      onClick={() => togglePlay()}
    >
      {!isPlaying ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
