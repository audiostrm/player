import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Template: StoryFn<typeof Player> = () => <Player />;

export const Primary: StoryFn<typeof Player> = Template.bind({});
