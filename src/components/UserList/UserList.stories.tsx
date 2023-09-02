import { Meta, StoryObj } from '@storybook/react';
import UserList from '.';
import UserListItem from 'components/UserListItem';
import { user } from 'stories/mock';

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
            <UserListItem user={user}>19.22</UserListItem>
            <UserListItem user={user}>19.22</UserListItem>
            <UserListItem user={user}>19.22</UserListItem>
            <UserListItem user={user}>19.22</UserListItem>
            <UserListItem user={user}>19.22</UserListItem>
        </UserList>
    ),
};

export const Messages: Story = {
    render: () => (
        <UserList style={{ width: 570 }}>
            <UserListItem variant="message" user={user}>
                Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.
            </UserListItem>
            <UserListItem variant="message" user={user}>
                Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.
            </UserListItem>
            <UserListItem variant="message" user={user}>
                Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.
            </UserListItem>
            <UserListItem variant="message" user={user}>
                Cupidatat commodo magna consectetur consequat duis ullamco in voluptate irure occaecat non esse laborum.
            </UserListItem>
        </UserList>
    ),
};
