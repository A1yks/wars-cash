import { Meta, StoryObj } from '@storybook/react';
import UserList from '.';
import UserListItem from 'components/UserListItem';
import ChatMessage from 'components/ChatMessage';
import { user } from '../../../.storybook/mock';

const meta: Meta<typeof UserList> = {
    title: 'Components/UserList',
    component: UserList,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <UserList style={{ width: 570 }}>
            <UserListItem user={user} variant="default">
                19.22
            </UserListItem>
            <UserListItem user={user} variant="default">
                19.22
            </UserListItem>
            <UserListItem user={user} variant="default">
                19.22
            </UserListItem>
            <UserListItem user={user} variant="default">
                19.22
            </UserListItem>
            <UserListItem user={user} variant="default">
                19.22
            </UserListItem>
        </UserList>
    ),
};

export const Messages: Story = {
    render: () => (
        <UserList style={{ width: 570 }}>
            <UserListItem variant="custom">
                <ChatMessage
                    message={{
                        _id: '1',
                        sender: user,
                        text: 'Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.',
                    }}
                    onRestrictChatAccess={() => {}}
                    onDeleteMessage={() => {}}
                />
            </UserListItem>
            <UserListItem variant="custom">
                <ChatMessage
                    message={{
                        _id: '2',
                        sender: user,
                        text: 'Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.',
                    }}
                    onRestrictChatAccess={() => {}}
                    onDeleteMessage={() => {}}
                />
            </UserListItem>
            <UserListItem variant="custom">
                <ChatMessage
                    message={{
                        _id: '3',
                        sender: user,
                        text: 'Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.',
                    }}
                    onRestrictChatAccess={() => {}}
                    onDeleteMessage={() => {}}
                />
            </UserListItem>
            <UserListItem variant="custom">
                <ChatMessage
                    message={{
                        _id: '4',
                        sender: user,
                        text: 'Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.',
                    }}
                    onRestrictChatAccess={() => {}}
                    onDeleteMessage={() => {}}
                />
            </UserListItem>
        </UserList>
    ),
};
