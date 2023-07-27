export const isAudioType = (obj: any) => {
  if (typeof obj === 'object') {
    if (
      typeof obj.id === 'string' &&
      typeof obj.image === 'string' &&
      typeof obj.title === 'string' &&
      typeof obj.artist === 'string'
    ) {
      return true;
    }
  }
  return false;
};
