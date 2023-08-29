import { Meta, StoryObj } from '@storybook/react';
import BettingForm from '.';

const meta: Meta<typeof BettingForm> = {
    title: 'Composites/BettingForm',
    component: BettingForm,
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

export const Default: Story = {
    args: {
        balance: 100,
    },
};
