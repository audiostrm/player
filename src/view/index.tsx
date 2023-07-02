import React from 'react';
import { useDeviceSize } from './hooks/useDeviceSize';
import { MobileCanvas } from './mobile';
import { DesktopCanvas } from './desktop';

export const View = () => {
  const { isMobile } = useDeviceSize();

  return isMobile ? <MobileCanvas /> : <DesktopCanvas />;
};
