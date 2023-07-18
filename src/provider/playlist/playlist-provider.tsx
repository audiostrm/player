import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import React, { useContext, useMemo } from 'react';
import { usePlaylist } from './hooks/usePlaylist';
import { toggleLoopStatus } from './utils/toggle-loop';

export type LoopStatusType = 'none' | 'single' | 'all';

export const PlaylistProvider = ({ children }: React.PropsWithChildren) => {
  const { audio } = useContext(AudioContext);
  const { playlist, setPlaylist } = usePlaylist();
  const [loopStatus, setLoopStatus] = React.useState<LoopStatusType>('none');
  const [isShuffle, setIsShuffle] = React.useState<boolean>(false);

  const trackIndex = useMemo(() => {
    const audioIndex = playlist.audios.findIndex(
      (audio) => audio.id === audio.id
    );

    return audioIndex;
  }, [audio, playlist]);

  const toggleShuffle = () => setIsShuffle((prev) => !prev);
  const toggleLoop = () => setLoopStatus(toggleLoopStatus(loopStatus));

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        setPlaylist,
        trackIndex,
        toggleShuffle,
        isShuffle,
        loopStatus,
        toggleLoop,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
