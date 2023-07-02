import React from 'react';
import { Controller } from '@/core/controller';
import { Image } from './components/audio-info';
import { VolumeControl } from './components/volume-controls';

export const DesktopCanvas = () => (
  <div className="desktop-canvas">
    <Image />
    <Controller />
    <VolumeControl />
  </div>
);
