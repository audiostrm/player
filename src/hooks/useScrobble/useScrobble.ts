import { useAudio } from '@/provider/audio/hooks/useAudio';
import { usePlaylist } from '@/provider/playlist/hooks/usePlaylist';
import { ScrobbleType } from '@/types/scrobble.types';
import { useContext, useEffect, useRef } from 'react';
import { calculateStream } from './utils/calculateStream';
import { PlaylistContext } from '@/context/playlist-context';

type useScrobbleType = {
  onPlaylistScrobble: (props: ScrobbleType) => void;
  onAudioScrobble: (props: ScrobbleType) => void;
};

export const useScrobble = ({
  onAudioScrobble,
  onPlaylistScrobble,
}: useScrobbleType) => {
  const { audioNode, audio } = useAudio();
  const { playlist } = useContext(PlaylistContext);

  const startTime = useRef<number>(0);
  const audioPlaybacks = useRef<number[]>([]);
  const playlistPlaybacks = useRef<number[]>([]);

  const audioScrobbleTrigger = () => {
    const { streamedSeconds, percent } = calculateStream(
      audio.duration,
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

    const mergedSeconds = playlistPlaybacks.current.reduce((a, b) => a + b, 0);

    if (mergedSeconds >= 60) {
      onPlaylistScrobble({ id: playlist.id, streamedSeconds: mergedSeconds });
    }

    playlistPlaybacks.current = [];
  };

  useEffect(() => {
    if (!playlist.id || playlist.audios.length === 0) return;

    playlistScrobbleTrigger();
  }, [playlist]);

  useEffect(() => {
    if (!audio.id) return;

    const { streamedSeconds } = calculateStream(
      audio.duration,
      audioPlaybacks.current
    );

    playlistPlaybacks.current.push(streamedSeconds);

    audioScrobbleTrigger();
  }, [audio]);

  const onAudioPause = () => {
    const playbackTime = (Date.now() - startTime.current) / 1000;
    audioPlaybacks.current.push(playbackTime);
    if (playlist.id) {
      playlistPlaybacks.current.push(playbackTime);
    }

    startTime.current = Date.now();
  };

  const onAudioEnd = () => {
    audioScrobbleTrigger();
  };
  const onAudioPlay = () => {
    const isPlaylistPlaying = playlist.audios.some(
      (playlsitAudio) => playlsitAudio.id === audio.id
    );
    if (!isPlaylistPlaying) {
      playlistScrobbleTrigger();
      const playbackTime = (Date.now() - startTime.current) / 1000;
      playlistPlaybacks.current.push(playbackTime);

      playlistPlaybacks.current = [];
    }

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
};
