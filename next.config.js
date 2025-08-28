/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
  // Add CSP later when ready (requires hashing inline scripts or using only next/script):
  // { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' plausible.io; connect-src 'self' plausible.io; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" },
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: false,
  async headers() {
    return [
      // Site-wide security headers
      { source: '/(.*)', headers: securityHeaders },

      // Existing API cache header
      {
        source: '/api/portfolio-index.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=60' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
