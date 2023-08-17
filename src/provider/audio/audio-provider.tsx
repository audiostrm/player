import React, { useEffect, useRef, useState } from 'react';
import { AudioContext, AudioType } from '@/context/audio-context';
import { PLAYERSTORAGE } from '@/constant/keys';
import { LastAudioLocalType } from './types';
import { isAudioType } from './utils/is-audio-type';

export const AudioProvider = ({ children }: React.PropsWithChildren) => {
  const audio = useRef<HTMLAudioElement>(new Audio());
  const volumeValue = useRef<number>(0.8);
  const [loading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playlistRef = useRef<string>('');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const isInteracted = useRef(false);
  const [audioInfo, setAudioInfo] = useState<AudioType>({
    duration: 0,
    url: '',
    id: '',
  });

  const updateCurrentTime = () => {
    setCurrentTime(audio.current.currentTime);
  };

  useEffect(() => {
    if (audioInfo?.id) {
      localStorage.setItem(
        PLAYERSTORAGE.LAST_AUDIO,
        JSON.stringify({ ...audioInfo, lastStopped: currentTime })
      );
    }
  }, [audioInfo, currentTime]);

  useEffect(() => {
    const localLastAudio = localStorage.getItem(PLAYERSTORAGE.LAST_AUDIO);

    if (!localLastAudio) return;

    const parseLastAudio: LastAudioLocalType = JSON.parse(localLastAudio);

    if (!isAudioType(parseLastAudio)) {
      localStorage.removeItem(PLAYERSTORAGE.LAST_AUDIO);
      return;
    }

    setAudioInfo(parseLastAudio);
    audio.current.src = parseLastAudio.url;
    const numerizeLastStopped = Number(parseLastAudio.lastStopped);
    if (!isNaN(numerizeLastStopped)) {
      setCurrentTime(numerizeLastStopped);
      audio.current.currentTime = numerizeLastStopped;
    }
  }, []);

  useEffect(() => {
    audio.current.addEventListener('timeupdate', updateCurrentTime);
    audio.current.addEventListener('loadedmetadata', play);

    return () => {
      audio.current.removeEventListener('timeupdate', updateCurrentTime);
      audio.current.removeEventListener('loadedmetadata', play);
    };
  });

  function volumeChange(volume: `${number}%`) {
    const pureNumber = Number(volume.replace('%', ''));
    volumeValue.current = pureNumber / 100;
    audio.current.volume = pureNumber / 100;
  }

  const seek = (seekTime: number) => {
    audio.current.currentTime = seekTime;
  };

  async function remotelyLoad(
    newTrack: AudioType,
    playlistId?: string,
    userInteracted?: boolean
  ) {
    isInteracted.current = true;
    if (newTrack.url === audioInfo.url) {
      handlePlaying();
      return;
    }

    if (playlistId === playlistRef.current && newTrack.url === audioInfo.url) {
      handlePlaying();
      return;
    }

    if (
      playlistId === playlistRef.current &&
      newTrack.url !== audioInfo.url &&
      !userInteracted
    ) {
      handlePlaying();
      return;
    }

    if (playlistId !== playlistRef.current && newTrack.url === audioInfo.url) {
      handlePlaying();
      return;
    }

    if (playlistId) {
      playlistRef.current = playlistId;
    }

    audio.current.src = newTrack.url as string;
    setAudioInfo(newTrack);
    setCurrentTime(0);
  }

  function play() {
    if (!isInteracted.current) return;

    setPlaying(true);

    const isPlaying =
      audio.current.currentTime > 0 &&
      !audio.current.paused &&
      !audio.current.ended &&
      audio.current.readyState > audio.current.HAVE_CURRENT_DATA;

    if (!isPlaying) {
      audio.current.play();
    }
  }

  function handlePlaying() {
    isInteracted.current = true;
    if (playing) {
      setPlaying(false);
      audio.current.pause();
    } else {
      play();
      setPlaying(true);
    }
  }

  return (
    <AudioContext.Provider
      value={{
        seek,
        setCurrentTime,
        audioNode: audio.current,
        handlePlaying,
        audio: audioInfo,
        currentTime,
        loading,
        playing,
        setAudio: remotelyLoad,
        volumeChange,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
