import React from 'react';

export type AudioType = {
  id?: string;
  image?: string | null;
  title?: string;
  artist?: string | null;
};

export type AudioContextProps = {
  playing: boolean;
  handlePlaying: () => void;
  ctx?: AudioContext;
  buffer?: AudioBuffer;
  seek: (seek: number) => void;
  volumeChange: (volume: `${number}%`) => void;
  loading: boolean;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setAudio: (data: AudioType, playlistId?: string) => void;
  audio: AudioType;
};

export const AudioContext = React.createContext<AudioContextProps>({
  playing: false,
  handlePlaying: () => {},
  seek: () => {},
  volumeChange: () => {},
  loading: false,
  currentTime: 0,
  setCurrentTime: () => {},
  setAudio: () => {},
  audio: {},
});
