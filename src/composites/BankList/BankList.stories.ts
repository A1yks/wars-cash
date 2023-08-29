import { Meta, StoryObj } from '@storybook/react';
import BankList from '.';
import { BlueTeam, RedTeam } from 'components/BankHeader/BankHeader.stories';
import { Types } from 'mongoose';
import { Roles } from 'types/global';

const meta: Meta<typeof BankList> = {
    title: 'Composites/BankList',
    component: BankList,
    tags: ['autodocs'],
    args: {
        bets: [
            {
                user: {
                    id: '1' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'John',
                    surname: 'Doe',
                    role: Roles.User,
                },
                amount: 19.22,
            },
            {
                user: {
                    id: '2' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'John',
                    surname: 'Doe',
                    role: Roles.User,
                },
                amount: 25.92,
            },
            {
                user: {
                    id: '3' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'John',
                    surname: 'Doe',
                    role: Roles.User,
                },
                amount: 9.26,
            },
            {
                user: {
                    id: '4' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'John',
                    surname: 'Doe',
                    role: Roles.User,
                },
                amount: 33.09,
            },
            {
                user: {
                    id: '5' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'John',
                    surname: 'Doe',
                    role: Roles.User,
                },
                amount: 45,
            },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RedBankList: Story = {
    args: {
        ...RedTeam.args,
    },
};

export const BlueBankList: Story = {
    args: {
        ...BlueTeam.args,
    },
};
