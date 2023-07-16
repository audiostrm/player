import React from 'react';
import './styles/index.css';
import { Tracker } from './core/tracker';
import { View } from './view';

export const Player = () => {
  return (
    <div className="audiostream-player">
      <Tracker />
      <View />
    </div>
  );
};
