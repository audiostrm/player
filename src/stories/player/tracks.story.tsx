import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';
import { PlayerProvider, usePlayer } from '../..';
import React from 'react';
import { AudioType } from '@/context/audio-context';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Tracks = () => {
  const { setAudio } = usePlayer();
  const tracks: AudioType[] = [
    {
      id: 'clmon6yse0003mc0k6bipntd0',
      title: 'Lady gaga - Applause',
      image:
        'https://audiostream-files.s3.eu-central-1.amazonaws.com/clmon6yse0003mc0k6bipntd0/image/4681ffd9-046d-4aa2-b760-7d574f0df917',
      url: 'https://audiostream-files.s3.eu-central-1.amazonaws.com/clmon6yse0003mc0k6bipntd0/audio/af7b27c5a068b164.mp3',
      duration: 189,
      uploader: {
        name: 'yaviskokakola',
      },
    },
  ];

  return (
    <>
      {tracks.map((track) => (
        <button
          onClick={() => setAudio(track)}
          className="text-white"
          key={track.url}
        >
          {track.title}
        </button>
      ))}
      <Player />
    </>
  );
};

const Wrapper = () => {
  return (
    <PlayerProvider onUsernameNavigate={() => {}} onAudioNavigate={() => {}}>
      <div className="fixed bottom-0 md:bottom-3 w-full">
        <Tracks />
      </div>
    </PlayerProvider>
  );
};

export const TrackPlay: StoryFn<typeof Player> = Wrapper.bind({});
