import Container from 'components/Container';
import Header from 'composites/Header';
import styles from './MainLayout.module.scss';
import useAuth from 'hooks/useAuth';
import { ReactNode } from 'react';
import Head from 'next/head';
import useAppSelector from 'hooks/useAppSelector';
import Footer from 'composites/Footer';

export type MainLayoutProps = {
    title?: string;
    children: ReactNode;
    showFooter?: boolean;
};

function MainLayout(props: MainLayoutProps) {
    const { showFooter = true } = props;
    const user = useAppSelector((state) => state.user);
    const { loginHandler, logoutHandler } = useAuth();
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
            {showFooter && <Footer />}
        </div>
    );
}

export default MainLayout;
