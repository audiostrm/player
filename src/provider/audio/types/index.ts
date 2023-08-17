import { AudioType } from '@/context/audio-context';

export type LastAudioLocalType = AudioType & {
  lastStopped?: string | null;
};
