import { AudioContext } from '@/context/audio-context';
import React from 'react';

export const useAudio = () => {
  const {
    handlePlaying,
    playing,
    currentTime,
    seek,
    buffer,
    volumeChange,
    loading,
  } = React.useContext(AudioContext);

  return {
    isPlaying: playing,
    duration: buffer?.duration,
    currentTime,
    togglePlay: handlePlaying,
    seek,
    loading,
    volumeChange,
  };
};
