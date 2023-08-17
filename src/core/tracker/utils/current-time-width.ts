type CurrentTimeWidthType = {
  currentTime: number;
  duration?: number;
};

export const currentTimeWidth = ({
  currentTime,
  duration,
}: CurrentTimeWidthType): `${number}%` => {  
  if (!duration) {
    return '0%';
  }

  const width = (currentTime / duration) * 100;

  return `${width}%`;
};
