import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['mahmoudmohammed.site'],
  },
  async rewrites() {
    return [
      // Proxy Sanctum CSRF cookie endpoint

    ];
  },
};

export default nextConfig;