import { Meta, StoryObj } from '@storybook/react';
import EditableForm from './EditableForm';
import { useState } from 'react';
import { object, string } from 'yup';
import useFormState from 'hooks/useFormState';
import ControlledInput from 'components/ControlledInput';

const meta = {
    title: 'Components/EditableForm',
    component: EditableForm,
    tags: ['autodocs'],
} satisfies Meta<typeof EditableForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
    render: function Render() {
        const [name, setName] = useState('Степан Иванов');
        const [isSaving, setIsSaving] = useState(false);
        const { formState, changeHandler } = useFormState(() => ({
            name,
        }));

        async function saveHandler() {
            await new Promise<void>((resolve) => {
                setIsSaving(true);
                setTimeout(() => {
                    setIsSaving(false);
                    setName(formState.name);
                    resolve();
                }, 2000);
            });
        }

        return (
            <EditableForm
                title="Edit name"
                isSaving={isSaving}
                validationSchema={object({
                    name: string().required('Name is required'),
                })}
                normalContent={<p>{formState.name}</p>}
                renderEditModeContent={({ control }) => (
                    <ControlledInput
                        name="name"
                        control={control}
                        placeholder="New name"
                        value={formState.name}
                        onChange={changeHandler('name')}
                        autoFocus
                    />
                )}
                defaultValidationValues={{ name }}
                onSave={saveHandler}
            />
        );
    },
} as unknown as Story;
