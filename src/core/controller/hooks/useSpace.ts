import { useAudio } from '@/provider/audio/hooks/useAudio';
import React from 'react';

export const useSpace = () => {
  const [isFocused, setIsFocused] = React.useState(false);
  const { togglePlay, audio } = useAudio();

  const spaceClick = (e: KeyboardEvent) => {
    if (!isFocused && e.code === 'Space') {
      if (audio?.id) {
        togglePlay();
      }
    }
  };

  const handleFocusChange = () => {
    setIsFocused(document.activeElement!.tagName === 'INPUT');
  };

  React.useEffect(() => {
    document.addEventListener('keyup', spaceClick);
    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusChange);
    return () => {
      document.removeEventListener('keyup', spaceClick);
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusChange);
    };
  });
};
