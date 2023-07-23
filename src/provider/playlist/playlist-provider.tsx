import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import React, { useContext, useEffect, useMemo } from 'react';
import { usePlaylist } from './hooks/usePlaylist';
import { toggleLoopStatus } from './utils/toggle-loop';

export type LoopStatusType = 'none' | 'single' | 'all';

export const PlaylistProvider = ({ children }: React.PropsWithChildren) => {
  const {
    audio: track,
    setAudio,
    isEnded,
    handlePlaying,
  } = useContext(AudioContext);
  const { playlist, setPlaylist } = usePlaylist();
  const [loopStatus, setLoopStatus] = React.useState<LoopStatusType>('none');
  const [isShuffle, setIsShuffle] = React.useState<boolean>(false);

  const trackIndex = useMemo(() => {
    const audioIndex = playlist.audios.findIndex(
      (audio) => audio.id === track.id
    );

    return audioIndex;
  }, [track, playlist]);

  const toggleShuffle = () => setIsShuffle((prev) => !prev);
  const toggleLoop = () => setLoopStatus(toggleLoopStatus(loopStatus));

  const backAudio = () => {
    if (!track.id || !playlist.id) return;

    if (trackIndex === 0) {
      setAudio(playlist.audios[playlist.audios.length - 1]);
      return;
    }

    setAudio(playlist.audios[trackIndex - 1]);
  };

  const forwardAudio = () => {
    if (!track.id || !playlist.id) return;

    if (playlist.audios.length - 1 === trackIndex) {
      setAudio(playlist.audios[0]);
      return;
    }

    setAudio(playlist.audios[trackIndex + 1]);
  };

  useEffect(() => {
    if (isEnded) {
      if (loopStatus === 'single') {
        handlePlaying();
      }
      if (loopStatus === 'all') {
        forwardAudio();
      }
    }
  }, [isEnded, loopStatus]);
  
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
        backAudio,
        forwardAudio,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
