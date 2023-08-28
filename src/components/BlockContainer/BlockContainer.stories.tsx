import { Meta, StoryObj } from '@storybook/react';
import BlockContainer from '.';
import BlockHeader from 'components/BlockHeader';
import Image from 'next/image';

const meta: Meta<typeof BlockContainer> = {
    title: 'Components/BlockContainer',
    component: BlockContainer,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div style={{ width: 370 }}>
            <BlockContainer style={{ fontSize: 17, padding: 10 }}>Block Container</BlockContainer>
        </div>
    ),
};

export const WithHeader: Story = {
    render: () => (
        <div style={{ width: 370 }}>
            <BlockContainer>
                <BlockHeader title="Block Container" img={<Image src="/images/notes.png" width={60} height={60} alt="" />} />
                <div style={{ fontSize: 17, padding: 10 }}>Content</div>
            </BlockContainer>
        </div>
    ),
};
