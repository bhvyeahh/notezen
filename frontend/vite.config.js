import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// ✅ Production-ready Vite config
export default defineConfig({
  plugins: [
    react(),
    // 🧩 PWA plugin setup
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "mask-icon.svg",
      ],
      manifest: {
        name: "NoteZen",
        short_name: "NoteZen",
        description: "Your spaced-repetition learning dashboard.",
        theme_color: "#4f46e5",
        background_color: "#0f172a",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: "/iconss/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/iconss/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  // 🌍 ensures frontend routing works on Vercel
  server: {
    port: 5173,
    host: "0.0.0.0",
  },

  // ⚙️ build optimizations
  build: {
    outDir: "dist",
    sourcemap: false,
  },

  // 🧠 Fixes refresh issue on nested routes like /dashboard
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  // ⚡ Environment variables
  define: {
    "process.env": {},
  },
});
