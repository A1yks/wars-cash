import { Meta, StoryObj } from '@storybook/react';
import GameSpinner from '.';

const meta: Meta<typeof GameSpinner> = {
    title: 'Components/GameSpinner',
    component: GameSpinner,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        blueColorPercent: 50,
        rotation: 0,
        text: '57',
    },
};
