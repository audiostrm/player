import React, { useEffect, useRef, useState } from 'react';
import { volumeWidth } from '../utils/volume-width';

export const VolumeTracker = () => {
  const volumeRef = useRef<HTMLDivElement>(null);
  const isPressed = useRef<boolean>(false);
  const [volume, setVolume] = useState<`${number}%`>('0%');

  const mouseDown = (e: MouseEvent) => {
    if (volumeRef.current && volumeRef.current.contains(e.target as Node)) {
      const volume = volumeWidth(volumeRef, e.clientX);
      setVolume(volume);
      isPressed.current = true;
    }
  };

  const mouseMove = (e: MouseEvent) => {
    if (isPressed.current) {
      const volume = volumeWidth(volumeRef, e.clientX);
      setVolume(volume);
    }
  };

  const mouseUp = () => {
    isPressed.current = false;
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
