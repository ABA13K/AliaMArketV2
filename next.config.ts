import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['mahmoudmohammed.site'],
  },
  async rewrites() {
    return [
      // Proxy Sanctum CSRF cookie endpoint
      {
        source: '/sanctum/csrf-cookie',
        destination: 'https://mahmoudmohammed.site/sanctum/csrf-cookie',
      },
      // Proxy login route
      {
        source: '/login',
        destination: 'https://mahmoudmohammed.site/login',
      },
      // Proxy all other API routes
      {
        source: '/api/:path*',
        destination: 'https://mahmoudmohammed.site/api/:path*',
      },
    ];
  },
};

export default nextConfig;