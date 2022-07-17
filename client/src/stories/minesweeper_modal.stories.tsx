import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal, { Props } from '../components/domain/mine_sweeper/organisms/modal';
import Provider from './provider';

export default {
  title: '지뢰찾기 게임 모달',
  decorators: [(story) => Provider(story())],
  component: Modal,
} as ComponentMeta<typeof Modal>;

// eslint-disable-next-line
const Template: ComponentStory<typeof Modal> = (args) => (<Modal {...args} />);

export const Default = Template.bind({});
Default.args = {
  takenTime: 123,
  level: 'easy',
  isGameSuccess: true,
};
