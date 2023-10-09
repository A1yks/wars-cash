import c from 'clsx';
import styles from './Footer.module.scss';
import useAppSelector from 'hooks/useAppSelector';
import { SiteInfoTypes } from '@backend/models/SiteInfo/types';
import { useMemo } from 'react';
import Link from 'components/Link';
import Container from 'components/Container';

function Footer() {
    const pages = useAppSelector((state) => state.siteInfo.pages);
    const pagesValues = useMemo(() => Object.values(pages), [pages]);
    const filteredPages = useMemo(() => pagesValues.filter((page) => page.type !== SiteInfoTypes.FAQ), [pagesValues]);

    return (
        <footer className={styles.footer}>
            <Container>
                <ul className={styles.list}>
                    {filteredPages.map((page) => (
                        <li key={page.type}>
                            <Link href={'/' + page.type}>{page.title}</Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </footer>
    );
}

export default Footer;
