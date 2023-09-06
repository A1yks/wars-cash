import { Meta, StoryObj } from '@storybook/react';
import UserCard from '.';

const meta: Meta<typeof UserCard> = {
    title: 'Components/UserCard',
    component: UserCard,
    tags: ['autodocs'],
    args: {
        avatarSize: 50,
        avatarSrc: '/images/avatar.jpg',
        name: 'Степан Иванов',
    },
};

export default meta;

type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
    args: {},
};

export const WithLink: Story = {
    args: {
        profileUrl: '/profiles/1',
    },
};
