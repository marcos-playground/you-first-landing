// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sanity({
      projectId: "wkc8eld4",
      dataset: "production",

      useCdn: false,
      apiVersion: "2026-04-06",
      studioBasePath: "/studio",
    }),
  ],
});
