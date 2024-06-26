import React from 'react';
import NextLink from 'next/link';
import c from 'clsx';
import styles from './Link.module.scss';

export type LinkProps = React.ComponentProps<typeof NextLink>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const { className, ...restProps } = props;

    return <NextLink ref={ref} className={c(styles.link, className)} {...restProps} />;
});

Link.displayName = 'Link';

export default Link;
