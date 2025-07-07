import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains: ["i.postimg.cc", "res.cloudinary.com", "www.svgrepo.com"],
  },
};

export default nextConfig;
