import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: (fullPathFile: string) => {
          if (
            fullPathFile.includes("libs/i18n") ||
            fullPathFile.includes("node_modules/i18n")
          ) {
            return "i18n";
          }

          return undefined;
        },
      },
    },
  },

  plugins: [
    react(),

    splitVendorChunkPlugin(),

    sentryVitePlugin({
      disable: command === "serve",

      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and need `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,

      release: {
        name: Date.now().toString(),
      },

      sourcemaps: {
        assets: "./dist/**/*",
      },
    }),
  ],
}));
