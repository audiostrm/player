import React from 'react';

export type AudioType = {
  nextImage?: JSX.Element;
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
  isPressed: boolean;
  setAudio: (
    data: AudioType,
    playlistId?: string,
    userInteracted?: boolean
  ) => void;
  audioNode?: HTMLAudioElement;
  audio: AudioType;
  beforeReleaseTime: number;
  setBeforeReleaseTime: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  onUsernameNavigate: (username: string) => void;
  onAudioNavigate: (id: string) => void;
};

export const AudioContext = React.createContext<AudioContextProps>({
  playing: false,
  onAudioNavigate: () => {},
  onUsernameNavigate: () => {},
  setIsPressed: () => {},
  beforeReleaseTime: 0,
  isPressed: false,
  setCurrentTime: () => {},
  setBeforeReleaseTime: () => {},
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
