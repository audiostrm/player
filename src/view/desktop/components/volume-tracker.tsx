import React, { useEffect, useRef, useState } from 'react';
import { volumeWidth } from '../utils/volume-width';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import { PLAYERSTORAGE } from '@/constant/keys';

export const VolumeTracker = () => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const isPressed = useRef<boolean>(false);
  const { volumeChange } = useAudio();
  const [volume, setVolume] = useState<`${number}%`>('80%');

  useEffect(() => {
    const volumeLocal = localStorage.getItem(PLAYERSTORAGE.VOLUME);

    if (volumeLocal) {
      const parseVolume = parseFloat(JSON.parse(volumeLocal));

      if (isNaN(parseVolume)) return;

      if (parseVolume > 0 && parseVolume < 100) {
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
    isPressed.current = false;
    const volume = volumeWidth(volumeRef, e.clientX);
    localStorage.setItem(PLAYERSTORAGE.VOLUME, JSON.stringify(volume));
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
    <div className="volume-tracker" ref={volumeRef} aria-label={volume}>
      <div className="volume-indicator" style={{ width: volume }} />
    </div>
  );
};
