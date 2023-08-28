import Image from 'next/image';
import styles from './BlockHeader.module.scss';
import c from 'clsx';

export type BlockHeaderProps = {
    title: string;
    img?: JSX.Element;
    className?: string;
};

function BlockHeader(props: BlockHeaderProps) {
    return (
        <div className={c(styles.blockHeader, props.className)}>
            <span>{props.title}</span>
            {props.img}
        </div>
    );
}

export default BlockHeader;
