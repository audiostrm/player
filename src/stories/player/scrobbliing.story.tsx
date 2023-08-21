import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';
import { PlayerProvider, usePlayer } from '../..';
import React from 'react';
import { AudioType } from '@/context/audio-context';
import { useScrobble } from '@/hooks/useScrobble/useScrobble';

export default {
  title: 'Scrobbling',
  component: Player,
} as Meta<typeof Player>;

const Scrobbling = () => {
  const { setAudio, setPlaylist } = usePlayer();
  // useScrobble({
  //   onAudioScrobble: ({ id, streamedSeconds }) =>
  //     console.log('STREAMED AUDIO!!!', { id, streamedSeconds }),
  //   onPlaylistScrobble: ({ id, streamedSeconds }) =>
  //     console.log('STREAMED PLAYLIST!!!', { id, streamedSeconds }),
  // });

  const tracks: AudioType[] = [
    {
      url: 'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsksou0007mc0kyoiz2i2t/audio/4c14c8b03e0abe75.mp3',
      duration: 173,
      title: '911',
      artist: 'Lady Gaga',
      image:
        'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsksou0007mc0kyoiz2i2t/image/827d888d-c833-4433-b3d2-89cadbdbcb8a',
      id: 'cllfsksou0007mc0kyoiz2i2t',
    },
  ];

  const playlists = [
    {
      id: 'playlist #1',
      audios: [
        {
          url: 'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfz63o4000hmc0kenl7anmf/audio/f8df19578c90921d.mp3',
          duration: 189,
          title: 'Applause (speed up)',
          artist: 'Lady Gaga',
          image:
            'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfz63o4000hmc0kenl7anmf/image/0c83ef57-9d4f-4762-805c-c985f1deeea4',
          id: 'cllfz63o4000hmc0kenl7anmf',
        },
      ],
      preAudio: {
        url: 'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfz63o4000hmc0kenl7anmf/audio/f8df19578c90921d.mp3',
        duration: 189,
        title: 'Applause (speed up)',
        artist: 'Lady Gaga',
        image:
          'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfz63o4000hmc0kenl7anmf/image/0c83ef57-9d4f-4762-805c-c985f1deeea4',
        id: 'cllfz63o4000hmc0kenl7anmf',
      },
    },
  ];

  return (
    <>
      {tracks.map((track) => (
        <button onClick={() => setAudio(track)} key={track.url}>
          {track.title}
        </button>
      ))}
      <div style={{ color: 'white' }}>=========</div>
      <div style={{ color: 'white' }}>{playlists[0].id}</div>
      {playlists[0].audios.map((e) => (
        <div key={e.id}>
          <button
            onClick={() => {              
              setPlaylist({
                audios: playlists[0].audios,
                id: playlists[0].id,
              });
              setAudio(e, playlists[0].id, true);
            }}
          >
            {e.title}
          </button>
          <br />
        </div>
      ))}
      <Player />
    </>
  );
};

const Wrapper = () => {
  return (
    <PlayerProvider>
      <Scrobbling />
    </PlayerProvider>
  );
};

export const Primary: StoryFn<typeof Player> = Wrapper.bind({});
