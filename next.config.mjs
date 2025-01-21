/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            // Allowing the retrieval from movie banners from tvdb URLs
            {
                protocol: 'https',
                hostname: 'artworks.thetvdb.com',
                pathname: '/banners/**',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
