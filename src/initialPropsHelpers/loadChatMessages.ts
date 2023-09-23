import { AppStore } from 'store';
import { chatApi } from 'store/api/chat';
import getInitialPageProps from 'utils/getInitialPageProps';

export async function loadChatMessagesHelper(store: AppStore) {
    await store.dispatch(chatApi.endpoints.getMessages.initiate());
}

const loadChatMessages = getInitialPageProps(async (store) => {
    await loadChatMessagesHelper(store);
});

export default loadChatMessages;
