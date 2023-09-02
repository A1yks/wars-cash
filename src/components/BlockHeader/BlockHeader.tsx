import Image from 'next/image';
import styles from './BlockHeader.module.scss';
import c from 'clsx';

export type BlockHeaderProps = {
    title: string;
    rightContent?: JSX.Element;
    className?: string;
};

function BlockHeader(props: BlockHeaderProps) {
    return (
        <div className={c(styles.blockHeader, props.className)}>
            <span>{props.title}</span>
            {props.rightContent}
        </div>
    );
}

export default BlockHeader;
