import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://261277fe2311.ngrok-free.app/api/:path*', // URL вашего Flask-бэка
      },
    ];
  },
};

export default nextConfig;

