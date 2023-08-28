import React, { ReactNode } from 'react';
import styles from './BlockContainer.module.scss';
import c from 'clsx';

export type BlockContainerProps = {
    className?: string;
    children?: ReactNode;
} & React.ComponentPropsWithRef<'div'>;

const BlockContainer = React.forwardRef<HTMLDivElement, BlockContainerProps>((props, ref) => {
    const { className, ...divProps } = props;

    return <div ref={ref} className={c(styles.blockContainer, className)} {...divProps} />;
});

BlockContainer.displayName = 'BlockContainer';

export default BlockContainer;
