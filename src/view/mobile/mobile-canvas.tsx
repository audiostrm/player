import React from 'react';
import { Image } from '../desktop/components/audio-info';
import { PlayerButton } from '@/core/controller/components/player-button';
import { Tracker } from '@/core/tracker';
import { useAudio } from '@/provider/audio/hooks/useAudio';

export const MobileCanvas = () => {
  const { audio, onUsernameNavigate } = useAudio();

  return (
    <div className="w-full bg-white dark:bg-black">
      <Tracker className="relative" />
      <div className="flex py-3 pl-2 items-center">
        <Image />
        <div className="ml-3 flex flex-col justify-center">
          <div className="text-xs text-black dark:text-white truncate ... max-w-[180px] w-full">
            {audio.title}
          </div>
          <div
            className="text-xs text-slate hover:underline cursor-pointer text-slate-500 truncate ... max-w-[180px] w-full"
            onClick={() => onUsernameNavigate(audio.uploader?.name as string)}
          >
            {audio.uploader?.name}
          </div>
        </div>
        <PlayerButton className="absolute right-3 mt-1 w-8 h-8" />
      </div>
    </div>
  );
};
