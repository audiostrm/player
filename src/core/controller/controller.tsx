import React from 'react';
import { PlayerButton } from './components/player-button';
import { BackButton } from './components/back-button';
import { ForwardButton } from './components/forward-button';
import { LoopButton } from './components/loop-button';

export const Controller = () => {
  return (
    <div className="controller">
      <BackButton />
      <PlayerButton />
      <ForwardButton />
      <LoopButton />
    </div>
  );
};
