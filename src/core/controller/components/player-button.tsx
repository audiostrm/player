import React from 'react';
import { usePlayer } from '@/hooks/usePlayer/usePlayer';
import { PauseIcon } from '@/icons/pause';
import { PlayIcon } from '@/icons/play';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import { useSpace } from '../hooks/useSpace';
import { cn } from '@/lib/utils';

export const PlayerButton = ({ className }: { className?: string }) => {
  const { togglePlay, isPlaying, loading } = useAudio();
  const { audio } = usePlayer();
  useSpace();

  if (loading) {
    return <span className="loader" />;
  }

  return (
    <button
      className={cn(
        'bg-white rounded-full w-10 flex items-center justify-center h-10',
        className
      )}
      disabled={!audio.url}
      onClick={() => togglePlay()}
    >
      {!isPlaying ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
