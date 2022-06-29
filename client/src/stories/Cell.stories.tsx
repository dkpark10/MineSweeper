import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Cell from '../components/domain/mine_sweeper/atoms/cell';

export default {
  title: '지뢰찾기 타일',
  component: Cell,
} as ComponentMeta<typeof Cell>;

// eslint-disable-next-line
const Template: ComponentStory<typeof Cell> = (args) => (<Cell {...args} />);

export const Lock = Template.bind({});
Lock.args = {
  isLock: true,
};

export const Value = Template.bind({});
Value.args = {
  value: 'flag',
};

export const Hover = Template.bind({});
Hover.args = {
  isPointerHover: true,
};
