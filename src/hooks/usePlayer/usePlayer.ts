import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import { useContext } from 'react';

export const usePlayer = () => {
  const { setAudio, audio, playing } = useContext(AudioContext);
  const { setPlaylist, playlist } = useContext(PlaylistContext);

  return { setAudio, audio, setPlaylist, playlist, playing };
};
