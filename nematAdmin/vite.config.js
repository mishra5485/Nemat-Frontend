import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: "/nematAdmin",
  build: {
    outDir: "admin",
    assetsDir: "",
    sourcemap: false,
    manifest: true,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
