import type { NextConfig } from "next";

// Static export for GitHub Pages (no server runtime there): every route is
// prerendered to out/, images pass through unoptimized, and trailingSlash
// emits folder-style URLs Pages serves directly. basePath matches the
// project-site subpath in production only, so local dev stays at /.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/beautyinstitute-website" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
