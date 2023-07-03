import { RefObject } from 'react';

export const trackerWidth = (
  trackerRef: RefObject<HTMLDivElement>,
  mouseX: number
): `${number}%` => {
  const trackerWidth = Number(
    window.getComputedStyle(trackerRef.current!).width.replace('px', '')
  );

  const dragX = Number((mouseX / trackerWidth) * 100);

  if (dragX > 100) {
    return '100%';
  }

  if (dragX < 0) {
    return '0%';
  }

  return `${dragX}%`;
};
