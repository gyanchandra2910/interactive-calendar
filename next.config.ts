import type { NextConfig } from "next";

// ─── GitHub Pages Static Export Configuration ─────────────────────────────
// Replace "interactive-calendar" below with your actual GitHub repository name.
// Example: if your repo URL is github.com/yourname/my-calendar-app
//          set REPO_NAME = "my-calendar-app"
const REPO_NAME = "interactive-calendar";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Required: emit a fully static site into the /out directory
  output: "export",

  // Required for GitHub Pages — your app lives at https://<user>.github.io/<repo>/
  basePath: isProd ? `/${REPO_NAME}` : "",
  assetPrefix: isProd ? `/${REPO_NAME}/` : "",

  // Required: Next.js image optimisation uses a server; disable it for static export
  images: {
    unoptimized: true,
  },

  // Trailing slashes make GitHub Pages routing work correctly
  trailingSlash: true,
};

export default nextConfig;
