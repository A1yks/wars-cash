import c from 'clsx';
import styles from './Header.module.scss';
import Logo from 'components/Logo';
import Navigation from 'composites/Navigation';
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
