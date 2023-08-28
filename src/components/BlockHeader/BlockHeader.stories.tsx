import { Meta, StoryObj } from '@storybook/react';
import BlockHeader from '.';
import Image from 'next/image';

const meta: Meta<typeof BlockHeader> = {
    title: 'Components/BlockHeader',
    component: BlockHeader,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div style={{ width: 370 }}>
            <BlockHeader title="Block Header" img={<Image src="/images/gamepad.png" width={64} height={61} alt="" />} />
        </div>
    ),
};
