import React from 'react';

export type AudioType = {
  url: string;
  id: string;
  image?: string | null;
  title?: string;
  artist?: string | null;
  duration: number;
};

export type AudioContextProps = {
  playing: boolean;
  handlePlaying: () => void;
  seek: (seek: number) => void;
  volumeChange: (volume: `${number}%`) => void;
  loading: boolean;
  currentTime: number;
  setAudio: (
    data: AudioType,
    playlistId?: string,
    userInteracted?: boolean
  ) => void;
  audioNode: HTMLAudioElement;
  audio: AudioType;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
};

export const AudioContext = React.createContext<AudioContextProps>({
  playing: false,
  setCurrentTime: () => {},
  handlePlaying: () => {},
  seek: () => {},
  volumeChange: () => {},
  loading: false,
  audioNode: new Audio(),
  currentTime: 0,
  setAudio: () => {},
  audio: {
    id: '',
    url: '',
    duration: 0,
  },
});
