// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { loadEnv } from "vite";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const sanityProjectId = env.PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = env.PUBLIC_SANITY_DATASET;

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,

      useCdn: false,
      apiVersion: "2026-04-06",
      studioBasePath: "/studio",
      stega: {
        studioUrl: "/studio",
      },
    }),
  ],
});
