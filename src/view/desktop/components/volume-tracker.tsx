import React, { useEffect, useRef, useState } from 'react';
import { volumeWidth } from '../utils/volume-width';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import { PLAYERSTORAGE } from '@/constant/keys';

export const VolumeTracker = () => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const isPressed = useRef<boolean>(false);
  const { volumeChange } = useAudio();
  const [volume, setVolume] = useState<`${number}%`>('100%');

  useEffect(() => {
    const volumeLocal = localStorage.getItem(PLAYERSTORAGE.VOLUME);

    if (volumeLocal) {
      const parseVolume = parseFloat(JSON.parse(volumeLocal));

      if (isNaN(parseVolume)) return;

      if (parseVolume >= 0 && parseVolume <= 100) {
        setVolume(`${parseVolume}%`);
        volumeChange(`${parseVolume}%`);
      }
    }
  }, []);

  const mouseDown = (e: MouseEvent) => {
    if (volumeRef.current && volumeRef.current.contains(e.target as Node)) {
      const volume = volumeWidth(volumeRef, e.clientX);
      setVolume(volume);
      volumeChange(volume);
      isPressed.current = true;
    }
  };

  const mouseMove = (e: MouseEvent) => {
    if (isPressed.current) {
      const volume = volumeWidth(volumeRef, e.clientX);
      volumeChange(volume);
      setVolume(volume);
    }
  };

  const mouseUp = (e: MouseEvent) => {
    if (isPressed.current) {
      const volume = volumeWidth(volumeRef, e.clientX);
      localStorage.setItem(PLAYERSTORAGE.VOLUME, JSON.stringify(volume));
      isPressed.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mousemove', mouseMove);
    };
  });

  return (
    <div
      className="bg-slate-200 dark:bg-slate-800 h-1 w-full rounded-full relative group"
      ref={volumeRef}
      aria-label={volume}
    >
      <div
        className="group-hover:bg-blue-500 group-hover:before:shadow-sm group-hover:before:shadow-slate-500 group-hover:block z-10 before:-translate-y-1/2 group-hover:before:block h-full rounded-full bg-blue-500 dark:bg-white group-hover:before:bg-white before:content-[''] before:absolute before:w-2 before:h-2 relative before:rounded-full before:right-0 before:top-1/2 before:translate-x-1"
        style={{ width: volume }}
      />
    </div>
  );
};
