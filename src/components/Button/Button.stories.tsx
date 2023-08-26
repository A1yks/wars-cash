import type { Meta, StoryObj, ArgTypes } from '@storybook/react';
import Button from 'components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    args: {
        children: 'Button',
        color: 'blue',
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        variant: 'normal',
    },
    argTypes: {
        children: {
            control: 'select',
            options: ['Default', 'With icon'],
            mapping: {
                Default: 'Button',
                'With icon': (
                    <div className="flex" style={{ gap: 7, alignItems: 'center' }}>
                        <div style={{ background: 'url(/images/set.png) 0 0 no-repeat', width: 22, height: 22 }}></div>
                        <span>Поставить</span>
                    </div>
                ),
            },
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'Default' },
            },
        },
    },
};

export const Round: Story = {
    args: {
        variant: 'round',
        children: <div style={{ background: 'url(/images/plus.png) center no-repeat', width: '100%', height: '100%' }}></div>,
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
        children: '+100',
    },
};
