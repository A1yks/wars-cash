import { Meta, StoryObj } from '@storybook/react';
import TeamChance from '.';

const meta: Meta<typeof TeamChance> = {
    title: 'composites/TeamChance',
    component: TeamChance,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RedTeam: Story = {
    args: {
        minValue: 1,
        maxValue: 641,
        percentageValue: 1000,
        teamType: 'red',
    },
};

export const BlueTeam: Story = {
    args: {
        minValue: 642,
        maxValue: 1000,
        percentageValue: 1000,
        teamType: 'blue',
    },
};
