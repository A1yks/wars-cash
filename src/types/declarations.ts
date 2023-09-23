import { ReactNode } from 'react';

declare global {
    namespace API {
        type Response<T = unknown> = {
            data: T;
        };

        type ErrorResponse = {
            error: string;
        };
    }

    namespace Props {
        type WithChildren = {
            children: ReactNode;
        };
    }

    interface Window {
        lastHref?: string;
    }
}

declare module 'yup' {
    interface StringSchema {
        integer(): StringSchema;
    }
}

export {};
