import { PlayerProvider } from '../src/provider';
import 'tailwindcss/tailwind.css';

/** @type {import('@storybook/react').Preview} */
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  globalTypes: {
    darkMode: {
      defaultValue: true, // Enable dark mode by default on all stories
    },
    className: {
      defaultValue: 'dark',
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'light',
        value: '#FFFFFF',
      },
      {
        name: 'dark',
        value: '#000000',
      },
    ],
  },
};

export const decorators = [
  (Story, options) => <PlayerProvider>{Story(options)}</PlayerProvider>,
];
