import type { NextConfig } from "next";

const nextConfig: any = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '250mb',
    },
  },
  outputFileTracingIncludes: {
    '/login': ['./data/**/*'],
    '/admin/**/*': ['./data/**/*'],
    '/api/**/*': ['./data/**/*'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
  // cacheOnFrontEndNav: true,
  // aggressiveFrontEndNavCaching: true,
  // reloadOnOnline: true,
  // swcMinify: true,
  // workboxOptions: {
  //   disableDevLogs: true,
  // },
});

export default withPWA(nextConfig);
