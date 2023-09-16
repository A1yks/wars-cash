import { Meta, StoryObj } from '@storybook/react';
import WinProbabilities from '.';

const meta: Meta<typeof WinProbabilities> = {
    title: 'Composites/WinProbabilities',
    component: WinProbabilities,
    tags: ['autodocs'],
    args: {},
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
        redTeam: {
            percent: 12,
            values: [1, 642],
        },
        blueTeam: {
            percent: 12,
            values: [643, 1000],
        },
        percentageValue: 1000,
    },
};
