import React, { useEffect, useRef, useState } from 'react';
import { Indicator } from './components/indicator';
import { trackerGap } from './utils/tracker-gap';
import { trackerWidth } from './utils/tracker-width';
import { useAudio } from '@/provider/hooks/useAudio';
import { useSeek } from './hooks/useSeek';

export const Tracker = () => {
  const trackerRef = useRef<HTMLDivElement>(null);
  const isPressed = useRef<boolean>(false);
  const [tracker, setTracker] = useState<`${number}%`>('0%');
  const { seekHandler, duration } = useAudio();
  const { seek } = useSeek({ duration, tracker });

  const windowMouseDown = (e: MouseEvent) => {
    if (trackerRef.current && trackerRef.current.contains(e.target as Node)) {
      const trackerWidthPx = trackerWidth(
        trackerRef,
        e.clientX - trackerGap(trackerRef)
      );
      setTracker(trackerWidthPx);
      isPressed.current = true;
    }
  };

  const windowMouseUp = () => {
    if (isPressed.current) {
      seekHandler(seek);
      isPressed.current = false;
    }
  };

  const windowMouseDrag = (e: MouseEvent) => {
    if (isPressed.current) {
      const trackerWidthPx = trackerWidth(
        trackerRef,
        e.clientX - trackerGap(trackerRef)
      );

      setTracker(trackerWidthPx);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', windowMouseDown);
    window.addEventListener('mousemove', windowMouseDrag);
    window.addEventListener('mouseup', windowMouseUp);

    return () => {
      window.removeEventListener('mousedown', windowMouseDown);
      window.removeEventListener('mousemove', windowMouseDrag);
      window.removeEventListener('mouseup', windowMouseUp);
    };
  });

  return (
    <>
      <div className="tracker-layer" ref={trackerRef} aria-label={tracker} />
      <div className="tracker-wrapper">
        <Indicator width={tracker} />
      </div>
    </>
  );
};
