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
  const { seek: seeker, duration, currentTime } = useAudio();
  const { seek } = useSeek({ duration, tracker });

  const trackerTime = useMemo(() => {
    if (pressed) {
      return tracker;
    }

    return currentTimeWidth({ currentTime, duration });
  }, [currentTime, duration, pressed, tracker]);

  const windowMouseDown = (e: MouseEvent) => {
    if (trackerRef.current && trackerRef.current.contains(e.target as Node)) {
      const trackerWidthPx = trackerWidth(
        trackerRef,
        e.clientX - trackerGap(trackerRef)
      );
      setTracker(trackerWidthPx);
      setPressed(true);
    }
  };

  const windowMouseUp = () => {
    if (pressed) {
      seeker(seek);
      setPressed(false);
    }
  };

  const windowMouseDrag = (e: MouseEvent) => {
    if (pressed) {
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
        <Indicator width={trackerTime} />
      </div>
    </>
  );
};
