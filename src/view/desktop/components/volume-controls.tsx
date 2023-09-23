import React from 'react';
import { VolumeHighIcon } from '@/icons/volume-high';
import { VolumeTracker } from './volume-tracker';

export const VolumeControl = () => {
  return (
    <div className="flex items-center gap-2 mr-2 ml-2 w-36">
      <VolumeHighIcon />
      <VolumeTracker />
    </div>
  );
};
