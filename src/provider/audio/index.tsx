import { AudioContext as Context } from '@/context/audio-context';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

export const AudioProvider = ({ children }: React.PropsWithChildren) => {
  const source = useRef<AudioBufferSourceNode>();
  const ctx = useRef<AudioContext>();
  const playbackTime = useRef<number>(0);
  const startTime = useRef<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [buffer, setBuffer] = useState<AudioBuffer>();

  useEffect(() => {
    axios
      .get('http://localhost:13000/stream', { responseType: 'arraybuffer' })
      .then(({ data }) => loadNewBuffer(data));
  }, []);

  const playerFinished = () => {
    const timelapse = Date.now() - startTime.current;
    const currentTime = timelapse / 1000 + playbackTime.current;

    if (currentTime >= Number(buffer?.duration)) {
      stop(true);
      playbackTime.current = 0;
      setPlaying(false);
    }
  };

  const initSource = () => {
    source.current = ctx.current?.createBufferSource();
    source.current!.buffer = buffer as AudioBuffer;
    source.current?.connect(ctx.current?.destination!);
    source.current?.addEventListener('ended', playerFinished);
  };

  const play = () => {
    if (playing) return;

    initSource();
    source.current?.start(0, playbackTime.current);
    startTime.current = Date.now();
    setPlaying(true);
  };

  const stop = (pause?: boolean) => {
    if (!playing) return;

    const timelapse = Date.now() - startTime.current;
    playbackTime.current = pause ? timelapse / 1000 + playbackTime.current : 0;
    setPlaying(false);
    source.current?.stop();
  };

  const seek = (seekTime: number) => {
    if (playbackTime.current > buffer?.duration!) return;

    if (playing) {
      source.current?.stop(0);
      initSource();
      playbackTime.current = seekTime;
      startTime.current = Date.now();
      source.current?.start(0, seekTime);
    }
    playbackTime.current = seekTime;
    startTime.current = Date.now();
  };

  const pause = () => {
    stop(true);
  };

  async function loadNewBuffer(buffer: ArrayBuffer) {
    stop();

    ctx.current = new AudioContext();
    const decodeBuffer = await ctx.current.decodeAudioData(buffer);

    setBuffer(decodeBuffer);
    playbackTime.current = 0;
  }

  const handlePlaying = () => {
    if (playing) {
      setPlaying(false);
      pause();
      return;
    }

    play();
    setPlaying(true);
  };

  return (
    <Context.Provider
      value={{
        seekHandler: seek,
        playing,
        handlePlaying,
        ctx: ctx.current,
        buffer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
