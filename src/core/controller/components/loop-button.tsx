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
    <div className="flex items-center justify-center rounded-full hover:bg-white/20 w-6 h-6" onClick={toggleLoop}>
      {loopStatus === 'single' && (
        <div className="h-1 w-1 bg-blue rounded-full flex-none absolute" />
      )}
      <LoopIcon color={loopIconColor} />
    </div>
  );
};
