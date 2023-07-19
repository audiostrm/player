import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';
import logo from './images/logo.png'

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'audiostream',
    brandUrl: 'https://audiostream.vercel.app',
    brandImage: logo,
    brandTarget: 'blank',
  }),
});
