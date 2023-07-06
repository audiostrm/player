interface UseSeekProps {
  tracker: string;
  duration?: number;
}

export const useSeek = ({ tracker, duration }: UseSeekProps) => {
  if (duration) {
    const removePercent = Number(tracker.replace('%', ''));
    const seek = (removePercent / 100) * duration;

    return { seek };
  }

  return { seek: 0 };
};
