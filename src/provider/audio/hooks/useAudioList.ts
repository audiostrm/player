import { DataType } from '@/context/audio-context';
import { useState } from 'react';

export const useAudioList = () => {
  const [audioList, setAudioList] = useState<DataType[]>([]);

  const setAudiosList = (audios: DataType[]) => {
    setAudioList(audios);
  };

  return { setAudiosList, audioList };
};
