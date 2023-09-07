import MainContent from 'features/MainContent';
import MainLayout from 'layouts/MainLayout';
import getInitialPageProps from 'utils/getInitialPageProps';

export default function Main() {
    return (
        <MainLayout>
            <MainContent />
        </MainLayout>
    );
}

// Main.getInitialProps = getInitialPageProps((store, ctx) => {
//     const isAuthorized = store.getState().auth.token !== null;

//     ctx.res
//         ?.writeHead(302, {
//             Location: isAuthorized ? '/profile' : '/auth/login',
//         })
//         .end();
// });
