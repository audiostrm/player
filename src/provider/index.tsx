import React from 'react';
import { AudioProvider } from './audio';
import { PlaylistProvider } from './playlist';

export const PlayerProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <AudioProvider>
      <PlaylistProvider>{children}</PlaylistProvider>
    </AudioProvider>
  );
};
