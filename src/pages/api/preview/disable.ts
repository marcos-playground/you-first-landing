import type { APIRoute } from "astro";

import { deletePreviewSessionCookie } from "../../../lib/previewSession";

export const prerender = false;

function getSafeRedirect(request: Request): string {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");

  if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return "/";
  }

  return redirectTo;
}

export const GET: APIRoute = async ({ request, cookies }) => {
  deletePreviewSessionCookie(cookies, request);

  return new Response(null, {
    status: 307,
    headers: {
      Location: getSafeRedirect(request),
    },
  });
};
