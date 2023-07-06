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
      .then((data) => loadNewBuffer(data.data));
  }, []);

  const initSource = () => {
    source.current = ctx.current?.createBufferSource();
    source.current!.buffer = buffer as AudioBuffer;
    source.current?.connect(ctx.current?.destination!);
  };

  const play = () => {
    console.log('play');
    if (playing) return;

    initSource();
    source.current?.start(0, playbackTime.current);
    startTime.current = Date.now();
    setPlaying(true);
  };

  const stop = (pause?: boolean) => {
    if (!playing) return;
    setPlaying(false);
    source.current?.stop();
    playbackTime.current = pause
      ? (Date.now() - startTime.current) / 1000 + playbackTime.current
      : 0;
  };

  const seek = (seekTime: number) => {
    if (playbackTime.current > buffer?.duration!) {
      console.log('[Player] playback time is greater than buffer duration');
      return;
    }

    if (playing) {
      source.current?.stop(0);
      initSource();
      playbackTime.current = seekTime;
      source.current?.start(0, seekTime);
    }
    playbackTime.current = seekTime;
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
