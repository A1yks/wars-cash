import { Meta, StoryObj } from '@storybook/react';
import Header from '.';
import { LoggedIn as NavLoggedIn } from 'composites/Navigation/Navigation.stories';

const meta: Meta<typeof Header> = {
    title: 'composites/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        user: NavLoggedIn.args?.user,
    },
};

export const LoggedOut: Story = {
    args: {
        user: null,
    },
};
