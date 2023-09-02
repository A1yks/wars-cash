import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { useState } from 'react';
import Container from './Container';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Container> = {
    title: 'Components/Container',
    component: Container,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <Container>Content</Container>,
};
