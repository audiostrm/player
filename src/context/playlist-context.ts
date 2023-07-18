import { createContext } from 'react';
import { AudioType } from './audio-context';
import { LoopStatusType } from '@/provider/playlist/playlist-provider';

type PlaylistContextType = {
  setPlaylist: (playlist: { id: string; audios: AudioType[] }) => void;
  playlist: { id: string; audios: AudioType[] };
  trackIndex: number;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  isShuffle: boolean;
  loopStatus: LoopStatusType;
};

export const PlaylistContext = createContext<PlaylistContextType>({
  setPlaylist: () => {},
  playlist: { id: '', audios: [] },
  trackIndex: -1,
  toggleShuffle: () => {},
  toggleLoop: () => {},
  isShuffle: false,
  loopStatus: 'none',
});
