import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../player';
import { PlayerProvider, usePlayer } from '..';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Template: StoryFn<typeof Player> = () => <Player />;

const Tracks: StoryFn<typeof Player> = () => {
  const { setData } = usePlayer();
  const tracks = [
    {
      audioId: 'clj9cqopz0001kz088arksp9s',
      artist: 'AdamMusic',
      title: 'LADY GAGA, BEYONCÉ - G.U.Y. x HEATED (MASHUP)',
      image:
        'https://cdn.discordapp.com/attachments/1072505285580697712/1121805560585654282/image.png',
      playlistId: null,
    },
    {
      audioId: 'cljacj88u0001l908w524gkqt',
      artist: 'Alexandra Stan',
      image: 'https://avatars.githubusercontent.com/u/65135792?v=4?s=400',
      title: 'Come Into My World',
      playlistId: null,
    },
  ];

  return (
    <>
      {tracks.map((track) => (
        <button onClick={() => setData(track)} key={track.audioId}>
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
export const Primary: StoryFn<typeof Player> = Template.bind({});
export const TrackPlay: StoryFn<typeof Player> = Wrapper.bind({});
