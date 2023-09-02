import { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';

function useChat() {
    const scrollRef = useRef<React.ComponentRef<typeof SimpleBar>>(null);

    function scrollToBottom(behavior: ScrollBehavior = 'smooth') {
        const scrollEl = scrollRef.current?.getScrollElement();

        if (scrollEl !== undefined) {
            scrollEl?.scrollTo({
                behavior,
                top: scrollEl.scrollHeight,
            });
        }
    }

    function scrollClickHandler() {
        scrollToBottom('smooth');
    }

    return { scrollRef, scrollClickHandler };
}

export default useChat;
