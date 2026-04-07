export type PreviewPageRoute = {
  documentType: "homePage" | "servicesPage" | "projectsPage" | "aboutPage" | "contactPage";
  page: "home" | "services" | "projects" | "about" | "contact";
  pathname: string;
  previewPathname: string;
  title: string;
};

export const previewPageRoutes: PreviewPageRoute[] = [
  {
    documentType: "homePage",
    page: "home",
    pathname: "/",
    previewPathname: "/preview",
    title: "Home",
  },
  {
    documentType: "servicesPage",
    page: "services",
    pathname: "/services",
    previewPathname: "/preview/services",
    title: "Services",
  },
  {
    documentType: "projectsPage",
    page: "projects",
    pathname: "/projects",
    previewPathname: "/preview/projects",
    title: "Projects",
  },
  {
    documentType: "aboutPage",
    page: "about",
    pathname: "/about",
    previewPathname: "/preview/about",
    title: "About",
  },
  {
    documentType: "contactPage",
    page: "contact",
    pathname: "/contact",
    previewPathname: "/preview/contact",
    title: "Contact",
  },
];

const previewPathnameByPublicPathname = new Map(
  previewPageRoutes.map((route) => [route.pathname, route.previewPathname]),
);

export function getPreviewRouteBySlug(slug?: string): PreviewPageRoute | undefined {
  const pathname = slug ? `/preview/${slug}` : "/preview";
  return previewPageRoutes.find((route) => route.previewPathname === pathname);
}

export function getPreviewRouteByDocumentType(type: string): PreviewPageRoute | undefined {
  return previewPageRoutes.find((route) => route.documentType === type);
}

export function toPreviewPathname(pathname: string): string {
  if (pathname === "/") {
    return "/preview";
  }

  if (pathname.startsWith("/preview")) {
    return pathname;
  }

  return `/preview${pathname}`;
}

export function toVisualEditingHref(href: string, visualEditing: boolean): string {
  if (!visualEditing || !href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const url = new URL(href, "https://you-first.local");

  if (url.pathname.startsWith("/preview")) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  const previewPathname = previewPathnameByPublicPathname.get(url.pathname);

  if (!previewPathname) {
    return href;
  }

  return `${previewPathname}${url.search}${url.hash}`;
}
