import { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    args: {
        children: (
            <>
                <optgroup label="Платежные системы">
                    <option value="qiwi">Qiwi</option>
                    <option value="webmoney">WebMoney</option>
                    <option value="yandex">Яндекс.Деньги</option>
                    <option value="payeer">PAYEER</option>
                </optgroup>
                <optgroup label="Мобильная связь (Россия)">
                    <option value="beeline">Билайн</option>
                    <option value="megafon">Мегафон</option>
                    <option value="mts">МТС</option>
                    <option value="tele2">Теле 2</option>
                </optgroup>
                <optgroup label="Банковские карты">
                    <option value="visa">VISA (от 1100р)</option>
                    <option value="mastercard">MASTERCARD (от 1100р)</option>
                </optgroup>
            </>
        ),
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
