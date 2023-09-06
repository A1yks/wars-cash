import { Meta, StoryObj } from '@storybook/react';
import OperationsHistory from '.';

const meta = {
    title: 'Components/OperationsHistory',
    component: OperationsHistory,
    tags: ['autodocs'],
    args: {
        titles: {
            date: 'Дата',
            sum: 'Сумма',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 600 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof OperationsHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithOperations = {
    args: {
        data: [
            {
                date: '22.03.2022',
                sum: '1000',
            },
            {
                date: '21.03.2022',
                sum: '500',
            },
            {
                date: '20.03.2022',
                sum: '750',
            },
            {
                date: '19.03.2022',
                sum: '250',
            },
            {
                date: '18.03.2022',
                sum: '1250',
            },
            {
                date: '17.03.2022',
                sum: '1500',
            },
            {
                date: '16.03.2022',
                sum: '2000',
            },
            {
                date: '15.03.2022',
                sum: '100',
            },
            {
                date: '14.03.2022',
                sum: '800',
            },
            {
                date: '13.03.2022',
                sum: '1200',
            },
        ],
    },
} satisfies Story;

export const Empty = {
    args: {
        data: [],
    },
} satisfies Story;
