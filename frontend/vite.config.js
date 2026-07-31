import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendUrl = "https://student-os-1-59k0.onrender.com";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/backend": {
        target: backendUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ""),
      },
    },
  },
});
