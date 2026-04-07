import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schema";
import { singletonSchemaTypes, structure } from "./sanity/structure";

const env = globalThis.process?.env ?? {};
const projectId = env.SANITY_STUDIO_PROJECT_ID ?? env.PUBLIC_SANITY_PROJECT_ID ?? "wkc8eld4";
const dataset = env.SANITY_STUDIO_DATASET ?? env.PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "you-first-construction",
  title: "You First Construction",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((templateItem) => !singletonSchemaTypes.has(templateItem.templateId)),
    actions: (prev, context) =>
      singletonSchemaTypes.has(context.schemaType) ? prev.filter(({ action }) => action !== "duplicate") : prev,
  },
});
