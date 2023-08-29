import { Meta, StoryObj } from '@storybook/react';
import LastGames from '.';
import { BetTypes } from 'types/global';

const meta: Meta<typeof LastGames> = {
    title: 'Composites/LastGames',
    component: LastGames,
    tags: ['autodocs'],
    args: {
        lastGames: [
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
