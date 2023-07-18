import { LoopStatusType } from '../playlist-provider';

export const toggleLoopStatus = (currentStatus: LoopStatusType): LoopStatusType => {
  if (currentStatus === 'none') {
    return 'all';
  }

  if (currentStatus === 'all') {
    return 'single';
  }

  return 'none';
};
