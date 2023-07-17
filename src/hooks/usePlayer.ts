import { AudioContext } from '@/context/audio-context';
import { useContext } from 'react';

export const usePlayer = () => {
  const { setData, track, setAudiosList } = useContext(AudioContext);

  return { setData, track, setAudiosList };
};
