import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Indicator } from './components/indicator';
import { trackerWidth } from './utils/tracker-width';
import { useAudio } from '@/provider/audio/hooks/useAudio';
import { useSeek } from './hooks/useSeek';
import { currentTimeWidth } from './utils/current-time-width';
import { cn } from '@/lib/utils';

type TrackerProps = {
  className?: string;
};

export const Tracker = ({ className }: TrackerProps) => {
  const trackerRef = useRef<HTMLDivElement>(null);
  const trackerX = useRef<number>(0);
  const [tracker, setTracker] = useState<`${number}%`>('0%');
  const {
    seek: seeker,
    duration,
    currentTime,
    setCurrentTime,
    setBeforeReleaseTime,
    isPressed,
    setIsPressed,
  } = useAudio();
  const { seek } = useSeek({ duration, tracker });

  const trackerTime = useMemo(() => {
    if (isPressed) {
      return tracker;
    }

    return currentTimeWidth({ currentTime, duration });
  }, [currentTime, duration, isPressed, tracker]);

  const windowMouseDown = (e: MouseEvent | TouchEvent) => {
    if (trackerRef.current && trackerRef.current.contains(e.target as Node)) {
      trackerX.current = trackerRef.current?.getBoundingClientRect()
        .left as number;

      const trackerWidthPx = trackerWidth(
        trackerRef,
        ((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX) -
          trackerX.current
      );

      const removePercent = Number(trackerWidthPx.replace('%', ''));
      const beforeReleaseSeconds = (removePercent / 100) * duration;

      setBeforeReleaseTime(beforeReleaseSeconds);

      setTracker(trackerWidthPx);
      setIsPressed(true);
    }
  };

  const windowMouseUp = () => {
    if (isPressed) {
      setCurrentTime(seek);
      seeker(seek);
      setIsPressed(false);
    }
  };

  const windowMouseDrag = (e: MouseEvent | TouchEvent) => {
    if (isPressed) {
      const trackerWidthPx = trackerWidth(
        trackerRef,
        ((e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX) -
          trackerX.current
      );

      const removePercent = Number(trackerWidthPx.replace('%', ''));
      const beforeReleaseSeconds = (removePercent / 100) * duration;

      setBeforeReleaseTime(beforeReleaseSeconds);

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
      <div
        className={cn(
          'absolute group z-10 w-full h-2 translate-y-3 bottom-2',
          className
        )}
        ref={trackerRef}
        aria-label={tracker}
      >
        <div className="h-1 rounded-md w-full bg-slate-800 relative">
          <Indicator width={trackerTime} />
        </div>
      </div>
    </>
  );
};
