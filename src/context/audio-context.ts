import React from 'react';

export type AudioType = {
  image?: string | null;
  id: string | null;
  title?: string | null;
  duration: number;
  url: string;
  uploader?: {
    name: string | null;
  } | null;
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
  audioNode?: HTMLAudioElement;
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
  currentTime: 0,
  setAudio: () => {},
  audio: {
    id: '',
    url: '',
    duration: 0,
  },
});
