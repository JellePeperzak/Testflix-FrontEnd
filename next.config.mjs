/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            // Allowing the retrieval from movie banners from tvdb URLs
            {
                protocol: 'https',
                hostname: 'artworks.thetvdb.com',
                pathname: '/banners/v4/**',
            },
        ],
    },
};

export default nextConfig;
