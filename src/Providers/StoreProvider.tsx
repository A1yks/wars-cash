import { Provider } from 'react-redux';
import { AppState, store } from 'store';

export type StoreProviderProps = {
    data: Partial<AppState>;
    children: React.ReactNode;
};

function StoreProvider(props: StoreProviderProps) {
    store.dispatch({ type: 'HYDRATE', payload: props.data });

    return <Provider store={store}>{props.children}</Provider>;
}

export default StoreProvider;
