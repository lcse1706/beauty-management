import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { PopupProvider, usePopupContext } from '../../../context';
import { Popup } from './Popup';

const meta = {
    title: 'UI/Popup',
    component: Popup,

    // decorators: [
    //   (Story: any) => (
    //     <MockPopupProvider>
    //       <Story />
    //     </MockPopupProvider>
    //   ),
    // ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: '',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {},
// };

const storybookValues: any = {
    popup: true,
    showPopup: () => {}, // You can provide a function or leave it empty
    hidePopup: () => {}, // You can provide a function or leave it empty
    message: 'Hello From StoryBook ! ',
    setMessage: () => {}, // You can provide a function or leave it empty
};

export const Default: Story = (args: any) => (
    <PopupProvider storybookValues={storybookValues}>
        <Popup {...args} />
    </PopupProvider>
);
Default.args = {
    useContext: usePopupContext,
};
