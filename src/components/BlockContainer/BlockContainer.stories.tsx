import { Meta, StoryObj } from '@storybook/react';
import BlockContainer from '.';
import BlockHeader from 'components/BlockHeader';
import Image from 'next/image';

const meta: Meta<typeof BlockContainer> = {
    title: 'Components/BlockContainer',
    component: BlockContainer,
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
    render: () => <BlockContainer style={{ fontSize: 17, padding: 10 }}>Block Container</BlockContainer>,
};

export const WithHeader: Story = {
    render: () => (
        <BlockContainer>
            <BlockHeader title="Block Container" rightContent={<Image src="/images/notes.png" width={60} height={60} alt="" />} />
            <div style={{ fontSize: 17, padding: 10 }}>Content</div>
        </BlockContainer>
    ),
};
