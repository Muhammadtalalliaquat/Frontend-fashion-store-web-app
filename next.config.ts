import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
    domains: ["https://back-end-fashion-web-app-server-production.up.railway.app"], 
  },
};

export default nextConfig;
