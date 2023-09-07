import { Meta, StoryObj } from '@storybook/react';
import ConfirmationDialog from './ConfirmationDIalog';
import { ModalOpener } from 'components/Modal';
import Button from 'components/Button';
import { useState } from 'react';

const meta = {
    title: 'Components/ConfirmationDialog',
    component: ConfirmationDialog,
    tags: ['autodocs'],
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: function Render() {
        const [isLoading, setIsLoading] = useState(false);

        async function submitHandler() {
            return new Promise<void>((resolve) => {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    resolve();
                }, 1000);
            });
        }

        return (
            <ConfirmationDialog onSubmit={submitHandler} content="Вы уверены, что хотите выполнить это действие?">
                <ModalOpener>
                    <Button>Open confirmation dialog</Button>
                </ModalOpener>
            </ConfirmationDialog>
        );
    },
} satisfies Story;
