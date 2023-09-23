import React from 'react';
import { Image } from '../desktop/components/audio-info';
import { PlayerButton } from '@/core/controller/components/player-button';
import { Tracker } from '@/core/tracker';
import { useAudio } from '@/provider/audio/hooks/useAudio';

export const MobileCanvas = () => {
  const { audio } = useAudio();

  return (
    <div className="w-full bg-black">
      <Tracker className="relative" />
      <div className="flex pt-3 pl-2 items-center">
        <Image />
        <div className="ml-3 flex flex-col justify-center">
          <div className="text-xs text-white truncate ... max-w-[180px] w-full">
            {audio.title}
          </div>
          <div className="text-xs text-slate truncate ... max-w-[180px] w-full">
            {audio.uploader?.name}
          </div>
        </div>
        <PlayerButton className="absolute right-3 mt-1" />
      </div>
    </div>
  );
};
