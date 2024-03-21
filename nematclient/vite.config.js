import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: "/nemat",
  build: {
    outDir: "client",
    assetsDir: "",
    sourcemap: false,
    manifest: true,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
