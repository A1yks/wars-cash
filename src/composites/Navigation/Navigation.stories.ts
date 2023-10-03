import { Meta, StoryObj } from '@storybook/react';
import Navigation from '.';
import { user } from 'stories/mock';

const meta: Meta<typeof Navigation> = {
    title: 'Composites/Navigation',
    component: Navigation,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        user,
    },
};

export const LoggedOut: Story = {
    args: {
        user: null,
    },
};
