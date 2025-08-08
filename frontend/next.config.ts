import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://c8de305bc07c.ngrok-free.app/api/:path*', // URL вашего Flask-бэка
      },
    ];
  },
};

export default nextConfig;

