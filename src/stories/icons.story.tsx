import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../player';
import { PlayIcon } from '@/icons/play';
import { ForwardIcon } from '@/icons/forward';
import { LoopIcon } from '@/icons/loop';
import { PauseIcon } from '@/icons/pause';
import { ShuffleIcon } from '@/icons/shuffle';
import { BackIcon } from '@/icons/back';

export default {
  title: 'Icons',
} as Meta<typeof Player>;

const Template: StoryFn<typeof Player> = () => {
  return (
    <>
      <PlayIcon />
      <ForwardIcon />
      <LoopIcon />
      <PauseIcon />
      <ShuffleIcon />
      <BackIcon />
    </>
  );
};

export const Primary: StoryFn<typeof Player> = Template.bind({});
