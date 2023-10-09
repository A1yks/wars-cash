import BlockedUserContent from 'features/BlockedUserContent';
import { getDefaultLayout } from 'layouts/getters';
import getInitialPageProps from 'utils/getInitialPageProps';

function BlockedPage() {
    return <BlockedUserContent />;
}

BlockedPage.getInitialProps = getInitialPageProps(async (store, ctx) => {
    if (!ctx.req) {
        return {};
    }

    const { user } = store.getState();

    if (!user?.isBanned) {
        ctx.res
            ?.writeHead(302, {
                Location: '/',
            })
            .end();
    }
});

BlockedPage.getLayout = getDefaultLayout('Аккаунт заблокирован');

export default BlockedPage;
