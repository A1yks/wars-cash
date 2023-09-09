import { Meta, StoryObj } from '@storybook/react';
import BankList from '.';
import { BlueTeam, RedTeam } from 'components/BankHeader/BankHeader.stories';
import { Types } from 'mongoose';
import { Roles } from 'backend/models/User/types';

const meta = {
    title: 'Composites/BankList',
    component: BankList,
    tags: ['autodocs'],
    args: {
        bets: [
            {
                user: {
                    _id: '1' as unknown as Types.ObjectId,
                    facebookId: '123',
                    avatar: '/images/avatar.jpg',
                    name: 'Степан Иванов',
                    role: Roles.User,
                    balance: 10000,
                },
                amount: 19.22,
            },
            {
                user: {
                    _id: '2' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'Степан Иванов',
                    role: Roles.User,
                    facebookId: '123',
                    balance: 10000,
                },
                amount: 25.92,
            },
            {
                user: {
                    _id: '3' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'Степан Иванов',
                    role: Roles.User,
                    facebookId: '123',
                    balance: 10000,
                },
                amount: 9.26,
            },
            {
                user: {
                    _id: '4' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'Степан Иванов',
                    role: Roles.User,
                    facebookId: '123',
                    balance: 10000,
                },
                amount: 33.09,
            },
            {
                user: {
                    _id: '5' as unknown as Types.ObjectId,
                    avatar: '/images/avatar.jpg',
                    name: 'Степан Иванов',
                    role: Roles.User,
                    facebookId: '123',
                    balance: 10000,
                },
                amount: 45,
            },
        ],
    },
} satisfies Meta<typeof BankList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RedBankList = {
    args: {
        ...RedTeam.args,
    },
} satisfies Story;

export const BlueBankList = {
    args: {
        ...BlueTeam.args,
    },
} satisfies Story;
