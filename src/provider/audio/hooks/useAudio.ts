import { AudioContext } from '@/context/audio-context';
import React from 'react';

export const useAudio = () => {
  const {
    handlePlaying,
    playing,
    currentTime,
    seek,
    volumeChange,
    loading,
    setCurrentTime,
    audio,
    audioNode,
  } = React.useContext(AudioContext);

  return {
    isPlaying: playing,
    duration: audio.duration,
    currentTime,
    togglePlay: handlePlaying,
    setCurrentTime,
    seek,
    audioNode,
    audio,
    loading,
    volumeChange,
  };
};
