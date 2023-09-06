'use client';

import Container from 'components/Container';
import { useAppSelector } from 'hooks/useAppSelector';
import { redirect } from 'next/navigation';

function Layout(props: Props.WithChildren) {
    const user = useAppSelector((state) => state.auth.user);

    // TODO delete
    if (user === null) {
        redirect('/');
    }

    return <Container>{props.children}</Container>;
}

export default Layout;
