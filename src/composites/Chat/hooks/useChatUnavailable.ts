import useBrowserLayoutEffect from 'hooks/useBrowserLayoutEffect';
import { useEffect, useRef, useState } from 'react';
import getTimeLeft from 'utils/getTimeLeft';

function getTimeValue(chatTimeout: number) {
    return chatTimeout === -1 ? Infinity : getTimeLeft(chatTimeout);
}

function useChatUnavailable(chatTimeout: number) {
    const timeToUnbanInitialStateRef = useRef(getTimeValue(chatTimeout));
    const [timeToUnban, setTimeToUnan] = useState(timeToUnbanInitialStateRef.current);
    const timerRef = useRef<ReturnType<(typeof window)['setTimeout']> | null>(null);
    const timeToUnbanValue = Math.max(Math.floor(timeToUnban / 1000), 0);

    // for some reason react makes timeToUnban negative, so we need to set initial value using layout effect
    useBrowserLayoutEffect(() => {
        const timeValue = getTimeValue(chatTimeout);

        timeToUnbanInitialStateRef.current = timeValue;

        setTimeToUnan(timeValue);
    }, [chatTimeout]);

    useEffect(() => {
        console.log(timeToUnbanInitialStateRef.current, chatTimeout);
        if (timeToUnbanInitialStateRef.current === Infinity) {
            return;
        }

        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            const timeLeft = getTimeLeft(chatTimeout);

            if (timeLeft <= 0) {
                clearTimeout(timerRef.current!);
                timerRef.current = null;
            }

            setTimeToUnan(timeLeft);
        }, 1000);

        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [chatTimeout]);

    return { timeToUnban: timeToUnbanValue };
}

export default useChatUnavailable;
