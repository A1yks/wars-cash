import c from 'clsx';
import styles from './Logo.module.scss';
import Image from 'next/image';
import Link from 'components/Link/Link';

export type LogoProps = {
    src?: string;
};

function Logo(props: LogoProps) {
    const { src = '/images/logo.png' } = props;

    return (
        <Link href="/" className={styles.logo}>
            <Image src={src} fill alt="" sizes="212px" />
        </Link>
    );
}

export default Logo;
