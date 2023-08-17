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
      url: 'https://audiostream-testing.s3.eu-north-1.amazonaws.com/y2mate.is+-+LADY+GAGA+BEYONCE%CC%81+G.U.Y.+x+HEATED+MASHUP+-1RIdG-e0-xM-192k-1692219955.mp3',
      id: 'clj9cqopz0001kz088arksp9s',
      artist: 'AdamMusic',
      title: 'LADY GAGA, BEYONCÉ - G.U.Y. x HEATED (MASHUP)',
      duration: 272.856,
      image:
        'https://cdn.discordapp.com/attachments/1072505285580697712/1121805560585654282/image.png',
    },
    {
      id: '1',
      url: 'https://audiostream-testing.s3.eu-north-1.amazonaws.com/Sia+-+Elastic+Heart+(Audio).mp3',
      artist: 'Sia',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Sia_-_Elastic-Heart%2C_2015.png/220px-Sia_-_Elastic-Heart%2C_2015.png',
      title: 'Plastic Heart',
      duration: 250.2,
    },
  ];

  const playlists = [
    {
      id: 'playlist #1',
      audios: tracks,
      preAudio: {
        url: 'https://audiostream-testing.s3.eu-north-1.amazonaws.com/y2mate.is+-+LADY+GAGA+BEYONCE%CC%81+G.U.Y.+x+HEATED+MASHUP+-1RIdG-e0-xM-192k-1692219955.mp3',
        id: 'clj9cqopz0001kz088arksp9s',
        artist: 'AdamMusic',
        duration: 272.856,
        title: 'LADY GAGA, BEYONCÉ - G.U.Y. x HEATED (MASHUP)',
        image:
          'https://cdn.discordapp.com/attachments/1072505285580697712/1121805560585654282/image.png',
      },
    },
    {
      id: 'playlist #2',
      audios: [
        {
          id: 'clk9wgf070007mc0k7rv23xok',
          artist: 'Kesha',
          title: 'Tiktok',
          url: 'https://cdns-preview-5.dzcdn.net/stream/c-53493734be9639a325b9eb8fcea1f81a-7.mp3',
          duration: 30,
          image:
            'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/TiK_ToK_-_Kesha_%28official_single_cover%29.JPG/220px-TiK_ToK_-_Kesha_%28official_single_cover%29.JPG',
        },
        ...tracks,
      ],
      preAudio: {
        url: 'https://cdns-preview-5.dzcdn.net/stream/c-53493734be9639a325b9eb8fcea1f81a-7.mp3',
        id: 'clk9wgf070007mc0k7rv23xok',
        artist: 'Kesha',
        title: 'Tiktok',
        preChunk: '',
        duration: 30,
        image:
          'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/TiK_ToK_-_Kesha_%28official_single_cover%29.JPG/220px-TiK_ToK_-_Kesha_%28official_single_cover%29.JPG',
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
