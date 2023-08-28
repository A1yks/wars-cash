import { Meta, StoryObj } from '@storybook/react';
import BankHeader from '.';

const meta: Meta<typeof BankHeader> = {
    title: 'Components/BankHeader',
    component: BankHeader,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RedTeam: Story = {
    args: {
        title: 'Банк красной команды',
        variant: 'red',
        coeff: 5.57,
    },
    render: (args) => (
        <div style={{ width: 570 }}>
            <BankHeader {...args} />
        </div>
    ),
};

export const BlueTeam: Story = {
    args: {
        title: 'Банк синей команды',
        variant: 'blue',
        coeff: 2.8,
    },
    render: (args) => (
        <div style={{ width: 570 }}>
            <BankHeader {...args} />
        </div>
    ),
};
