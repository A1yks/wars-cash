import { Meta, StoryObj } from '@storybook/react';
import UserInfoCard from './UserInfoCard';
import { user } from '../../../.storybook/mock';

const meta = {
    title: 'Components/UserInfoCard',
    component: UserInfoCard,
    tags: ['autodocs'],
} satisfies Meta<typeof UserInfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        userId: user._id,
        name: user.name,
        avatarSrc: user.avatar,
        balance: 1203.32,
        deposited: 500,
        withdrawn: 100,
        isBanned: false,
    },
} satisfies Story;
