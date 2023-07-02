import React from 'react';
import { PlayerButton } from './components/player-button';
import { BackButton } from './components/back-button';
import { ForwardButton } from './components/forward-button';
import { ShuffleButton } from './components/shuffle-button';
import { LoopButton } from './components/loop-button';

export const Controller = () => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className="controller">
      <ShuffleButton />
      <BackButton />
      <PlayerButton playing={playing} setPlaying={setPlaying} />
      <ForwardButton />
      <LoopButton />
    </div>
  );
};
