import { Meta, StoryObj } from '@storybook/react';
import BankList from '.';
import { BlueTeam, RedTeam } from 'components/BankHeader/BankHeader.stories';
import { Types } from 'mongoose';
import { Roles } from '@backend/models/User/types';
import { user } from 'stories/mock';

const meta = {
    title: 'Composites/BankList',
    component: BankList,
    tags: ['autodocs'],
    args: {
        bets: [
            {
                user: { ...user, _id: '1' as unknown as Types.ObjectId },
                amount: 19.22,
            },
            {
                user: { ...user, _id: '2' as unknown as Types.ObjectId },
                amount: 25.92,
            },
            {
                user: { ...user, _id: '3' as unknown as Types.ObjectId },
                amount: 9.26,
            },
            {
                user: { ...user, _id: '4' as unknown as Types.ObjectId },
                amount: 33.09,
            },
            {
                user: { ...user, _id: '5' as unknown as Types.ObjectId },
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
