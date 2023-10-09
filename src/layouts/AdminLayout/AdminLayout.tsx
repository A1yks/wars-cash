import Container from 'components/Container';
import AdminNavigation from 'composites/AdminNavigation/AdminNavigation';
import styles from './AdminLayout.module.scss';

function AdminLayout(props: Props.WithChildren) {
    return (
        <Container className={styles.layout}>
            <AdminNavigation />
            {props.children}
        </Container>
    );
}

export default AdminLayout;
