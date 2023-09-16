import { Meta, StoryObj } from '@storybook/react';
import GameSpinner from '.';
import { BetTypes } from '@backend/services/game/types';

const meta = {
    title: 'Components/GameSpinner',
    component: GameSpinner,
    tags: ['autodocs'],
} satisfies Meta<typeof GameSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    args: {
        blueColorPercent: 23.4,
        text: '57',
        isSpinning: false,
        winner: BetTypes.Blue,
        isWaiting: false,
        isCancelled: false,
        rotation: 0,
        spinDuration: 10,
        spinningPercent: 0,
    },
} satisfies Story;
