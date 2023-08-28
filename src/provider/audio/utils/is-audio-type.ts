export const isAudioType = (obj: any) => {
  if (typeof obj === 'object') {
    if (
      typeof obj.id === 'string' &&
      typeof obj.image === 'string' &&
      typeof obj.title === 'string' &&
      typeof obj.uploader.name === 'string' &&
      typeof obj.url === 'string' &&
      typeof obj.lastStopped === 'number' &&
      typeof obj.duration === 'number'
    ) {
      return true;
    }
  }
  return false;
};
