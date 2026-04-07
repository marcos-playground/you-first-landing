import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
  initialValue: {
    header: {
      navLinks: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      cta: { label: "Get a Quote", href: "/contact" },
    },
    footer: {
      tagline:
        "Building dreams with integrity since 2000. From blueprints to move-in, we put you first.",
      columns: [
        {
          heading: "Services",
          links: [
            { label: "New Construction", href: "/services" },
            { label: "Remodeling", href: "/services" },
            { label: "Commercial", href: "/services" },
            { label: "Restoration", href: "/services" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "Our Story", href: "/about" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
      contactHeading: "Get in Touch",
      contactLines: ["(555) 012-3456", "info@youfirstconstruction.com", "Houston, TX"],
      copyrightText: "{year} You First Construction Inc. All rights reserved.",
    },
  },
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        defineField({ name: "logo", title: "Logo", type: "siteImage" }),
        defineField({
          name: "navLinks",
          title: "Navigation links",
          type: "array",
          of: [{ type: "buttonLink" }],
        }),
        defineField({ name: "cta", title: "CTA", type: "buttonLink" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "logo", title: "Logo", type: "siteImage" }),
        defineField({ name: "tagline", title: "Tagline", type: "text", rows: 3 }),
        defineField({
          name: "columns",
          title: "Link columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "heading", title: "Heading", type: "string" }),
                defineField({
                  name: "links",
                  title: "Links",
                  type: "array",
                  of: [{ type: "buttonLink" }],
                }),
              ],
            },
          ],
        }),
        defineField({ name: "contactHeading", title: "Contact heading", type: "string" }),
        defineField({
          name: "contactLines",
          title: "Contact lines",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "copyrightText",
          title: "Copyright text",
          type: "string",
          description: "Use {year} to insert the current year automatically.",
        }),
      ],
    }),
  ],
});
