import { Meta, StoryObj } from '@storybook/react';
import Burger from '.';

const meta: Meta<typeof Burger> = {
    title: 'Components/Burger',
    component: Burger,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
