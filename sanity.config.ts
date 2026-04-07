import { defineConfig } from "sanity";
import { defineDocuments, defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schema";
import { singletonSchemaTypes, structure } from "./sanity/structure";
import { previewPageRoutes } from "./src/lib/previewRoutes";

const env = globalThis.process?.env ?? {};
const projectId = env.SANITY_STUDIO_PROJECT_ID ?? env.PUBLIC_SANITY_PROJECT_ID ?? "wkc8eld4";
const dataset = env.SANITY_STUDIO_DATASET ?? env.PUBLIC_SANITY_DATASET ?? "production";
const previewOrigin = env.SANITY_STUDIO_PREVIEW_ORIGIN;
const previewUrl = {
  initial: previewOrigin ? new URL("/preview", previewOrigin).toString() : "/preview",
  previewMode: {
    enable: "/api/preview/enable",
    disable: "/api/preview/disable",
  },
};
const locations = {
  siteSettings: defineLocations({
    select: { title: "_type" },
    resolve: () => ({
      locations: [{ title: "Site Settings", href: "/preview" }],
    }),
  }),
  ...Object.fromEntries(
    previewPageRoutes.map((route) => [
      route.documentType,
      defineLocations({
        select: { title: "seo.title" },
        resolve: (doc) => ({
          locations: [
            {
              title: doc?.title ?? route.title,
              href: route.previewPathname,
            },
          ],
        }),
      }),
    ]),
  ),
};
const mainDocuments = defineDocuments(
  previewPageRoutes.map((route) => ({
    route: route.previewPathname,
    filter: `_type == "${route.documentType}" && _id == "${route.documentType}"`,
  })),
);

export default defineConfig({
  name: "you-first-construction",
  title: "You First Construction",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl,
      ...(previewOrigin ? { allowOrigins: [previewOrigin, "http://localhost:*"] } : {}),
      resolve: { locations, mainDocuments },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((templateItem) => !singletonSchemaTypes.has(templateItem.templateId)),
    actions: (prev, context) =>
      singletonSchemaTypes.has(context.schemaType) ? prev.filter(({ action }) => action !== "duplicate") : prev,
  },
});
