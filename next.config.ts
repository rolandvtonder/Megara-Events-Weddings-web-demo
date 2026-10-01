import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so stray lockfiles higher up the disk are ignored.
  turbopack: { root: path.resolve(".") },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
};

export default nextConfig;
