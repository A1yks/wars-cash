import c from 'clsx';
import styles from './Menu.module.scss';
import React, { ReactNode } from 'react';
import Portal from 'components/Portal';
import BlockContainer from 'components/BlockContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import preventBubbling from 'utils/preventBubbling';
import { CSSTransition } from 'react-transition-group';

export type MenuProps = {
    className?: string;
    children: ReactNode;
    isOpened: boolean;
    onClose: () => void;
};

function Menu(props: MenuProps) {
    return (
        <Portal>
            <CSSTransition
                in={props.isOpened}
                timeout={400}
                classNames={{
                    enter: styles.animationEnter,
                    enterActive: styles.animationEnterActive,
                    exit: styles.animationExit,
                    exitActive: styles.animationExitActive,
                }}
                unmountOnExit
            >
                <div className={styles.backdrop} onClick={props.onClose}>
                    <div className={c(styles.menu, props.className)} onClick={preventBubbling}>
                        <BlockContainer className={c(styles.content, 'content')}>
                            <FontAwesomeIcon icon={faClose} className={styles.closeIcon} onClick={props.onClose} />
                            {props.children}
                        </BlockContainer>
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
}

export default Menu;
