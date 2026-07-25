import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [".ngrok-free.app"],
  },
  preview: {
    allowedHosts: [".ngrok-free.app"],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      strategies: "generateSW",
      devOptions: {
        enabled: false,
        type: "module",
      },

      manifest: {
        name: "E-learning Université de Kara",
        short_name: "UK-Elearn",
        description: "UK-Elearn is a web-based learning platform dedicated to providing high-quality education online to students of 'Université de Kara",
        start_url: "/?source=pwa",
        display: "standalone",
        background_color: "#f7fffe",
        theme_color: "#E9F5FF",
        orientation: "portrait",
        icons: [
          {
            src: "/learns_16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/learns.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/learns_96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/learns_1.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/learns_2.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        // 2. CRITICAL: Clean up old caches that might be blocking the new ones
        cleanupOutdatedCaches: true,

        // skipWaiting: true,
        clientsClaim: true,
        navigateFallback: "/index.html",
        navigateFallbackAllowlist: [/^(?!\/__).*/],

        // 3. Keep this high (6MB) to ensure larger images/PDFs aren't skipped
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,

        // 4. THE MASTER RULE:
        // This pattern tells the Service Worker:
        // "Go to the build folder, find EVERY file ending in these extensions, and cache them."
        // This covers: images, scripts, styles, json, and your PDF worker.
        globPatterns: ["**/*.{js,css,html,mjs,png,jpg,jpeg,webp,svg,ico,json}"],

        runtimeCaching: [
          // Supabase API data (metadata)
          {
            urlPattern: ({ url }) =>
              url.hostname.includes("supabase.co") &&
              url.pathname.includes("/rest/v1"),
            handler: "NetworkFirst",
            options: {
              cacheName: "supabase-metadata-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ImageKit images (specific external images)
          {
            urlPattern: /^https:\/\/ik\.imagekit\.io\/g4xui13wk\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "learning-materials-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 2592000,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [200, 206] },
              rangeRequests: true,
            },
          },

          // Local PDFs and audio files
          {
            urlPattern: ({ url }) =>
              url.href.includes("/Docs/") &&
              (url.href.endsWith(".pdf") || url.href.endsWith(".aac")),
            handler: "CacheFirst",
            options: {
              cacheName: "local-media-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 2592000 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true,
            },
          },

          // ALL other images (covers any external images not caught above)
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "external-images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 2592000,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React Engine (Very stable, rarely changes)
          "vendor-core": ["react", "react-dom", "react-router-dom"],

          // The Animation Engine
          // Note: We use 'motion' because that is what's in your package.json
          "vendor-motion": ["motion"],

          // UI Helpers & Utilities
          "vendor-ui": ["react-toastify", "react-error-boundary"],
        },
      },
    },
  },
});