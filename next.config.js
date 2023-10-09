const path = require('path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('next-bundle-analyzer');

const bundleAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE_BUNDLE === 'true' });

const fontHeaders = [
    {
        key: 'Cache-control',
        value: 'public, immutable, max-age=31536000',
    },
];

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
    async headers() {
        return [
            {
                source: '/:all*(ttf|otf|woff|woff2)',
                headers: fontHeaders,
            },
        ];
    },
};

module.exports = withPlugins([bundleAnalyzer], nextConfig);
