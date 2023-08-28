import { Meta, StoryObj } from '@storybook/react';
import Link from './Link';

const meta: Meta<typeof Link> = {
    title: 'Components/Link',
    component: Link,
    tags: ['autodocs'],
    args: {
        children: 'Link',
        href: '/',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
