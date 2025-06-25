import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tspath from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tspath(), react()],
  base: "/project-ayw-m2-rotation-calculator/",
});
