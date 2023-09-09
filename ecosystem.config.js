module.exports = {
    apps: [
        {
            name: 'wars-cash',
            script: 'npm',
            args: 'start',
            watch: false,
            env: {
                PORT: 80,
            },
        },
        {
            name: 'wars-cash-staging',
            script: 'npm',
            args: 'start',
            watch: false,
            env: {
                NODE_ENV: 'staging',
                PORT: 3000,
            },
        },
    ],
};
