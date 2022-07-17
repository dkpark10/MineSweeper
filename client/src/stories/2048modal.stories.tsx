import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal2048 from '../components/domain/2048/organisms/modal';
import Provider from './provider';

export default {
  title: '2048 게임 모달',
  decorators: [(story) => Provider(story())],
  component: Modal2048,
} as ComponentMeta<typeof Modal2048>;

// eslint-disable-next-line
const Template: ComponentStory<typeof Modal2048> = (args) => (<Modal2048 {...args} />);

export const Default = Template.bind({});
Default.args = {
  score: 25536,
};
