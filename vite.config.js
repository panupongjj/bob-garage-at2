import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${path.resolve(
          __dirname,
          "./src/styles/_variables.scss"
        )}";`,
      },
    },
  },
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
