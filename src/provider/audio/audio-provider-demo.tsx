import { API_URL, CHUNK_SIZE } from '@/api';
import { AudioContext as Context, AudioType } from '@/context/audio-context';
import React, { useRef, useState } from 'react';
import { fetchDecode } from './utils/fetch-decode';

export const AudioDemoProvider = ({ children }: React.PropsWithChildren) => {
  const sourceNodes = useRef<AudioBufferSourceNode[]>([]);
  const audioBuffers = useRef<AudioBuffer[]>([]);
  const sourceIndex = useRef<number>(0);
  const ctx = useRef<AudioContext>();
  const startTime = useRef<number>(0);
  const playbackTime = useRef<number>(0);
  const gainNode = useRef<GainNode>();
  const totalChunks = useRef<number>(-1);
  const volumeValue = useRef<number>(0.8);
  const [isEnded] = useState(false);
  const [loading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playlistRef = useRef<string>('');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [audio, setAudio] = useState<AudioType>({
    duration: 0,
    preChunk: '',
  });

  function resetTime() {}

  function volumeChange(volume: `${number}%`) {
    const pureNumber = Number(volume.replace('%', ''));
    volumeValue.current = pureNumber / 100;

    if (gainNode.current) {
      gainNode.current!.gain.value = pureNumber / 100;
    }
  }

  const sourceEnd = () => {
    const timelapse = Date.now() - startTime.current;
    const playback = timelapse / 1000 + playbackTime.current;

    if (playback >= CHUNK_SIZE) {
      startTime.current = Date.now();
      playbackTime.current = 0;
      playSourceNode();
    } else {
      startTime.current = Date.now();
      setPlaying(false);
      playbackTime.current = playback;
      sourceNodes.current[sourceIndex.current].stop();
    }
  };

  function seek() {}

  function createGainNode(src: AudioBufferSourceNode) {
    src
      ?.connect(gainNode.current as GainNode)
      .connect(ctx.current?.destination as AudioDestinationNode);
    gainNode.current!.gain.value = volumeValue.current;
  }

  function createVolume(src: AudioBufferSourceNode) {
    // dont recreate gainnode, to keep sync of volume as first source node
    if (!gainNode.current) {
      gainNode.current = ctx.current?.createGain();
    }

    createGainNode(src);
  }

  function playSourceNode() {
    sourceNodes.current[sourceIndex.current].stop();
    sourceIndex.current++;

    if (
      sourceIndex.current > sourceNodes.current.length - 1 &&
      sourceNodes.current.length < totalChunks.current
    ) {
      const interval = setInterval(() => {
        if (sourceIndex.current <= sourceNodes.current.length - 1) {
          createVolume(sourceNodes.current[sourceIndex.current]);
          sourceNodes.current[sourceIndex.current].start();
          sourceNodes.current[sourceIndex.current].addEventListener(
            'ended',
            sourceEnd
          );
          clearInterval(interval);
        }
      }, 1500);
    }

    if (sourceIndex.current > sourceNodes.current.length - 1) return;

    sourceNodes.current[sourceIndex.current].start();
    sourceNodes.current[sourceIndex.current].addEventListener(
      'ended',
      sourceEnd
    );
  }

  // fetch new audio and audio urls and play
  async function remotelyLoad(
    newTrack: AudioType,
    playlistId?: string,
    userInteracted?: boolean
  ) {
    if (newTrack.id === audio.id) {
      handlePlaying();
      return;
    }

    if (playlistId === playlistRef.current && newTrack.id === audio.id) {
      handlePlaying();
      return;
    }

    if (
      playlistId === playlistRef.current &&
      newTrack.id !== audio.id &&
      !userInteracted
    ) {
      handlePlaying();
      return;
    }

    if (playlistId !== playlistRef.current && newTrack.id === audio.id) {
      handlePlaying();
      return;
    }

    if (playlistId) {
      playlistRef.current = playlistId;
    }
    ctx.current = new AudioContext();
    setAudio(newTrack);
    setPlaying(true);
    setCurrentTime(0);

    const arrayBuffer = await fetchDecode(newTrack.preChunk);

    // create buffer decode and push in source nodes
    const audioBuffer = await ctx.current?.decodeAudioData(arrayBuffer);
    audioBuffers.current = [audioBuffer];
    const src = ctx.current?.createBufferSource() as AudioBufferSourceNode;
    src!.buffer = audioBuffer as AudioBuffer;
    // connect to gain node src
    startTime.current = Date.now();
    createVolume(src);
    sourceNodes.current.push(src);

    // start playing
    play();
    // startTime.current = Date.now();

    // meanwhile fetch other audios
    const audioUrlsResponse = await fetch(API_URL + newTrack.id);
    const audios: string[] = await audioUrlsResponse.json();

    // update totalChunks
    totalChunks.current = audios.length + 1;

    // run through urls fetch and push into source nodes
    for (let audio of audios) {
      const arrayBuffer = await fetchDecode(audio);
      const audioBuffer = await ctx.current.decodeAudioData(arrayBuffer);
      audioBuffers.current.push(audioBuffer);
      const src = ctx.current.createBufferSource();
      src.buffer = audioBuffer;
      createVolume(src);
      sourceNodes.current.push(src);
    }
  }

  function play() {
    if (playing || loading) return;

    // re install new buffer to continue playing from stopped buffer
    const reInstallSource = ctx.current?.createBufferSource();
    reInstallSource!.buffer = audioBuffers.current[sourceIndex.current];

    // recreate gain volume
    createGainNode(reInstallSource!);
    // put same source in same array index
    sourceNodes.current[sourceIndex.current] = reInstallSource!;

    // start playing of audio where it was paused
    sourceNodes.current[sourceIndex.current].start(0, playbackTime.current);
    sourceNodes.current[sourceIndex.current].onended = sourceEnd;

    setPlaying(true);
  }

  function handlePlaying() {
    if (playing) {
      setPlaying(false);
      sourceNodes.current[sourceIndex.current].stop();
    } else {
      startTime.current = Date.now();
      play();
    }
  }

  return (
    <Context.Provider
      value={{
        audio,
        currentTime,
        handlePlaying,
        isEnded,
        loading,
        playing,
        resetTime,
        seek,
        setAudio: remotelyLoad,
        setCurrentTime,
        volumeChange,
        ctx: ctx.current,
      }}
    >
      {children}
    </Context.Provider>
  );
};
