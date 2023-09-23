import React from 'react';
import { useDeviceSize } from './view/hooks/useDeviceSize';
import { MobileCanvas } from './view/mobile';
import { DesktopCanvas } from './view/desktop';

export const Player = () => {
  const { isMobile } = useDeviceSize();

  return isMobile ? <MobileCanvas /> : <DesktopCanvas />;
};
