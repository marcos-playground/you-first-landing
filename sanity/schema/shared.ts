import { defineField, defineType } from "sanity";

export const iconOptions = [
  { title: "Home", value: "home" },
  { title: "Building", value: "building" },
  { title: "Pencil", value: "pencil" },
  { title: "Restoration", value: "restoration" },
  { title: "Commercial", value: "commercial" },
  { title: "Shell", value: "shell" },
  { title: "Briefcase", value: "briefcase" },
  { title: "Star", value: "star" },
  { title: "Droplet", value: "droplet" },
  { title: "Users", value: "users" },
  { title: "Message", value: "message" },
  { title: "Shield", value: "shield" },
  { title: "Lightbulb", value: "lightbulb" },
  { title: "Phone", value: "phone" },
  { title: "Email", value: "email" },
  { title: "Location", value: "location" },
  { title: "Clock", value: "clock" },
];

export const sharedTypes = [
  defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
      defineField({ name: "title", title: "Meta title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({
        name: "description",
        title: "Meta description",
        type: "text",
        rows: 3,
        validation: (Rule) => Rule.required(),
      }),
    ],
  }),
  defineType({
    name: "buttonLink",
    title: "Button Link",
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "href", title: "URL", type: "string", validation: (Rule) => Rule.required() }),
    ],
  }),
  defineType({
    name: "pageHero",
    title: "Page Hero",
    type: "object",
    fields: [
      defineField({ name: "badge", title: "Badge", type: "string" }),
      defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
      defineField({ name: "image", title: "Image", type: "siteImage" }),
    ],
  }),
  defineType({
    name: "siteImage",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe the image for screen readers and SEO.",
      }),
    ],
  }),
  defineType({
    name: "richText",
    title: "Rich Text",
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading 2", value: "h2" },
          { title: "Heading 3", value: "h3" },
          { title: "Heading 4", value: "h4" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Underline", value: "underline" },
            { title: "Code", value: "code" },
          ],
          annotations: [
            defineField({
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
                  validation: (Rule) =>
                    Rule.uri({
                      allowRelative: true,
                      scheme: ["http", "https", "mailto", "tel"],
                    }),
                }),
              ],
            }),
          ],
        },
      },
    ],
  }),
  defineType({
    name: "ctaBlock",
    title: "CTA Block",
    type: "object",
    fields: [
      defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
      defineField({ name: "primaryButton", title: "Primary button", type: "buttonLink" }),
      defineField({ name: "phoneLabel", title: "Phone label", type: "string" }),
      defineField({ name: "phoneHref", title: "Phone link", type: "string" }),
    ],
  }),
  defineType({
    name: "serviceCard",
    title: "Service Card",
    type: "object",
    fields: [
      defineField({
        name: "iconKey",
        title: "Icon",
        type: "string",
        options: { list: iconOptions, layout: "dropdown" },
      }),
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      defineField({ name: "href", title: "Link", type: "string" }),
      defineField({ name: "linkLabel", title: "Link label", type: "string" }),
    ],
  }),
  defineType({
    name: "processStep",
    title: "Process Step",
    type: "object",
    fields: [
      defineField({ name: "step", title: "Step", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    ],
  }),
  defineType({
    name: "projectCard",
    title: "Project Card",
    type: "object",
    fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "category", title: "Category", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "location", title: "Location", type: "string" }),
      defineField({ name: "sqft", title: "Square footage", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      defineField({ name: "image", title: "Image", type: "siteImage" }),
      defineField({ name: "featured", title: "Featured layout", type: "boolean", initialValue: false }),
    ],
  }),
  defineType({
    name: "valueCard",
    title: "Value Card",
    type: "object",
    fields: [
      defineField({ name: "num", title: "Number", type: "string" }),
      defineField({
        name: "iconKey",
        title: "Icon",
        type: "string",
        options: { list: iconOptions, layout: "dropdown" },
      }),
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    ],
  }),
  defineType({
    name: "milestoneItem",
    title: "Milestone",
    type: "object",
    fields: [
      defineField({ name: "year", title: "Year", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "event", title: "Event", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    ],
  }),
  defineType({
    name: "textSectionCard",
    title: "Text Section Card",
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string" }),
      defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
    ],
  }),
  defineType({
    name: "contactInfoCard",
    title: "Contact Info Card",
    type: "object",
    fields: [
      defineField({
        name: "iconKey",
        title: "Icon",
        type: "string",
        options: { list: iconOptions, layout: "dropdown" },
      }),
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "note", title: "Note", type: "string" }),
    ],
  }),
  defineType({
    name: "serviceAreaItem",
    title: "Service Area Item",
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    ],
  }),
  defineType({
    name: "formOption",
    title: "Form Option",
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
    ],
  }),
  defineType({
    name: "optionalImage",
    title: "Optional Image",
    type: "object",
    fields: [
      defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
      defineField({ name: "alt", title: "Alt text", type: "string" }),
    ],
  }),
];
