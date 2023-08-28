import { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
    args: {},
};

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Medium: Story = {
    args: {
        size: 'medium',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
    },
};
