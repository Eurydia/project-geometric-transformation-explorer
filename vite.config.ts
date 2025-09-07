import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tspath from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tspath(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  base: "/geometric-transformation-explorer/",
});
