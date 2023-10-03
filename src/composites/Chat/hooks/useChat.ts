import { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import { ChatProps } from '../Chat';
import useChatUnavailable from './useChatUnavailable';
import useBooleanState from 'hooks/useBooleanState';
import { isModer } from '@backend/models/User/types';

function useChat(props: ChatProps) {
    const scrollRef = useRef<React.ComponentRef<typeof SimpleBar>>(null);
    const { timeToUnban } = useChatUnavailable(props.chatTimeout);
    const isMuted = timeToUnban > 0;
    const showModerControls = isModer(props.userRole) && !isMuted;
    const [isBlockedUsersListOpened, openBlockedUsersList, closeBlockedUsersList] = useBooleanState();
    const isFooterVisible = !isBlockedUsersListOpened;

    useEffect(() => {
        scrollToBottom('instant');
    }, []);

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

    function toggleBlockedUsersList() {
        if (isBlockedUsersListOpened) {
            closeBlockedUsersList();
            props.onBlockedUsersListClosed();
        } else {
            openBlockedUsersList();
            props.onBlockedUsersListOpen();
        }
    }

    return {
        scrollRef,
        timeToUnban,
        isMuted,
        isBlockedUsersListOpened,
        isFooterVisible,
        showModerControls,
        scrollClickHandler,
        scrollToBottom,
        toggleBlockedUsersList,
    };
}

export default useChat;
