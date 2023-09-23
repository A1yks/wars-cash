import useBooleanState from 'hooks/useBooleanState';
import useErrorsHandler from 'hooks/useErrorsHandler';
import useFormState from 'hooks/useFormState';
import { useCallback, useState } from 'react';
import { ChatMessageProps } from '../ChatMessage';

function useChatMessage(props: ChatMessageProps) {
    const [isTimeoutInputVisible, showTimeoutInput, hideTimeoutInput] = useBooleanState();
    const [isTimingOut, setIsTimingOut] = useState(false);

    const getTimeoutFormState = useCallback(
        () => ({
            time: '600',
        }),
        []
    );

    const { formState, changeHandler } = useFormState(getTimeoutFormState);

    const timeoutHadler = useErrorsHandler(async () => {
        setIsTimingOut(true);
        await props
            .onRestrictChatAccess?.({ userId: props.message.sender._id.toString(), period: parseInt(formState.time), reason: props.message.text })
            ?.finally(() => {
                setIsTimingOut(false);
            });
    });

    const banHandler = useErrorsHandler(async () => {
        await props.onRestrictChatAccess?.({ userId: props.message.sender._id.toString(), period: -1, reason: props.message.text });
    });

    const deleteMessageHandler = useErrorsHandler(async () => {
        await props.onDeleteMessage?.(props.message);
    });

    return {
        formState,
        isTimingOut,
        isTimeoutInputVisible,
        changeHandler,
        showTimeoutInput,
        hideTimeoutInput,
        getTimeoutFormState,
        timeoutHadler,
        banHandler,
        deleteMessageHandler,
    };
}

export default useChatMessage;
