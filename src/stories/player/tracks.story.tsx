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
      url: 'https://audiostream-files.s3.eu-central-1.amazonaws.com/clmo74wdv0001mc0k5ktfco36/image/b061ac28-b270-4a2c-a81b-f59ef76075fc',
      uploader: {
        name: 'Lady Gaga & BLACKPINK',
      },
      title: 'Bloody mary',
      duration: 244,
      id: 'asdasd',
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
        <button onClick={() => setAudio(track)} key={track.url}>
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
