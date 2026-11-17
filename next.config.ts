import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // NOTE: cacheComponents + partialPrefetching were REMOVED 2026-11-17:
  // on Cloudflare Workers they hang the homepage (workerd setTimeout
  // incompatibility — Next.js itself warns about it) and make
  // /opengraph-image throw "Dynamic server usage ... IO that was not
  // cached". The site is fully static; it needs neither flag.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
