export const calculateStream = (audioDuration: number, playbacks: number[]) => {
  const mergePlaybacks = playbacks.reduce((total, curr) => total + curr, 0);

  return {
    streamedSeconds: mergePlaybacks,
  };
};
