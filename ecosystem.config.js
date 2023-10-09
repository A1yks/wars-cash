module.exports = {
    apps: [
        {
            name: 'wars-cash',
            script: 'npm',
            args: 'start',
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'wars-cash-staging',
            script: 'npm',
            args: 'start',
            watch: false,
            env: {
                NODE_ENV: 'development',
            },
        },
    ],
};
