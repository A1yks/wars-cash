import c from 'clsx';
import styles from './Header.module.scss';
import Logo from 'components/Logo';
import Container from 'components/Container/Container';
import Navigation from 'composites/Navigation';
import { User } from 'types/global';

export type HeaderProps = {
    className?: string;
    user: User | null;
};

function Header(props: HeaderProps) {
    const { className, user } = props;

    return (
        <header className={c(styles.header, className)}>
            <Container className={styles.container}>
                <Logo />
                <Navigation user={user} />
            </Container>
        </header>
    );
}

export default Header;
