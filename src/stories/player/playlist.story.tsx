import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';
import { PlayerProvider } from '../..';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Tracks: StoryFn<typeof Player> = () => {
  return (
    <>
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

export const PlaylistPlay: StoryFn<typeof Player> = Wrapper.bind({});
