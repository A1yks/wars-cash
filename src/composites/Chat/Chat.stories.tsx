import { Meta, StoryObj } from '@storybook/react';
import Chat from '.';
import { Types } from 'mongoose';
import { user } from 'stories/mock';

const meta = {
    title: 'Composites/Chat',
    component: Chat,
    tags: ['autodocs'],
    args: {
        inChat: 532,
        messages: [
            {
                _id: '1' as unknown as Types.ObjectId,
                sender: user,
                text: 'Есть кто-нибудь в этом чате? Хочу пообщаться.',
            },
            {
                _id: '2' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '3' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '4' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '5' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '6' as unknown as Types.ObjectId,
                sender: user,
                text: 'Есть кто-нибудь в этом чате? Хочу пообщаться.',
            },
            {
                _id: '7' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '8' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '9' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '10' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '11' as unknown as Types.ObjectId,
                sender: user,
                text: 'Есть кто-нибудь в этом чате? Хочу пообщаться.',
            },
            {
                _id: '12' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '13' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '14' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
            {
                _id: '15' as unknown as Types.ObjectId,
                sender: user,
                text: 'Enim ipsum eiusmod est ad incididunt reprehenderit eiusmod eu incididunt.',
            },
        ],
    },
    decorators: [
        (Story) => (
            <div style={{ width: 370 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Chat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        isLoggedIn: true,
    },
};

export const LoggetOut: Story = {
    args: { isLoggedIn: false },
};
