import { Meta, StoryObj } from '@storybook/react';
import Avatar from '.';
import { Roles } from 'types/global';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    args: {
        src: '/images/avatar.jpg',
        size: 50,
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const User: Story = {
    args: {
        role: Roles.User,
    },
};

export const Admin: Story = {
    args: {
        role: Roles.Admin,
    },
};

export const Moderator: Story = {
    args: {
        role: Roles.Moderator,
    },
};

export const Premium: Story = {
    args: {
        role: Roles.Premium,
    },
};

export const Vip: Story = {
    args: {
        role: Roles.Vip,
    },
};
