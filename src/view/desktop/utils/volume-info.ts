import { RefObject } from 'react';

export const volumeInfo = (volumeRef: RefObject<HTMLDivElement>) => {
  const volumeCordinateX = volumeRef.current!.getBoundingClientRect().left;

  return { volumeCordinateX };
};
