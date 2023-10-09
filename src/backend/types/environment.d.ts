declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_CONNECT: string;
            NEXT_PUBLIC_FACEBOOK_APP_ID: string;
            FACEBOOK_APP_SECRET: string;
            TOKEN_SECRET: string;
            PORT?: string;
            RANDOM_ORG_API_KEY?: string;
        }
    }
}

export {};
