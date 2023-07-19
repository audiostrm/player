import { AudioType } from '@/context/audio-context';
import { useState } from 'react';

export const usePlaylist = () => {
  const [playlist, setPlaylists] = useState<{
    id: string;
    audios: AudioType[];
  }>({ audios: [], id: '' });

  const setPlaylist = (playlist: { id: string; audios: AudioType[] }) => {    
    setPlaylists(playlist);
  };

  return { setPlaylist, playlist };
};
