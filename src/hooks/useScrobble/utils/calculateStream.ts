export const calculateStream = (audioDuration: number, playbacks: number[]) => {
  const mergePlaybacks = playbacks.reduce((total, curr) => total + curr, 0);
  const percent = (mergePlaybacks / audioDuration) * 100;

  return { percent: Number(percent.toFixed(2)), streamedSeconds: mergePlaybacks };
};
