import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Player } from '../../player';
import { PlayerProvider, usePlayer } from '../..';
import { AudioType } from '@/context/audio-context';

export default {
  title: 'Player',
  component: Player,
} as Meta<typeof Player>;

const Playlist: StoryFn<typeof Player> = () => {
  const { setPlaylist, playlist, setAudio } = usePlayer();

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
    {
      url: 'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsi1hv0005mc0k0o8tpup6/audio/74c5e43a2b190195.mp3',
      duration: 42,
      title: 'Chromatica II',
      artist: 'Lady Gaga',
      image:
        'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsi1hv0005mc0k0o8tpup6/image/3857bf90-62cd-4db2-8cb5-524c060dbd3b',
      id: 'cllfsi1hv0005mc0k0o8tpup6',
    },
    {
      url: 'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsp1aj000bmc0kzjmoyuja/audio/7ca7ec1c91fbabf6.mp3',
      duration: 158,
      title: 'Sour Candy',
      artist: 'Lady Gaga & BLACKPINK',
      image:
        'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsp1aj000bmc0kzjmoyuja/image/6e832264-da61-4e4d-8703-610933e2f4ea',
      id: 'cllfsp1aj000bmc0kzjmoyuja',
    },
  ];

  const playlists = [
    {
      id: 'playlist #1',
      audios: tracks,
      preAudio: {
        url: 'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsksou0007mc0kyoiz2i2t/audio/4c14c8b03e0abe75.mp3',
        duration: 173,
        title: '911',
        artist: 'Lady Gaga',
        image:
          'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/cllfsksou0007mc0kyoiz2i2t/image/827d888d-c833-4433-b3d2-89cadbdbcb8a',
        id: 'cllfsksou0007mc0kyoiz2i2t',
      },
    },
    {
      id: 'playlist #2',
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
        ...tracks,
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
      {playlists.map((playlist) => (
        <button
          key={playlist.id}
          onClick={() => {
            setPlaylist({ audios: playlist.audios, id: playlist.id });
            setAudio(playlist.preAudio, playlist.id);
          }}
        >
          {playlist.id}
        </button>
      ))}
      {playlist.id && (
        <code style={{ color: 'white' }}>
          playlist id: {playlist.id} <br />
          songs:
          {playlist.audios.map((e) => (
            <div key={e.id}>{e.title},</div>
          ))}
        </code>
      )}
      <br />
      <div style={{ display: 'flex' }}>
        <div style={{ color: '#FFF' }}>
          {playlists[0].id}
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
        </div>
        <div style={{ color: '#FFF' }}>
          {playlists[1].id}
          {playlists[1].audios.map((e) => (
            <div key={e.id}>
              <button
                onClick={() => {
                  setPlaylist({
                    audios: playlists[1].audios,
                    id: playlists[1].id,
                  });
                  setAudio(e, playlists[1].id, true);
                }}
              >
                {e.title}
              </button>
              <br />
            </div>
          ))}
        </div>
      </div>
      <Player />
    </>
  );
};

const Wrapper = () => {
  return (
    <PlayerProvider>
      <Playlist />
    </PlayerProvider>
  );
};

export const PlaylistPlay: StoryFn<typeof Player> = Wrapper.bind({});
