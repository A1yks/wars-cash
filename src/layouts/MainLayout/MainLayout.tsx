import Container from 'components/Container';
import Header from 'composites/Header';
import styles from './MainLayout.module.scss';
import useMainLayout from './hooks/useMainLayout';
import { ReactNode } from 'react';
import Head from 'next/head';

export type MainLayoutProps = {
    title?: string;
    children: ReactNode;
};

function MainLayout(props: MainLayoutProps) {
    const { user, loginHandler, logoutHandler } = useMainLayout();
    const title = props.title ? `${props.title} | Wars.Cash` : 'Wars.Cash';

    return (
        <div className={styles.mainContent}>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <Header user={user} onLogin={loginHandler} onLogout={logoutHandler} />
            </Container>
            <main className={styles.main}>{props.children}</main>
        </div>
    );
}

export default MainLayout;
