import { LoopStatusType } from '../components/loop-button';

export const loopStatusSwitcher = (
  currentStatus: LoopStatusType
): LoopStatusType => {
  if (currentStatus === 'none') {
    return 'all';
  }

  if (currentStatus === 'all') {
    return 'single';
  }

  return 'none';
};

export const loopStatusColor = (loopStatus: LoopStatusType) => {
  if (loopStatus === 'single') {
    return '#3b82f6';
  }

  if (loopStatus === 'none') {
    return '#FFF';
  }

  return '#3b82f6';
};
