const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, '/src/styles')],
        prependData: `@import "variables.scss";`,
    },
    images: {
        domains: ['localhost', '127.0.0.1', '116.202.113.54'],
    },
};

module.exports = nextConfig;
