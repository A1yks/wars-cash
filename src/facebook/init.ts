import { checkAuth } from './auth';

if (typeof window !== 'undefined') {
    window.fbAsyncInit = function () {
        FB.init({
            appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v17.0',
        });

        checkAuth();
    };
}
