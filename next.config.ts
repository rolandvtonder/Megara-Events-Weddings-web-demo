import path from "node:path";
import type { NextConfig } from "next";

// `npm run build:pages` sets PAGES_BASE_PATH to build a fully static copy for GitHub Pages,
// which serves the site from /<repo-name>/ and has no image optimiser.
const pagesBase = process.env.PAGES_BASE_PATH;

const nextConfig: NextConfig = {
  // Pin the workspace root so stray lockfiles higher up the disk are ignored.
  turbopack: { root: path.resolve(".") },
  ...(pagesBase !== undefined && { output: "export", basePath: pagesBase, trailingSlash: true }),
  env: { NEXT_PUBLIC_BASE_PATH: pagesBase ?? "" },
  images: {
    unoptimized: pagesBase !== undefined,
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
};

export default nextConfig;
