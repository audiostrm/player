import { RefObject } from 'react';
import { volumeInfo } from './volume-info';

export const volumeWidth = (
  volumeRef: RefObject<HTMLDivElement>,
  mouseX: number
): `${number}%` => {
  const { volumeCordinateX } = volumeInfo(volumeRef);

  const volumeWidth = Number(
    window.getComputedStyle(volumeRef.current!).width.replace('px', '')
  );

  const gap = window.innerWidth - volumeCordinateX;

  const startPoint = mouseX - (window.innerWidth - gap);

  const dragX = Number((startPoint / volumeWidth) * 100);

  if (dragX > 100) {
    return '100%';
  }

  if (dragX < 0) {
    return '0%';
  }

  return `${dragX}%`;
};
