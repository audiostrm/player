import { AudioContext } from '@/context/audio-context';
import { PlaylistContext } from '@/context/playlist-context';
import React, { useContext, useEffect, useMemo } from 'react';
import { usePlaylist } from './hooks/usePlaylist';
import { toggleLoopStatus } from './utils/toggle-loop';
import { PLAYERSTORAGE } from '../../constant/keys';

export type LoopStatusType = 'none' | 'single' | 'all';
const loopValidate: LoopStatusType[] = ['all', 'none', 'single'];

export const PlaylistProvider = ({ children }: React.PropsWithChildren) => {
  const { audio: track, setAudio, audioNode } = useContext(AudioContext);
  const { playlist, setPlaylist } = usePlaylist();
  const [loopStatus, setLoopStatus] = React.useState<LoopStatusType>('none');
  const [isShuffle, setIsShuffle] = React.useState<boolean>(false);  

  const trackIndex = useMemo(() => {
    const audioIndex = playlist.audios.findIndex(
      (audio) => audio.id === track.id
    );

    return audioIndex;
  }, [track, playlist]);

  const toggleShuffle = () => {
    localStorage.setItem(PLAYERSTORAGE.SHUFFLE, JSON.stringify(!isShuffle));
    setIsShuffle((prev) => !prev);
  };
  const toggleLoop = () => {
    localStorage.setItem(
      PLAYERSTORAGE.LOOP,
      JSON.stringify(toggleLoopStatus(loopStatus))
    );
    setLoopStatus(toggleLoopStatus(loopStatus));
  };
  const backAudio = () => {
    if (!track.id || !playlist.id) return;

    if (trackIndex === 0) {
      setAudio(playlist.audios[playlist.audios.length - 1]);
      return;
    }

    setAudio(playlist.audios[trackIndex - 1], undefined, true);
  };

  const forwardAudio = () => {
    if (!track.id || !playlist.id) return;

    if (playlist.audios.length - 1 === trackIndex) {
      setAudio(playlist.audios[0]);
      return;
    }

    setAudio(playlist.audios[trackIndex + 1], undefined, true);
  };

  useEffect(() => {
    audioNode?.addEventListener('ended', () => {
      if (loopStatus === 'single') {
        audioNode?.play();
      }
      if (loopStatus === 'all') {
        forwardAudio();
      }
    });
  });

  useEffect(() => {
    const shuffleLocal = localStorage.getItem(PLAYERSTORAGE.SHUFFLE);
    const loopLocal = localStorage.getItem(PLAYERSTORAGE.LOOP);

    if (shuffleLocal) {
      const parseShuffle = JSON.parse(shuffleLocal);
      setIsShuffle(!!parseShuffle);
    }

    if (loopLocal) {
      const parseLoop = JSON.parse(loopLocal);
      if (!loopValidate.includes(parseLoop)) {
        localStorage.removeItem(PLAYERSTORAGE.LOOP);
      } else {
        setLoopStatus(parseLoop);
      }
    }
  }, []);

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
