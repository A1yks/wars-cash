import { chatMessageFieldSchema } from '@backend/controllers/chat/validation';
import useFormValidation from 'hooks/useFormValidation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { object } from 'yup';
import { ChatFooterProps } from '../ChatFooter';

const chatMessageSchema = object({ message: chatMessageFieldSchema });

function useChatFooter(props: ChatFooterProps) {
    const { scrollToBottom } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const isUserScrolledRef = useRef(false);

    function scrollHandler(e: Event) {
        const scrollEl = e.target as HTMLElement;
        const innerScrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        const scrolledPixels = innerScrollHeight - scrollEl.scrollTop;
        const pixelsToScroll = 60;

        if (scrolledPixels > pixelsToScroll) {
            isUserScrolledRef.current = true;
        } else {
            isUserScrolledRef.current = false;
        }
    }

    useEffect(() => {
        const scrollEll = props.scrollRef.current?.getScrollElement();

        scrollEll?.addEventListener('scroll', scrollHandler);

        return () => {
            scrollEll?.removeEventListener('scroll', scrollHandler);
        };
    }, [props.scrollRef]);

    useEffect(() => {
        if (!isSubmitting && !isUserScrolledRef.current) {
            scrollToBottom('instant');
        }
    }, [isSubmitting, scrollToBottom]);

    const { control, submitHandler, setFocus } = useFormValidation(
        chatMessageSchema,
        async () => {
            setIsSubmitting(true);

            await props.onSubmit(message.trim())?.finally(() => {
                setIsSubmitting(false);
            });

            setMessage('');
            setFocus('message');
        },
        {
            defaultValues: {
                message: '',
            },
            resetValuesAfterSubmit: true,
        }
    );

    function changeMessageHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
    }

    return { control, message, isSubmitting, changeMessageHandler, submitHandler };
}

export default useChatFooter;
