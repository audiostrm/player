module.exports = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  docs: {
    autodocs: true,
  },
};
