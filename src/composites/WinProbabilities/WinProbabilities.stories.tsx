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
        redTeamInfo: {
            minValue: 1,
            maxValue: 642,
        },
        blueTeamInfo: {
            minValue: 643,
            maxValue: 1000,
        },
        percentageValue: 1000,
    },
};
