import { Meta, StoryObj } from '@storybook/react';
import ChatMessage from '.';
import { Roles } from 'types/global';
import { Types } from 'mongoose';

const meta: Meta<typeof ChatMessage> = {
    title: 'Components/ChatMessage',
    component: ChatMessage,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 370 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        user: {
            id: '1' as unknown as Types.ObjectId,
            avatar: '/images/avatar.jpg',
            name: 'Степан',
            surname: 'Иванов',
            role: Roles.User,
        },
        children: 'Mollit in id consectetur enim do ullamco Lorem culpa reprehenderit aliquip in commodo est sint.',
    },
} satisfies Story;

export const WithRole: Story = {
    args: {
        user: {
            ...Default.args.user,
            role: Roles.Moderator,
        },
        children: 'Mollit in id consectetur enim do ullamco Lorem culpa reprehenderit aliquip in commodo est sint.',
    },
};
