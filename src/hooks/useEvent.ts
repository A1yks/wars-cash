import { useRef, useCallback } from 'react';
import useBrowserLayoutEffect from './useBrowserLayoutEffect';

type CallbackType = (...args: any[]) => MaybePromise<unknown>;

function useEvent<T extends CallbackType>(handler: T) {
    const handlerRef = useRef<T | null>(null);

    useBrowserLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return useCallback((...args: any[]) => {
        return handlerRef.current?.(...args);
    }, []) as T;
}

export default useEvent;
