import { AudioContext } from '@/context/audio-context';
import React from 'react';

export const useAudio = () => {
  const {
    handlePlaying,
    playing,
    currentTime,
    seek,
    volumeChange,
    isPressed,
    setIsPressed,
    loading,
    setCurrentTime,
    audio,
    beforeReleaseTime,
    setBeforeReleaseTime,
    audioNode,
    onUsernameNavigate,
  } = React.useContext(AudioContext);

  return {
    onUsernameNavigate,
    isPlaying: playing,
    isPressed,
    setIsPressed,
    duration: audio.duration,
    currentTime,
    togglePlay: handlePlaying,
    setCurrentTime,
    seek,
    audioNode,
    beforeReleaseTime,
    setBeforeReleaseTime,
    audio,
    loading,
    volumeChange,
  };
};
