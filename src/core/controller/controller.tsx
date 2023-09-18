import React from 'react';
import { PlayerButton } from './components/player-button';
import { BackButton } from './components/back-button';
import { ForwardButton } from './components/forward-button';
import { LoopButton } from './components/loop-button';
import { ShuffleButton } from './components/shuffle-button';

export const Controller = () => {
  return (
    <div className="controller">
      <ShuffleButton />
      <BackButton />
      <PlayerButton />
      <ForwardButton />
      <LoopButton />
    </div>
  );
};
