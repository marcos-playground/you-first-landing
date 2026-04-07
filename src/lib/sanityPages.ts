import { sanityClient } from "sanity:client";
import type { QueryOptions } from "@sanity/client";

export type ButtonLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type SanityImage = {
  alt?: string;
  asset?: {
    url?: string;
  };
};

export type FooterLinkColumn = {
  heading?: string;
  links?: ButtonLink[];
};

export type SiteSettings = {
  header?: {
    logo?: SanityImage;
    navLinks?: ButtonLink[];
    cta?: ButtonLink;
  };
  footer?: {
    logo?: SanityImage;
    tagline?: string;
    columns?: FooterLinkColumn[];
    contactHeading?: string;
    contactLines?: string[];
    copyrightText?: string;
  };
};

export const cmsImageFallbackSrc =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

export const defaultSiteSettings: SiteSettings = {
  header: {
    navLinks: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    cta: { href: "/contact", label: "Get a Quote" },
  },
  footer: {
    tagline:
      "Building dreams with integrity since 2000. From blueprints to move-in, we put you first.",
    columns: [
      {
        heading: "Services",
        links: [
          { href: "/services", label: "New Construction" },
          { href: "/services", label: "Remodeling" },
          { href: "/services", label: "Commercial" },
          { href: "/services", label: "Restoration" },
        ],
      },
      {
        heading: "Company",
        links: [
          { href: "/about", label: "Our Story" },
          { href: "/projects", label: "Projects" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
    contactHeading: "Get in Touch",
    contactLines: ["(555) 012-3456", "info@youfirstconstruction.com", "Houston, TX"],
    copyrightText: "{year} You First Construction Inc. All rights reserved.",
  },
};

export type PageHero = {
  badge?: string;
  heading: string;
  text?: string;
  image?: SanityImage;
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
  image?: SanityImage;
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

export type HomePage = PageDocument & {
  hero: {
    badge?: string;
    heading: string;
    text?: string;
    image?: SanityImage;
    primaryButton?: ButtonLink;
    secondaryButton?: ButtonLink;
    stats?: StatItem[];
  };
  services?: {
    badge?: string;
    heading?: string;
    text?: string;
    button?: ButtonLink;
    cards?: ServiceCard[];
  };
  work?: {
    badge?: string;
    heading?: string;
    projects?: ProjectCard[];
    button?: ButtonLink;
  };
  about?: {
    badge?: string;
    heading?: string;
    text?: string;
    secondaryText?: string;
    button?: ButtonLink;
    values?: ValueCard[];
  };
  cta?: CtaBlock;
};

export type ServicesPage = PageDocument & {
  hero: PageHero;
  newConstruction?: {
    label?: string;
    heading?: string;
    text?: string;
    cards?: ServiceCard[];
  };
  remodeling?: {
    label?: string;
    heading?: string;
    text?: string;
    cards?: ServiceCard[];
  };
  process?: {
    badge?: string;
    heading?: string;
    steps?: ProcessStep[];
  };
  cta?: CtaBlock;
};

export type ProjectsPage = PageDocument & {
  hero: PageHero;
  categories?: string[];
  projects?: ProjectCard[];
  cta?: CtaBlock;
};

export type AboutPage = PageDocument & {
  hero: PageHero;
  stats?: StatItem[];
  missionVision?: TextSectionCard[];
  values?: {
    badge?: string;
    heading?: string;
    cards?: ValueCard[];
  };
  timeline?: {
    badge?: string;
    heading?: string;
    milestones?: MilestoneItem[];
  };
  quote?: QuoteBlock;
  cta?: CtaBlock;
};

export type ContactPage = PageDocument & {
  hero: PageHero;
  form?: {
    heading?: string;
    subheading?: string;
    projectTypes?: FormOption[];
    submitLabel?: string;
  };
  infoCards?: ContactInfoCard[];
  serviceArea?: {
    heading?: string;
    areas?: ServiceAreaItem[];
  };
};

export type PageFetchOptions = {
  perspective?: "published" | "drafts";
  resultSourceMap?: false | "withKeyArraySelector";
  stega?: boolean;
  token?: string;
  useCdn?: boolean;
};

const imageProjection = "..., asset->{url}";
const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  ...,
  header{
    ...,
    logo{${imageProjection}},
    navLinks[]{...},
    cta{...}
  },
  footer{
    ...,
    logo{${imageProjection}},
    columns[]{
      ...,
      links[]{...}
    }
  }
}`;
const pageQuery = `*[_type == $type && _id == $type][0]{
  ...,
  hero{
    ...,
    image{${imageProjection}}
  },
  work{
    ...,
    projects[]{
      ...,
      image{${imageProjection}}
    }
  },
  projects[]{
    ...,
    image{${imageProjection}}
  }
}`;

export async function getPage<T extends PageDocument>(
  type: string,
  options: PageFetchOptions = {},
): Promise<T> {
  const {
    perspective = "published",
    resultSourceMap = false,
    stega = false,
    token,
    useCdn = false,
  } = options;
  const visualEditingEnabled = perspective === "drafts" || stega;

  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
    );
  }

  const { result: page } = await sanityClient.fetch<T | null>(
    pageQuery,
    { type },
    {
      filterResponse: false,
      perspective,
      resultSourceMap,
      stega,
      ...(visualEditingEnabled ? { token } : {}),
      useCdn,
    } satisfies QueryOptions,
  );

  if (!page) {
    throw new Error(
      `Missing required Sanity singleton document: ${type}. Import sanity/seed/pages.ndjson or create the singleton in Studio before building.`,
    );
  }

  return page;
}

export async function getSiteSettings(
  options: PageFetchOptions = {},
): Promise<SiteSettings> {
  const {
    perspective = "published",
    resultSourceMap = false,
    stega = false,
    token,
    useCdn = false,
  } = options;
  const visualEditingEnabled = perspective === "drafts" || stega;

  if (visualEditingEnabled && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.",
    );
  }

  const { result: settings } = await sanityClient.fetch<SiteSettings | null>(
    siteSettingsQuery,
    {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap,
      stega,
      ...(visualEditingEnabled ? { token } : {}),
      useCdn,
    } satisfies QueryOptions,
  );

  return settings ?? defaultSiteSettings;
}
