import { LoopIcon } from '@/icons/loop';
import React, { useContext, useMemo } from 'react';
import { loopStatusColor } from '../utils/loop-status';
import { PlaylistContext } from '@/context/playlist-context';

export type LoopStatusType = 'none' | 'single' | 'all';

export const LoopButton = () => {
  const { loopStatus, toggleLoop } = useContext(PlaylistContext);

  const loopIconColor: string = useMemo(
    () => loopStatusColor(loopStatus),
    [loopStatus]
  );

  return (
    <button className="side-controller-button" onClick={toggleLoop}>
      {loopStatus === 'single' && <div className="loop-dot" />}
      <LoopIcon color={loopIconColor} />
    </button>
  );
};
