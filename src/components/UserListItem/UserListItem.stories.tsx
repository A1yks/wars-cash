import { Meta, StoryObj } from '@storybook/react';
import UserListItem from '.';
import {} from '../UserList/UserList.stories';
import { user } from 'stories/mock';

const meta: Meta<typeof UserListItem> = {
    title: 'Components/UserListItem',
    component: UserListItem,
    tags: ['autodocs'],
    args: {
        user,
    },
    decorators: [
        (Story) => (
            <div style={{ width: 370 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof UserListItem>;

export const Default: Story = {
    args: {
        variant: 'default',
        children: <div>19.22</div>,
    },
};

export const Custom: Story = {
    args: {
        variant: 'custom',
        children: 'Sunt laborum aliqua incididunt eu nulla eiusmod irure magna elit.',
    },
};
