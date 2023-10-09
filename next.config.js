const path = require('path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('next-bundle-analyzer');

const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE_BUNDLE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, '/src/styles')],
        prependData: `@import "variables.scss";`,
    },
    images: {
        domains: ['localhost', '127.0.0.1', '116.202.113.54', 'wars.cash'],
    },
    distDir: 'dist/.next',
};

module.exports = withPlugins([bundleAnalyzer], nextConfig);
