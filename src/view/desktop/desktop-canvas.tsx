import { AudioContext } from '@/context/audio-context';
import { BackButton } from '@/core/controller/components/back-button';
import { LoopButton } from '@/core/controller/components/loop-button';
import { PlayerButton } from '@/core/controller/components/player-button';
import { AudioDetails } from '@/core/controller/view/audio-details';
import { Tracker } from '@/core/tracker';
import { cn } from '@/lib/utils';
import React, { useContext } from 'react';
import { Image } from './components/audio-info';
import { ForwardButton } from '@/core/controller/components/forward-button';
import { VolumeControl } from './components/volume-controls';

export const DesktopCanvas = () => {
  const { audio } = useContext(AudioContext);

  return (
    <div
      className={cn(
        'max-w-[900px] w-full border-dark-slate h-16 justify-between rounded-full flex items-center p-2 z-10 border text-white bg-black/90 backdrop-blur-xl transition-all',
        !audio.id && 'hidden'
      )}
    >
      <div className="flex items-center gap-x-2 ml-2 max-w-max">
        <PlayerButton />
        <LoopButton />
      </div>
      <div className="w-full flex items-center justify-center px-12">
        <div className="flex w-full items-center gap-x-2">
          <BackButton />
          <Image />
          <div className="flex flex-col cursor-default relative w-full">
            <AudioDetails />
            <Tracker />
          </div>
          <ForwardButton />
        </div>
      </div>
      <VolumeControl />
    </div>
  );
};
