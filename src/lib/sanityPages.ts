import { sanityClient } from "sanity:client";

export type ButtonLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type PageHero = {
  badge?: string;
  heading: string;
  text?: string;
};

export type CtaBlock = {
  heading: string;
  text?: string;
  primaryButton?: ButtonLink;
  phoneLabel?: string;
  phoneHref?: string;
};

export type ServiceCard = {
  iconKey?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description?: string;
};

export type ProjectCard = {
  title: string;
  category: string;
  location?: string;
  sqft?: string;
  description?: string;
  featured?: boolean;
};

export type ValueCard = {
  num?: string;
  iconKey?: string;
  title: string;
  description?: string;
};

export type MilestoneItem = {
  year: string;
  event: string;
};

export type TextSectionCard = {
  label?: string;
  heading: string;
  text?: string;
};

export type QuoteBlock = {
  quote: string;
  author?: string;
  source?: string;
};

export type ContactInfoCard = {
  iconKey?: string;
  title: string;
  value: string;
  note?: string;
};

export type ServiceAreaItem = {
  label: string;
};

export type FormOption = {
  label: string;
  value: string;
};

export type Seo = {
  title: string;
  description: string;
};

export type PageDocument = {
  seo: Seo;
};

export async function getPage<T extends PageDocument>(type: string): Promise<T> {
  const page = await sanityClient.fetch<T | null>(
    `*[_type == $type && _id == $type][0]`,
    { type },
    { perspective: "published" },
  );

  if (!page) {
    throw new Error(
      `Missing required Sanity singleton document: ${type}. Import sanity/seed/pages.ndjson or create the singleton in Studio before building.`,
    );
  }

  return page;
}
