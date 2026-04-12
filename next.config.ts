import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TURNITY_API_URL: process.env.TURNITY_API_URL,
  },
};

export default nextConfig;
