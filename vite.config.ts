// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // If deploying to a GitHub Pages project site (e.g. /repo-name/), set the
    // repository name here so asset paths resolve correctly.
    // For a user/org site (username.github.io) leave it as "/".
    base: process.env.VITE_BASE_PATH || "/",
  },

  tanstackStart: {
    // The site is exported as a client-side SPA so it can be hosted on
    // GitHub Pages. The order form still talks to Lovable Cloud from the
    // browser, no server runtime is required.
    prerender: { enabled: false },
  },
});
