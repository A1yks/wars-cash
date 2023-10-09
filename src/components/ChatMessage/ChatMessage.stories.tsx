import { Meta, StoryObj } from '@storybook/react';
import ChatMessage from '.';

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
    args: {},
} satisfies Story;

export const WithRole: Story = {
    args: {},
};
