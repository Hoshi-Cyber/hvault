/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/api/portfolio-index.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=60'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;