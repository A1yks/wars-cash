import c from 'clsx';
import styles from './AppModalBody.module.scss';
import BlockHeader from 'components/BlockHeader';
import { ModalBody, useModal } from 'components/Modal';
import Icon from 'components/Icon/Icon';
import { ReactNode } from 'react';

export type AppModalBodyProps = {
    title: string;
    children: ReactNode;
};

function AppModalBody(props: AppModalBodyProps) {
    const { close } = useModal();

    return (
        <ModalBody className={styles.modalBody}>
            <BlockHeader
                title={props.title}
                className={styles.modalHeader}
                rightContent={<Icon src="/images/plus.png" className={styles.closeBtn} onClick={close} />}
            />
            <div className={styles.content}>{props.children}</div>
        </ModalBody>
    );
}

export default AppModalBody;
