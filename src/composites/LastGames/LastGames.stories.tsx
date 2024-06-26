import { Meta, StoryObj } from '@storybook/react';
import LastGames from '.';
import { BetTypes } from '@backend/services/game/types';

const meta: Meta<typeof LastGames> = {
    title: 'Composites/LastGames',
    component: LastGames,
    tags: ['autodocs'],
    args: {
        data: [
            BetTypes.Blue,
            BetTypes.Red,
            BetTypes.Red,
            BetTypes.Blue,
            BetTypes.Red,
            BetTypes.Red,
            BetTypes.Blue,
            BetTypes.Red,
            BetTypes.Red,
            BetTypes.Blue,
            BetTypes.Red,
            BetTypes.Red,
        ],
    },
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

export const Default: Story = {};
