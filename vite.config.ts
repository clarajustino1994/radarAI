import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Build for a Node-compatible runtime (Vercel) instead of Cloudflare Workers.
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
});
