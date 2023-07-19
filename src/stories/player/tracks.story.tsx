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
      id: 'clj9cqopz0001kz088arksp9s',
      artist: 'AdamMusic',
      title: 'LADY GAGA, BEYONCÉ - G.U.Y. x HEATED (MASHUP)',
      image:
        'https://cdn.discordapp.com/attachments/1072505285580697712/1121805560585654282/image.png',
    },
    {
      id: 'cljacj88u0001l908w524gkqt',
      artist: 'Alexandra Stan',
      image: 'https://avatars.githubusercontent.com/u/65135792?v=4?s=400',
      title: 'Come Into My World',
    },
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
