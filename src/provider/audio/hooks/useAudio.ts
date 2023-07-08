import { AudioContext } from '@/context/audio-context';
import React from 'react';

export const useAudio = () => {
  const { handlePlaying, playing, ctx, seekHandler, buffer } =
    React.useContext(AudioContext);

  return {
    isPlaying: playing,
    duration: buffer?.duration,
    currentTime: ctx?.currentTime,
    togglePlay: handlePlaying,
    seekHandler,
  };
};
