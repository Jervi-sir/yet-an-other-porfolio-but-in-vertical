import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Turbopack resolves from this repo (avoid picking up other lockfiles).
    root: __dirname,
  },
};

export default nextConfig;
