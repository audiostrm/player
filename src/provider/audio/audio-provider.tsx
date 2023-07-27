import { API_URL } from '@/api';
import { AudioContext as Context, AudioType } from '@/context/audio-context';
import React, { useEffect, useRef, useState } from 'react';
import { PLAYERSTORAGE } from '../playlist/constant/keys';
import { isAudioType } from './utils/is-audio-type';
import { LastAudioLocalType } from './types';

export const AudioProvider = ({ children }: React.PropsWithChildren) => {
  const source = useRef<AudioBufferSourceNode>();
  const ctx = useRef<AudioContext>();
  const startTime = useRef<number>(0);
  const playlistIdRef = useRef<string>('');
  const volumeValue = useRef<number>(0.8);
  const gainNode = useRef<GainNode>();
  const abortController = useRef<AbortController>(new AbortController());
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [buffer, setBuffer] = useState<AudioBuffer>();
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [data, setData] = useState<AudioType>({});
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (data?.id) {
      localStorage.setItem(PLAYERSTORAGE.LAST_AUDIO, JSON.stringify(data));
    }
  }, [data, currentTime]);

  useEffect(() => {
    const localLastAudio = localStorage.getItem(PLAYERSTORAGE.LAST_AUDIO);

    if (!localLastAudio) return;

    const parseLastAudio: LastAudioLocalType = JSON.parse(localLastAudio);

    if (!isAudioType(parseLastAudio)) {
      localStorage.removeItem(PLAYERSTORAGE.LAST_AUDIO);
      return;
    }

    setData(parseLastAudio);
  }, []);

  const remoteLoadAudio = (newTrack: AudioType, playlistId?: string) => {
    setData(newTrack);
    if (newTrack.id === data?.id || playlistIdRef.current === playlistId) {
      handlePlaying();
      return;
    }

    if (playlistId) {
      playlistIdRef.current = playlistId;
    }

    stop();
    setLoading(true);
    setPlaying(false);
    setCurrentTime(0);

    if (loading) {
      console.log('aborted?');

      abortController.current.abort();
      abortController.current = new AbortController();
    }

    // fetch audio and decode arraybuffer
    fetch(API_URL + newTrack.id, { signal: abortController.current.signal })
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        loadNewBuffer(arrayBuffer);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //if new buffer appeared play audio
  useEffect(() => buffer && play(), [buffer]);

  // currentTime and audio end handler
  useEffect(() => {
    const interval = setInterval(() => {
      if (buffer) {
        if (currentTime >= buffer?.duration) {
          stop(true);
          setPlaybackTime(0);
          setPlaying(false);
          clearInterval(interval);
          setIsEnded(true);
        }
      }

      if (playing) {
        const captureStamp = Date.now();
        const currentStamp =
          (captureStamp - startTime.current) / 1000 + playbackTime;

        setCurrentTime(currentStamp);
      }
      if (!playing) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentTime, playbackTime, playing]);

  // load new chunk from API
  async function loadNewBuffer(chunk: ArrayBuffer) {
    ctx.current = new AudioContext();

    const decodedChunk = await ctx.current.decodeAudioData(chunk);

    setBuffer(decodedChunk);

    setPlaybackTime(0);
    setIsEnded(false);
  }

  // prepare speakers and volume
  const initSource = () => {
    source.current = ctx.current?.createBufferSource();
    source.current!.buffer = buffer as AudioBuffer;
    gainNode.current = ctx.current?.createGain();

    source.current
      ?.connect(gainNode.current as GainNode)
      .connect(ctx.current?.destination as AudioDestinationNode);
    gainNode.current!.gain.value = volumeValue.current;
  };

  // playing and fetching locally saved audio handler
  const play = () => {
    if (!buffer && data.id && !loading) {
      setLoading(true);
      fetch(API_URL + data.id)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          loadNewBuffer(arrayBuffer);
          setLoading(false);
        });
      return;
    }

    if (playing || loading) return;

    setCurrentTime(playbackTime);

    initSource();
    source.current?.start(0, playbackTime);
    startTime.current = Date.now();
    setPlaying(true);
  };

  // stop audio
  const stop = (pause?: boolean) => {
    if (!playing) return;

    const timelapse = Date.now() - startTime.current;
    const playback = pause ? timelapse / 1000 + playbackTime : 0;

    setPlaybackTime(playback);

    source.current?.stop();
  };

  // seeking audio on time handler
  const seek = (seekTime: number) => {
    if (playbackTime > buffer?.duration!) return;

    if (playing) {
      source.current?.stop(0);
      initSource();
      setPlaybackTime(seekTime);
      setCurrentTime(seekTime);
      startTime.current = Date.now();
      source.current?.start(0, seekTime);
    }
    setPlaybackTime(seekTime);
  };

  // pause handler
  const pause = () => {
    setPlaying(false);
    stop(true);
  };

  // remotely clicking play/pause handler
  function handlePlaying() {
    if (playing) {
      setPlaying(false);
      pause();
      return;
    }

    play();
  }

  // volume changer handler
  const volumeChange = (volume: `${number}%`) => {
    const pureNumber = Number(volume.replace('%', ''));
    volumeValue.current = pureNumber / 100;

    if (gainNode.current) {
      gainNode.current!.gain.value = pureNumber / 100;
    }
  };

  return (
    <Context.Provider
      value={{
        seek,
        resetTime: () => seek(0),
        playing,
        handlePlaying,
        ctx: ctx.current,
        buffer,
        volumeChange,
        loading,
        currentTime,
        setCurrentTime,
        setAudio: remoteLoadAudio,
        audio: data,
        isEnded,
      }}
    >
      {children}
    </Context.Provider>
  );
};
