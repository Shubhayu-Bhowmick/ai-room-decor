import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'example.com', 'plus.unsplash.com'], // Add Cloudinary's domain here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;