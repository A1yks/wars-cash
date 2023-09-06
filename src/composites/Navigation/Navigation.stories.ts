import { Meta, StoryObj } from '@storybook/react';
import Navigation from '.';
import { Roles } from 'types/global';
import { Types } from 'mongoose';

const meta: Meta<typeof Navigation> = {
    title: 'Composites/Navigation',
    component: Navigation,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        user: {
            id: '1' as unknown as Types.ObjectId,
            avatar: '/images/avatar.jpg',
            name: 'Степан Иванов',
            role: Roles.User,
        },
    },
};

export const LoggedOut: Story = {
    args: {
        user: null,
    },
};
