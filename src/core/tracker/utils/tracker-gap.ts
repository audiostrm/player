import { RefObject } from 'react';

export const trackerGap = (trackerRef: RefObject<HTMLDivElement>) => {
  const trackerWidth = Number(
    window.getComputedStyle(trackerRef.current!).width.replace('px', '')
  );

  const gap = window.innerWidth - trackerWidth;

  return gap;
};
