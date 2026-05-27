import { defineField, defineType } from "sanity";

const arrayOf = (type: string) => [{ type }];

export const pageTypes = [
  defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    preview: {
      prepare: () => ({ title: "Home" }),
    },
    fields: [
      defineField({ name: "seo", title: "SEO", type: "seo", validation: (Rule) => Rule.required() }),
      defineField({
        name: "hero",
        title: "Hero",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          defineField({ name: "image", title: "Image", type: "siteImage" }),
          defineField({ name: "primaryButton", title: "Primary button", type: "buttonLink" }),
          defineField({ name: "secondaryButton", title: "Secondary button", type: "buttonLink" }),
          defineField({ name: "stats", title: "Stats", type: "array", of: arrayOf("statItem") }),
        ],
      }),
      defineField({
        name: "services",
        title: "Services Preview",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          defineField({ name: "button", title: "Button", type: "buttonLink" }),
          defineField({ name: "cards", title: "Cards", type: "array", of: arrayOf("serviceCard") }),
        ],
      }),
      defineField({
        name: "work",
        title: "Work Preview",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "projects", title: "Projects", type: "array", of: arrayOf("projectCard") }),
          defineField({ name: "button", title: "Button", type: "buttonLink" }),
        ],
      }),
      defineField({
        name: "about",
        title: "About Preview",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          defineField({ name: "secondaryText", title: "Secondary text", type: "text", rows: 3 }),
          defineField({ name: "button", title: "Button", type: "buttonLink" }),
          defineField({ name: "values", title: "Values", type: "array", of: arrayOf("valueCard") }),
        ],
      }),
      defineField({ name: "cta", title: "CTA", type: "ctaBlock" }),
    ],
  }),
  defineType({
    name: "servicesPage",
    title: "Services Page",
    type: "document",
    preview: {
      prepare: () => ({ title: "Services" }),
    },
    fields: [
      defineField({ name: "seo", title: "SEO", type: "seo", validation: (Rule) => Rule.required() }),
      defineField({ name: "hero", title: "Hero", type: "pageHero", validation: (Rule) => Rule.required() }),
      defineField({
        name: "newConstruction",
        title: "New Construction",
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          defineField({ name: "cards", title: "Cards", type: "array", of: arrayOf("serviceCard") }),
        ],
      }),
      defineField({
        name: "remodeling",
        title: "Remodeling & Restoration",
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          defineField({ name: "cards", title: "Cards", type: "array", of: arrayOf("serviceCard") }),
        ],
      }),
      defineField({
        name: "process",
        title: "Process",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "steps", title: "Steps", type: "array", of: arrayOf("processStep") }),
        ],
      }),
      defineField({ name: "cta", title: "CTA", type: "ctaBlock" }),
    ],
  }),
  defineType({
    name: "projectsPage",
    title: "Projects Page",
    type: "document",
    preview: {
      prepare: () => ({ title: "Projects" }),
    },
    fields: [
      defineField({ name: "seo", title: "SEO", type: "seo", validation: (Rule) => Rule.required() }),
      defineField({ name: "hero", title: "Hero", type: "pageHero", validation: (Rule) => Rule.required() }),
      defineField({ name: "categories", title: "Filter categories", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "projects", title: "Projects", type: "array", of: arrayOf("projectCard") }),
      defineField({ name: "cta", title: "CTA", type: "ctaBlock" }),
    ],
  }),
  defineType({
    name: "aboutPage",
    title: "About Page",
    type: "document",
    preview: {
      prepare: () => ({ title: "About" }),
    },
    fields: [
      defineField({ name: "seo", title: "SEO", type: "seo", validation: (Rule) => Rule.required() }),
      defineField({ name: "hero", title: "Hero", type: "pageHero", validation: (Rule) => Rule.required() }),
      defineField({ name: "stats", title: "Stats", type: "array", of: arrayOf("statItem") }),
      defineField({ name: "missionVision", title: "Mission and Vision", type: "array", of: arrayOf("textSectionCard") }),
      defineField({
        name: "values",
        title: "Values",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "cards", title: "Cards", type: "array", of: arrayOf("valueCard") }),
        ],
      }),
      defineField({
        name: "timeline",
        title: "Journey Section",
        type: "object",
        fields: [
          defineField({ name: "badge", title: "Badge", type: "string" }),
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "content", title: "Content", type: "richText" }),
        ],
      }),
      defineField({ name: "cta", title: "CTA", type: "ctaBlock" }),
    ],
  }),
  defineType({
    name: "contactPage",
    title: "Contact Page",
    type: "document",
    preview: {
      prepare: () => ({ title: "Contact" }),
    },
    fields: [
      defineField({ name: "seo", title: "SEO", type: "seo", validation: (Rule) => Rule.required() }),
      defineField({ name: "hero", title: "Hero", type: "pageHero", validation: (Rule) => Rule.required() }),
      defineField({
        name: "form",
        title: "Form Copy",
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
          defineField({ name: "projectTypes", title: "Project type options", type: "array", of: arrayOf("formOption") }),
          defineField({ name: "submitLabel", title: "Submit label", type: "string" }),
        ],
      }),
      defineField({ name: "infoCards", title: "Info cards", type: "array", of: arrayOf("contactInfoCard") }),
      defineField({
        name: "serviceArea",
        title: "Service Area",
        type: "object",
        fields: [
          defineField({ name: "heading", title: "Heading", type: "string" }),
          defineField({ name: "areas", title: "Areas", type: "array", of: arrayOf("serviceAreaItem") }),
        ],
      }),
    ],
  }),
];
