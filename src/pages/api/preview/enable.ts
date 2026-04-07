import type { APIRoute } from "astro";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { sanityClient } from "sanity:client";

import { toPreviewPathname } from "../../../lib/previewRoutes";
import { createPreviewSessionValue, setPreviewSessionCookie } from "../../../lib/previewSession";

export const prerender = false;

function getSafePreviewRedirect(redirectTo: string | undefined, request: Request): string {
  if (!redirectTo) {
    return "/preview";
  }

  const requestUrl = new URL(request.url);
  const redirectUrl = new URL(redirectTo, requestUrl.origin);

  if (redirectUrl.origin !== requestUrl.origin) {
    return "/preview";
  }

  return `${toPreviewPathname(redirectUrl.pathname)}${redirectUrl.search}${redirectUrl.hash}`;
}

export const GET: APIRoute = async ({ request, cookies }) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (!token) {
    return new Response("Missing SANITY_API_READ_TOKEN environment variable.", { status: 500 });
  }

  if (!import.meta.env.SANITY_PREVIEW_SESSION_SECRET) {
    return new Response("Missing SANITY_PREVIEW_SESSION_SECRET environment variable.", { status: 500 });
  }

  const { isValid, redirectTo, studioOrigin, studioPreviewPerspective } = await validatePreviewUrl(
    sanityClient.withConfig({ token }),
    request.url,
  );

  if (!isValid) {
    return new Response("Invalid Sanity preview secret.", { status: 401 });
  }

  const sessionValue = await createPreviewSessionValue({
    perspective: studioPreviewPerspective,
    studioOrigin,
  });

  setPreviewSessionCookie(cookies, request, sessionValue);

  return new Response(null, {
    status: 307,
    headers: {
      Location: getSafePreviewRedirect(redirectTo, request),
    },
  });
};
