import Container from 'components/Container';
import useAppSelector from 'hooks/useAppSelector';
import { redirect } from 'next/navigation';
import { store } from 'store';

async function getUser() {
    return store.getState().auth.user;
}

async function Layout(props: Props.WithChildren) {
    const user = await getUser();

    // TODO delete
    if (user === null) {
        redirect('/');
    }

    return <Container>{props.children}</Container>;
}

export default Layout;
