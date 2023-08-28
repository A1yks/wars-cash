import { Meta, StoryObj } from '@storybook/react';
import Results from '.';
import { BetTypes } from 'types/global';

const meta: Meta<typeof Results> = {
    title: 'Components/Results',
    component: Results,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: [BetTypes.Blue, BetTypes.Red, BetTypes.Red, BetTypes.Blue, BetTypes.Red],
    },
};
