import React from 'react';
import { AudioProvider } from './audio';
import { PlaylistProvider } from './playlist';

type PlayerProviderProps = {
  onUsernameNavigate: (username: string) => void;
  onAudioNavigate: (id: string) => void;
};

export const PlayerProvider = ({
  children,
  onUsernameNavigate,
  onAudioNavigate,
}: React.PropsWithChildren<PlayerProviderProps>) => {
  return (
    <AudioProvider
      onUsernameNavigate={onUsernameNavigate}
      onAudioNavigate={onAudioNavigate}
    >
      <PlaylistProvider>{children}</PlaylistProvider>
    </AudioProvider>
  );
};
