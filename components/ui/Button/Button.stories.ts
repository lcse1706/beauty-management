import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  // decorators: [
  //   (Story) => (
  //     <div>
  //       <Story />
  //     </div>
  //   ),
  // ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
  },
};

export const Edit: Story = {
  args: {
    label: 'Edit',
  },
};

export const Save: Story = {
  args: {
    label: 'Save',
    className: 'bg-green-500 hover:bg-green-700',
  },
};

export const Delete: Story = {
  args: {
    label: 'Delete',
    className: 'bg-red-500 hover:bg-red-700',
  },
};
