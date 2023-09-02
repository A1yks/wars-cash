'use client';
import { ReactNode } from 'react';
import { RootState, store } from 'store';

export type HydratorProps = {
    data: Partial<RootState>;
    children: ReactNode;
};

function Hydrator(props: HydratorProps) {
    store.dispatch({ type: 'HYDRATE', payload: props.data });

    return <>{props.children}</>;
}

export default Hydrator;
