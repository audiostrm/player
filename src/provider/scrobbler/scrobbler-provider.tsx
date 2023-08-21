import React from 'react'
import { useAudio } from '@/provider/audio/hooks/useAudio';
import { ScrobbleType } from '@/types/scrobble.types';
import { useContext, useEffect, useRef } from 'react';
import { calculateStream } from './utils/calculateStream';
import { PlaylistContext } from '@/context/playlist-context';
import { mergeSeconds } from './utils/mergeSeconds';

type ScrobblerProps = {
  onPlaylistScrobble: (props: ScrobbleType) => void;
  onAudioScrobble: (props: ScrobbleType) => void;
};

export const ScrobblerProvider = ({
  onAudioScrobble,
  onPlaylistScrobble,
  children,
}: React.PropsWithChildren<ScrobblerProps>) => {
  const { audioNode, audio } = useAudio();
  const { playlist } = useContext(PlaylistContext);

  const startTime = useRef<number>(0);
  const audioPlaybacks = useRef<number[]>([]);
  const prevAudio = useRef<typeof audio>({ id: '', duration: 0, url: '' });
  const playlistPlaybacks = useRef<number[]>([]);

  const audioScrobbleTrigger = () => {
    const { streamedSeconds, percent } = calculateStream(
      prevAudio.current.duration,
      audioPlaybacks.current
    );

    if (percent >= 75) {
      onAudioScrobble({ id: audio.id, streamedSeconds });
    }

    startTime.current = Date.now();
    audioPlaybacks.current = [];
  };

  const playlistScrobbleTrigger = () => {
    if (!playlist.id) return;

    const mergedSeconds = mergeSeconds(playlistPlaybacks.current);

    if (mergedSeconds >= 60) {
      onPlaylistScrobble({ id: playlist.id, streamedSeconds: mergedSeconds });
      playlistPlaybacks.current = [];
    }
  };

  useEffect(() => {
    if (!playlist.id || playlist.audios.length === 0) return;

    playlistScrobbleTrigger();
  }, [playlist]);

  useEffect(() => {
    if (!audio.id) return;

    const audioIsInPlaylist = playlist.audios.some(
      (e) => e.id === prevAudio.current.id
    );

    if (startTime.current !== 0 && audioIsInPlaylist) {
      const playbackTime = (Date.now() - startTime.current) / 1000;
      playlistPlaybacks.current.push(playbackTime);
    }

    const playbackTime = (Date.now() - startTime.current) / 1000;
    if (startTime.current !== 0) {
      audioPlaybacks.current.push(playbackTime);
    }

    audioScrobbleTrigger();
    prevAudio.current = audio;

    if (!audioIsInPlaylist) {
      playlistPlaybacks.current = [];
    }
  }, [audio]);

  const onAudioPause = () => {
    const playbackTime = (Date.now() - startTime.current) / 1000;
    if (startTime.current !== 0) {
      audioPlaybacks.current.push(playbackTime);
    }

    const audioIsInPlaylist = playlist.audios.some((e) => e.id === audio.id);

    if (playlist.id && startTime.current !== 0 && audioIsInPlaylist) {
      playlistPlaybacks.current.push(playbackTime);
      playlistScrobbleTrigger();
    }

    if (!audioIsInPlaylist) {
      playlistPlaybacks.current = [];
    }

    startTime.current = Date.now();
  };

  const onAudioEnd = () => {
    const playbackTime = (Date.now() - startTime.current) / 1000;
    if (startTime.current !== 0) {
      audioPlaybacks.current.push(playbackTime);
    }

    audioScrobbleTrigger();
    playlistScrobbleTrigger();
    startTime.current = 0;
  };

  const onAudioPlay = () => {
    playlistScrobbleTrigger();
    startTime.current = Date.now();
  };

  useEffect(() => {
    audioNode?.addEventListener('pause', onAudioPause);
    audioNode?.addEventListener('ended', onAudioEnd);
    audioNode?.addEventListener('play', onAudioPlay);
    return () => {
      audioNode?.removeEventListener('pause', onAudioPause);
      audioNode?.removeEventListener('ended', onAudioEnd);
      audioNode?.removeEventListener('play', onAudioPlay);
    };
  });

  return <>{children}</>;
};
