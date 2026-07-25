import { theme } from "./src/theme";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

const PRODUCTION_URL =
  "https://eurydia.github.io/project-geometric-transformation-explorer/";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    {
      name: "page-metadata",
      transformIndexHtml: {
        order: "pre",
        handler(html, context) {
          const requestedPath = (context.originalUrl ?? context.path).split(
            /[?#]/,
          )[0];
          const canonicalUrl =
            command === "build" ? PRODUCTION_URL : requestedPath;

          return {
            html: html.replace(
              `href="${PRODUCTION_URL}"`,
              `href="${canonicalUrl}"`,
            ),
            tags: [
              {
                tag: "meta",
                attrs: {
                  name: "theme-color",
                  content: theme.palette.scrapbook.desk,
                },
                injectTo: "head",
              },
            ],
          };
        },
      },
    },
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
  ],
  base: "/project-geometric-transformation-explorer/",
  resolve: { tsconfigPaths: true },
}));
