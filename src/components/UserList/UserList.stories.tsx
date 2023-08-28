import { Meta, StoryObj } from '@storybook/react';
import UserList from '.';
import UserListItem from 'components/UserListItem';

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
            <UserListItem name="Степан" surname="Иванов" avatarSrc="/images/avatar.jpg">
                19.22
            </UserListItem>
            <UserListItem name="Степан" surname="Иванов" avatarSrc="/images/avatar.jpg">
                19.22
            </UserListItem>
            <UserListItem name="Степан" surname="Иванов" avatarSrc="/images/avatar.jpg">
                19.22
            </UserListItem>
            <UserListItem name="Степан" surname="Иванов" avatarSrc="/images/avatar.jpg">
                19.22
            </UserListItem>
            <UserListItem name="Степан" surname="Иванов" avatarSrc="/images/avatar.jpg">
                19.22
            </UserListItem>
        </UserList>
    ),
};
