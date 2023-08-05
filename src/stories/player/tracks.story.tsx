import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';
import { PlayerProvider, usePlayer } from '../..';
import React from 'react';
import chunks from './data';
import { AudioType } from '@/context/audio-context';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Tracks = () => {
  const { setAudio } = usePlayer();
  const tracks: AudioType[] = [
    {
      id: 'clku8zvb30001mc0kr4x3phnw',
      artist: 'Lady gaga',
      title: 'Bloody mary',
      preChunk: chunks.preChunk,
      duration: 244,
      image: 'https://i.scdn.co/image/ab67616d0000b273a47c0e156ea3cebe37fdcab8',
    },
    // {
    //   id: 'cljacj88u0001l908w524gkqt',
    //   artist: 'Alexandra Stan',
    //   preChunk: chunks.preChunk,
    //   image: 'https://avatars.githubusercontent.com/u/65135792?v=4?s=400',
    //   title: 'Come Into My World',
    // },
  ];

  return (
    <>
      {tracks.map((track) => (
        <button onClick={() => setAudio(track)} key={track.id}>
          {track.title}
        </button>
      ))}
      <Player />
    </>
  );
};

const Wrapper = () => {
  return (
    <PlayerProvider>
      <Tracks />
    </PlayerProvider>
  );
};

export const TrackPlay: StoryFn<typeof Player> = Wrapper.bind({});
