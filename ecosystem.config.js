module.exports = {
    apps: [
        {
            name: 'wars-cash',
            script: 'npm',
            args: 'start',
            watch: true,
            env: {
                PORT: 80,
            },
        },
        {
            name: 'wars-cash-staging',
            script: 'npm',
            args: 'start',
            watch: true,
            env: {
                PORT: 3000,
            },
        },
    ],
};
