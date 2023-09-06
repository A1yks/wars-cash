'use client';
import Container from 'components/Container';
import Header from 'composites/Header';
import styles from './MainLayout.module.scss';
import useMainLayout from './hooks/useMainLayout';

function MainLayout(props: Props.WithChildren) {
    const { user, loginHandler, logoutHandler } = useMainLayout();

    return (
        <div className={styles.mainContent}>
            <Container>
                <Header user={user} onLogin={loginHandler} onLogout={logoutHandler} />
            </Container>
            <main className={styles.main}>{props.children}</main>
        </div>
    );
}

export default MainLayout;
