import { LoopIcon } from '@/icons/loop';
import React, { useMemo } from 'react';
import { loopStatusSwitcher, loopStatusColor } from '../utils/loop-status';

export type LoopStatusType = 'none' | 'single' | 'all';

export const LoopButton = () => {
  const [loopStatus, setLoopStatus] = React.useState<LoopStatusType>('none');

  const loopIconColor: string = useMemo(
    () => loopStatusColor(loopStatus),
    [loopStatus]
  );

  return (
    <button
      className="side-controller-button"
      onClick={() => setLoopStatus(loopStatusSwitcher(loopStatus))}
    >
      {loopStatus === 'single' && <div className="loop-dot" />}
      <LoopIcon color={loopIconColor} />
    </button>
  );
};
