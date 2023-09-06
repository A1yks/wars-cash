import c from 'clsx';
import styles from './Header.module.scss';
import Logo from 'components/Logo';
import Container from 'components/Container/Container';
import Navigation from 'composites/Navigation';
import { User } from 'types/global';
import { NavigationProps } from 'composites/Navigation/Navigation';

export type HeaderProps = NavigationProps;

function Header(props: HeaderProps) {
    const { className, ...navProps } = props;

    return (
        <header className={c(styles.header, className)}>
            <div className={styles.container}>
                <Logo />
                <Navigation {...navProps} />
            </div>
        </header>
    );
}

export default Header;
