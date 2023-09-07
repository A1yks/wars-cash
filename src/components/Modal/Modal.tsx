import c from 'clsx';
import styles from './Modal.module.scss';
import Portal from 'components/Portal';
import { ReactElement, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import preventBubbling from 'utils/preventBubbling';

export type ModalContextData = {
    isOpened: boolean;
    open: () => void;
    close: () => void;
};

export type ModalProps = {
    className?: string;
    children: ReactNode;
};

export type ModalBtnProps = {
    children: ReactElement;
};

const ModalContext = createContext<ModalContextData | null>(null);

export function useModal() {
    const context = React.useContext(ModalContext);

    if (!context) {
        throw new Error('useModal must be used within a Modal');
    }

    return context;
}

export function Modal(props: Props.WithChildren) {
    const [isOpened, setIsOpened] = useState(false);

    const open = useCallback(() => {
        setIsOpened(true);
    }, []);

    const close = useCallback(() => {
        setIsOpened(false);
    }, []);

    useEffect(() => {
        if (isOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpened]);

    const value = useMemo<ModalContextData>(() => ({ isOpened, open, close }), [isOpened, open, close]);

    return <ModalContext.Provider value={value}>{props.children}</ModalContext.Provider>;
}

export function ModalBody(props: ModalProps) {
    const { className, children } = props;
    const { isOpened, close } = useModal();

    return (
        <Portal>
            <CSSTransition
                in={isOpened}
                timeout={200}
                classNames={{
                    enter: styles.animationEnter,
                    enterActive: styles.animationEnterActive,
                    exit: styles.animationExit,
                    exitActive: styles.animationExitActive,
                }}
                unmountOnExit
            >
                <div className={styles.modal} onClick={close}>
                    <div className={c(styles.modalWrapper, 'flex', 'center')}>
                        <div className={className} onClick={preventBubbling}>
                            {children}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
}

export function ModalOpener(props: ModalBtnProps) {
    const { open } = useModal();

    return React.cloneElement(props.children, {
        ...props.children.props,
        onClick(e: React.MouseEvent<HTMLElement>) {
            open();
            props.children.props.onClick?.(e);
        },
    });
}

export function ModalCloser(props: ModalBtnProps) {
    const { close } = useModal();

    return React.cloneElement(props.children, {
        ...props.children.props,
        async onClick(e: React.MouseEvent<HTMLElement>) {
            await props.children.props.onClick?.(e);
            close();
        },
    });
}
