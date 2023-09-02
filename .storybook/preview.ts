import type { Preview } from '@storybook/react';

import 'react-circular-progressbar/dist/styles.css';
import 'simplebar-react/dist/simplebar.min.css';
import '../src/styles/global.scss';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        layout: 'centered',
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
};

export default preview;
