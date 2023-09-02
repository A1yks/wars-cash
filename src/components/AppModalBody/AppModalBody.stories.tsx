import { Meta, StoryObj } from '@storybook/react';
import AppModalBody from '.';
import { Modal, ModalBody, ModalCloser, ModalOpener } from 'components/Modal';
import Button from 'components/Button';

const meta: Meta<typeof AppModalBody> = {
    title: 'Components/AppModalBody',
    component: AppModalBody,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Modal>
            <AppModalBody title="Title">Content</AppModalBody>
            <ModalOpener>
                <Button>Open modal</Button>
            </ModalOpener>
        </Modal>
    ),
};
