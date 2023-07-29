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
      id: 'clj9cqopz0001kz088arksp9s',
      artist: 'AdamMusic',
      title: 'LADY GAGA, BEYONCÉ - G.U.Y. x HEATED (MASHUP)',
      image:
        'https://cdn.discordapp.com/attachments/1072505285580697712/1121805560585654282/image.png',
    },
    {
      id: 'cljacj88u0001l908w524gkqt',
      artist: 'Alexandra Stan',
      image: 'https://avatars.githubusercontent.com/u/65135792?v=4?s=400',
      title: 'Come Into My World',
    },
  ];

  const playlists = [
    {
      id: 'playlist #1',
      audios: tracks,
      preAudio: {
        id: 'clj9cqopz0001kz088arksp9s',
        artist: 'AdamMusic',
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
          image:
            'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/d6c68199-4c94-45a4-95b2-a33e9118797e',
        },
        ...tracks,
      ],
      preAudio: {
        id: 'clk9wgf070007mc0k7rv23xok',
        artist: 'Kesha',
        title: 'Tiktok',
        image:
          'https://audiostreamfiles.s3.eu-central-1.amazonaws.com/d6c68199-4c94-45a4-95b2-a33e9118797e',
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
