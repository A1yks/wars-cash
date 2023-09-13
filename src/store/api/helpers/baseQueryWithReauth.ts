import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import setAuthHeaders from './setAuthHeaders';
import { Mutex } from 'async-mutex';
// import authSlice from 'store/reducers/authSlice';
import { AuthRes } from '../../types';

type BQueryFn = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, Record<string, unknown>, FetchBaseQueryMeta>;

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: setAuthHeaders,
});

function isAuthRes(data: unknown): data is API.Response<AuthRes> {
    const d = data as API.Response<AuthRes>;

    return typeof d === 'object' && typeof d.data === 'object' && typeof d.data.user === 'object' && typeof d.data.accessToken === 'string';
}

const mutex = new Mutex();

const baseQueryWithReauth: BQueryFn = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResponse = await baseQuery('/tokens/renew', api, extraOptions);
                const { data: refreshResult } = refreshResponse;

                if (isAuthRes(refreshResult)) {
                    const { setAuth } = (await import('store/reducers/authSlice')).default.actions;

                    api.dispatch(
                        setAuth({
                            token: refreshResult.data.accessToken,
                            isLoading: false,
                            isLoginCompleted: true,
                        })
                    );
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch({ type: 'logout' });
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export default baseQueryWithReauth;
