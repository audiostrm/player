import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Indicator } from './components/indicator';
import { trackerGap } from './utils/tracker-gap';
import { trackerWidth } from './utils/tracker-width';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import { useSeek } from './hooks/useSeek';
import { currentTimeWidth } from './utils/current-time-width';

export const Tracker = () => {
  const trackerRef = useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = useState(false);
  const [tracker, setTracker] = useState<`${number}%`>('0%');
  const { seek: seeker, duration, currentTime, setCurrentTime } = useAudio();
  const { seek } = useSeek({ duration, tracker });

  const trackerTime = useMemo(() => {
    if (pressed) {
      return tracker;
    }

    return currentTimeWidth({ currentTime, duration });
  }, [currentTime, duration, pressed, tracker]);

  const windowMouseDown = (e: MouseEvent | TouchEvent) => {
    if (trackerRef.current && trackerRef.current.contains(e.target as Node)) {
      const trackerWidthPx = trackerWidth(
        trackerRef,
        ((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX) -
          trackerGap(trackerRef)
      );
      setTracker(trackerWidthPx);
      setPressed(true);
    }
  };

  const windowMouseUp = () => {
    if (pressed) {
      setCurrentTime(seek);
      seeker(seek);
      setPressed(false);
    }
  };

  const windowMouseDrag = (e: MouseEvent | TouchEvent) => {
    if (pressed) {
      const trackerWidthPx = trackerWidth(
        trackerRef,
        ((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX) -
          trackerGap(trackerRef)
      );

      setTracker(trackerWidthPx);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', windowMouseDown);
    window.addEventListener('mousemove', windowMouseDrag);
    window.addEventListener('mouseup', windowMouseUp);
    window.addEventListener('touchstart', windowMouseDown);
    window.addEventListener('touchmove', windowMouseDrag);
    window.addEventListener('touchend', windowMouseUp);

    return () => {
      window.removeEventListener('mousedown', windowMouseDown);
      window.removeEventListener('mousemove', windowMouseDrag);
      window.removeEventListener('mouseup', windowMouseUp);
      window.removeEventListener('touchstart', windowMouseDown);
      window.removeEventListener('touchmove', windowMouseDrag);
      window.removeEventListener('touchend', windowMouseUp);
    };
  });

  return (
    <>
      <div className="tracker-layer" ref={trackerRef} aria-label={tracker} />
      <div className="tracker-wrapper">
        <Indicator width={trackerTime} />
      </div>
    </>
  );
};
