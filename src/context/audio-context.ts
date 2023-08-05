import React from 'react';

export type AudioType = {
  id?: string;
  preChunk: string;
  image?: string | null;
  title?: string;
  artist?: string | null;
  duration: number;
};

export type AudioContextProps = {
  playing: boolean;
  handlePlaying: () => void;
  ctx?: AudioContext;
  buffer?: AudioBuffer;
  resetTime: () => void;
  seek: (seek: number) => void;
  volumeChange: (volume: `${number}%`) => void;
  loading: boolean;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setAudio: (
    data: AudioType,
    playlistId?: string,
    userInteracted?: boolean
  ) => void;
  audio: AudioType;
  isEnded: boolean;
};

export const AudioContext = React.createContext<AudioContextProps>({
  playing: false,
  handlePlaying: () => {},
  seek: () => {},
  resetTime: () => {},
  volumeChange: () => {},
  loading: false,
  currentTime: 0,
  setCurrentTime: () => {},
  setAudio: () => {},
  audio: {
    preChunk: '',
    duration: 0,
  },
  isEnded: false,
});
