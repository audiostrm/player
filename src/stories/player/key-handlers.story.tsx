import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';
import { PlayerProvider } from '@/provider';
import { usePlayer } from '@/hooks/usePlayer';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Template: StoryFn<typeof Player> = () => {
  const { setAudio } = usePlayer();

  React.useEffect(() => {
    setAudio({
      image: 'https://media.pitchfork.com/photos/6447ec0b3749aeb5b27f047c/1:1/w_600/Kesha-Gag-Order.jpg',
      artist: 'Kesha',
      title: "Only Love Can Save Us Now",
      id: "clk9wgf070007mc0k7rv23xok"
    });
  }, []);

  return (
    <>
      <input />
      <Player />
    </>
  );
};

const Wrapper = () => {
  return (
    <PlayerProvider>
      <Template />
    </PlayerProvider>
  );
};
export const KeyHandler: StoryFn<typeof Player> = Wrapper.bind({});
