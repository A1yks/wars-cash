import React from 'react';
import c from 'clsx';
import styles from './Container.module.scss';

export type ContainerProps = React.ComponentPropsWithRef<'div'>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
    const { className, ...restProps } = props;

    return <div ref={ref} className={c(styles.container, className)} {...restProps} />;
});

Container.displayName = 'Container';

export default Container;
