import type { StructureResolver } from "sanity/structure";

const pageDocuments = [
  { id: "homePage", title: "Home", schemaType: "homePage" },
  { id: "servicesPage", title: "Services", schemaType: "servicesPage" },
  { id: "projectsPage", title: "Projects", schemaType: "projectsPage" },
  { id: "aboutPage", title: "About", schemaType: "aboutPage" },
  { id: "contactPage", title: "Contact", schemaType: "contactPage" },
];

const singletonDocuments = [
  { id: "siteSettings", title: "Site Settings", schemaType: "siteSettings" },
  ...pageDocuments,
];

export const singletonSchemaTypes = new Set(singletonDocuments.map((document) => document.schemaType));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("siteSettings")
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site Settings")),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              pageDocuments.map((page) =>
                S.listItem()
                  .id(page.id)
                  .title(page.title)
                  .child(S.document().schemaType(page.schemaType).documentId(page.id).title(page.title)),
              ),
            ),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const schemaType = item.getSchemaType();
        return !schemaType || !singletonSchemaTypes.has(schemaType.name);
      }),
    ]);
