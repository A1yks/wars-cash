import { useCallback, useRef } from 'react';
import raf from 'raf';
import isNumber from 'lodash/isNumber';
import { warning } from '@lilib/utils';
import { useLatestRef, usePersist, useUnmount } from '@lilib/hooks';

export interface AnimationHookOptions {
    duration: number;
    initialPercent?: number;
    algorithm?: (percent: number) => number;
}

function useAnimation(callback: (percent: number) => void, options: number | AnimationHookOptions) {
    let duration: number = 0;
    let algorithm: (percent: number) => number;
    let initialPercent = 0;

    if (isNumber(options)) {
        duration = options;
    } else if (options) {
        if (options.duration) {
            duration = +options.duration;
        }
        if (options.algorithm) {
            algorithm = options.algorithm;
        }
        if (options.initialPercent) {
            initialPercent = options.initialPercent;
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        warning(!isNumber(duration) || !(duration > 0), 'You should provide a positive number as the duration.', { scope: 'useAnimation' });
    }

    const timerRef = useRef(0);
    const startTimeRef = useRef(0);
    const callbackRef = useLatestRef(callback);

    const step = usePersist((timestamp: number) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        let percent = duration > 0 ? initialPercent + elapsed / duration : 1;

        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;

        if (percent < 1) {
            timerRef.current = raf(step);
        }

        if (algorithm) {
            callbackRef.current(algorithm(percent));
        } else {
            callbackRef.current(percent);
        }
    });

    const cancel = useCallback(() => {
        if (timerRef.current) {
            raf.cancel(timerRef.current);
            timerRef.current = 0;
        }
        startTimeRef.current = 0;
    }, []);

    const start = usePersist(() => {
        cancel();
        timerRef.current = raf(step);
    });

    useUnmount(cancel);

    return [start, cancel] as const;
}

export default useAnimation;
