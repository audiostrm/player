import { API_URL } from '@/api';
import { AudioContext as Context, AudioType } from '@/context/audio-context';
import React, { useEffect, useRef, useState } from 'react';

export const AudioProvider = ({ children }: React.PropsWithChildren) => {
  const source = useRef<AudioBufferSourceNode>();
  const ctx = useRef<AudioContext>();
  const startTime = useRef<number>(0);
  const playlistIdRef = useRef<string>('');
  const volumeValue = useRef<number>(0.8);
  const gainNode = useRef<GainNode>();
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [buffer, setBuffer] = useState<AudioBuffer>();
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [data, setData] = useState<AudioType>({});

  const remoteLoadAudio = (newTrack: AudioType, playlistId?: string) => {
    
    if (newTrack.id === data.id || playlistIdRef.current === playlistId) {
      handlePlaying();
      return;
    }
    
    if(playlistId){
      playlistIdRef.current = playlistId
    }
    
    stop();
    setLoading(true);
    setPlaying(false);
    setData(newTrack);
    setCurrentTime(0);
    fetch(API_URL + newTrack.id)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        loadNewBuffer(arrayBuffer);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (buffer) play();
  }, [buffer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (buffer) {
        if (currentTime >= buffer?.duration) {
          stop(true);
          setPlaybackTime(0);
          setPlaying(false);
          clearInterval(interval);
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

  async function loadNewBuffer(chunk: ArrayBuffer) {
    ctx.current = new AudioContext();

    const decodedChunk = await ctx.current.decodeAudioData(chunk);

    setBuffer(decodedChunk);

    setPlaybackTime(0);
  }

  const initSource = () => {
    source.current = ctx.current?.createBufferSource();
    source.current!.buffer = buffer as AudioBuffer;
    gainNode.current = ctx.current?.createGain();

    source.current
      ?.connect(gainNode.current as GainNode)
      .connect(ctx.current?.destination as AudioDestinationNode);
    gainNode.current!.gain.value = volumeValue.current;
  };

  const play = () => {
    if (playing || loading) return;

    setCurrentTime(playbackTime);

    initSource();
    source.current?.start(0, playbackTime);
    startTime.current = Date.now();
    setPlaying(true);
  };

  const stop = (pause?: boolean) => {
    if (!playing) return;

    const timelapse = Date.now() - startTime.current;
    const playback = pause ? timelapse / 1000 + playbackTime : 0;

    setPlaybackTime(playback);

    source.current?.stop();
  };

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

  const pause = () => {
    setPlaying(false);
    stop(true);
  };

  function handlePlaying() {
    if (playing) {
      setPlaying(false);
      pause();
      return;
    }

    play();
  }

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
