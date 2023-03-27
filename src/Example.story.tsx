import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example } from './Example';

export default {
  title: 'Example',
  component: Example
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = () => (
  <Example />
);

export const Primary: ComponentStory<typeof Example> = Template.bind({});