import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['via.placeholder.com'],
  },
}

export default nextConfig
