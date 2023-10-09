import c from 'clsx';
import styles from './PagesList.module.scss';
import { ReactNode } from 'react';
import Link from 'components/Link';
import { Url } from 'next/dist/shared/lib/router/router';

type Page = {
    title: string;
    href: Url;
};

export type PagesListProps = {
    pages: Page[];
    activeIndex: number;
    className?: string;
    onPageChange?: (index: number) => void;
};

function PagesList(props: PagesListProps) {
    function pageClickHandler(index: number) {
        return () => props.onPageChange?.(index);
    }

    return (
        <div className={c(styles.listContent, props.className)}>
            <div className={styles.listWrapper}>
                <ul className={styles.list}>
                    {props.pages.map(({ title, href }, i) => (
                        <li
                            key={i}
                            className={c(styles.item, { [styles.active]: i === props.activeIndex })}
                            onClick={props.onPageChange === undefined ? undefined : pageClickHandler(i)}
                        >
                            <Link href={href} className={styles.pageLink}>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PagesList;
