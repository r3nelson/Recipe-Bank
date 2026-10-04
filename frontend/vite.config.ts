import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // exposes the dev server to all network interfaces
    port: 5173,
    watch: {
      usePolling: true, // forces Vite to poll for file changes (fixes live reload in Docker)
    },
    proxy: {
      "/auth": {
        target: process.env.API_PROXY_TARGET ?? "http://backend:8000",
        changeOrigin: true,
      },
      "/api": {
        target: process.env.API_PROXY_TARGET ?? "http://backend:8000",
        changeOrigin: true,
      },
    },
  },
});
