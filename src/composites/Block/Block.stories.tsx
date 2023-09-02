import { Meta, StoryObj } from '@storybook/react';
import Block from '.';
import Image from 'next/image';

const meta: Meta<typeof Block> = {
    title: 'composites/Block',
    component: Block,
    tags: ['autodocs'],
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
    render: () => (
        <Block title="Block title" rightContent={<Image src="/images/gamepad.png" width={64} height={61} alt="" />}>
            <div style={{ fontSize: 17, padding: 12 }}>Content</div>
        </Block>
    ),
};
