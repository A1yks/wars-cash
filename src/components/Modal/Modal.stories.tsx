import { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalBody, ModalCloser, ModalOpener } from '.';
import Button from 'components/Button';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <Modal>
            <ModalOpener>
                <Button>Open modal</Button>
            </ModalOpener>
            <ModalBody>
                <div
                    style={{
                        width: 300,
                        height: 500,
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderRadius: '0.5rem',
                        gap: '1rem',
                        padding: '1rem',
                    }}
                >
                    <div style={{ fontSize: '1.6rem' }}>Modal body</div>
                    <ModalCloser>
                        <Button>Close modal</Button>
                    </ModalCloser>
                </div>
            </ModalBody>
        </Modal>
    ),
};
