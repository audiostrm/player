import React, { useContext } from 'react';
import './styles/index.css';
import { Tracker } from './core/tracker';
import { View } from './view';
import { usePlayer } from 'dist';
import { AudioContext } from './context/audio-context';

export const Player = () => {
  const { track } = useContext(AudioContext);

  return (
    <div
      className={
        track.audioId ? 'audiostream-player' : 'audiostream-player hidden'
      }
    >
      <Tracker />
      <View />
    </div>
  );
};
