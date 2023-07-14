import { AudioContext as Context } from '@/context/audio-context';
import React, { useEffect, useRef, useState } from 'react';

export const AudioProvider = ({ children }: React.PropsWithChildren) => {
  const source = useRef<AudioBufferSourceNode>();
  const ctx = useRef<AudioContext>();
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const startTime = useRef<number>(0);
  const gainNode = useRef<GainNode>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [buffer, setBuffer] = useState<AudioBuffer>();
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(
      'https://fetch-stream-audio.anthum.com/10mbps/house-41000hz-trim.wav'
    ).then(async (response) => {
      loadNewBuffer(await response.arrayBuffer());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        const captureStamp = Date.now();
        const currentStamp =
          (captureStamp - startTime.current) / 1000 + playbackTime;

        setCurrentTime(currentStamp);
      }
      if (!playing) {
        setCurrentTime(playbackTime);
        clearInterval(interval);
      }
    }, 1000);

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
    source.current?.addEventListener('ended', playerFinished);
    gainNode.current = ctx.current?.createGain();

    source.current
      ?.connect(gainNode.current as GainNode)
      .connect(ctx.current?.destination as AudioDestinationNode);
    gainNode.current!.gain.value = 0.8;
  };

  function playerFinished() {
    if (playing) {
      stop(true);
      setPlaybackTime(0);
      setPlaying(false);
    }
  }

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
      startTime.current = Date.now();
      source.current?.start(0, seekTime);
    }
    setPlaybackTime(seekTime);
  };

  const pause = () => {
    setPlaying(false);
    stop(true);
  };

  const handlePlaying = () => {
    if (playing) {
      setPlaying(false);
      pause();
      return;
    }

    play();
  };

  const volumeChange = (volume: `${number}%`) => {
    const pureNumber = Number(volume.replace('%', ''));
    gainNode.current!.gain.value = pureNumber / 100;
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
