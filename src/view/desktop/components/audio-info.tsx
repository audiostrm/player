import { AudioContext } from '@/context/audio-context';
import { usePlayer } from '@/hooks/usePlayer/usePlayer';
import React, { useContext, useMemo } from 'react';

export const Image = () => {
  const { audio } = usePlayer();
  const { onAudioNavigate } = useContext(AudioContext);

  const RenderImage = useMemo(() => {
    if (!audio.id) return <></>;

    if (audio.nextImage !== undefined) {
      return audio.nextImage;
    }

    if (audio.image) {
      return (
        <div className="relative w-12 overflow-hidden h-12 rounded-md">
          <img
            src={audio.image as string}
            draggable={false}
            className="w-full h-full absolute object-cover"
          />
        </div>
      );
    }
  }, [audio]);

  return (
    <div
      className="cursor-pointer"
      onClick={() => onAudioNavigate(audio.id as string)}
    >
      {RenderImage}
    </div>
  );
};
