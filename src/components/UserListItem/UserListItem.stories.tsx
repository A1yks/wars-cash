import { Meta, StoryObj } from '@storybook/react';
import UserListItem from '.';
import { Roles } from 'types/global';

const meta: Meta<typeof UserListItem> = {
    title: 'Components/UserListItem',
    component: UserListItem,
    tags: ['autodocs'],
    args: {
        avatarRole: Roles.User,
        avatarSize: 50,
        avatarSrc: '/images/avatar.jpg',
        name: 'Степан',
        surname: 'Иванов',
    },
};

export default meta;

type Story = StoryObj<typeof UserListItem>;

export const Default: Story = {
    args: {
        children: <div>19.22</div>,
    },
};
