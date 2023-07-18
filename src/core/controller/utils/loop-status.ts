import { LoopStatusType } from '../components/loop-button';

export const loopStatusColor = (loopStatus: LoopStatusType) => {
  if (loopStatus === 'single') {
    return '#3b82f6';
  }

  if (loopStatus === 'none') {
    return '#FFF';
  }

  return '#3b82f6';
};
