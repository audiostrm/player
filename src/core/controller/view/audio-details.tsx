import { AudioContext } from '@/context/audio-context';
import React, { useContext } from 'react';
import { formatSeconds } from '../utils/format-seconds';

export const AudioDetails = () => {
  const {
    audio,
    currentTime,
    isPressed,
    beforeReleaseTime,
    onUsernameNavigate,
  } = useContext(AudioContext);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <span className="text-xs flex-shrink-0 max-w-[180px] truncate ... w-full">
          {audio.title}
        </span>
        <span
          className="text-xs text-slate hover:underline max-w-[180px] truncate ... cursor-pointer mb-3"
          onClick={() => onUsernameNavigate(audio.uploader?.name as string)}
        >
          {audio.uploader?.name}
        </span>
      </div>
      <div className="text-xs text-white/75 place-items-end mb-3 flex flex-none">
        {isPressed
          ? formatSeconds(beforeReleaseTime)
          : formatSeconds(currentTime)}{' '}
        / {formatSeconds(audio.duration)}
      </div>
    </div>
  );
};
