module.exports = {
    apps: [
        {
            name: 'wars-cash',
            script: 'npm',
            args: 'start',
            watch: false,
        },
        {
            name: 'wars-cash-staging',
            script: 'npm',
            args: 'start',
            watch: false,
        },
    ],
};
