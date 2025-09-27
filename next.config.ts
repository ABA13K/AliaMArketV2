import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['aliaecommerce.com'],
  },
  async rewrites() {
    return [
      // Proxy Sanctum CSRF cookie endpoint

    ];
  },
};

export default nextConfig;