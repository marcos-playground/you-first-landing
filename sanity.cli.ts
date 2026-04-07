import { defineCliConfig } from "sanity/cli";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const projectId =
  env.SANITY_STUDIO_PROJECT_ID ?? env.PUBLIC_SANITY_PROJECT_ID ?? "wkc8eld4";
const dataset =
  env.SANITY_STUDIO_DATASET ?? env.PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
