export const PREVIEW_SESSION_COOKIE_NAME = "__you_first_sanity_preview";

const SESSION_TTL_SECONDS = 60 * 60;

type PreviewCookies = {
  get(name: string): { value: string } | undefined;
  set(
    name: string,
    value: string,
    options: {
      httpOnly: boolean;
      maxAge?: number;
      path: string;
      sameSite: "lax" | "strict" | "none";
      secure: boolean;
    },
  ): void;
  delete(
    name: string,
    options: {
      path: string;
      sameSite: "lax" | "strict" | "none";
      secure: boolean;
    },
  ): void;
};

type PreviewSessionPayload = {
  createdAt: number;
  perspective?: string | null;
  studioOrigin?: string;
};

function getSessionSecret(): string {
  const secret = import.meta.env.SANITY_PREVIEW_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing SANITY_PREVIEW_SESSION_SECRET environment variable.");
  }

  return secret;
}

function base64UrlEncode(value: string): string {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(`${normalized}${padding}`);
}

async function sign(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  const bytes = String.fromCharCode(...new Uint8Array(signature));
  return base64UrlEncode(bytes);
}

function cookieOptions(request: Request) {
  const secure = new URL(request.url).protocol === "https:";

  return {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: "/",
    sameSite: secure ? ("none" as const) : ("lax" as const),
    secure,
  };
}

export async function createPreviewSessionValue(
  payload: Omit<PreviewSessionPayload, "createdAt">,
): Promise<string> {
  const encodedPayload = base64UrlEncode(
    JSON.stringify({
      ...payload,
      createdAt: Date.now(),
    } satisfies PreviewSessionPayload),
  );
  const signature = await sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function getPreviewSession(cookies: PreviewCookies): Promise<PreviewSessionPayload | null> {
  const cookie = cookies.get(PREVIEW_SESSION_COOKIE_NAME);

  if (!cookie?.value) {
    return null;
  }

  const [encodedPayload, signature] = cookie.value.split(".");

  if (!encodedPayload || !signature || signature !== (await sign(encodedPayload))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as PreviewSessionPayload;
    const sessionAgeSeconds = (Date.now() - payload.createdAt) / 1000;

    if (!payload.createdAt || sessionAgeSeconds > SESSION_TTL_SECONDS) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function setPreviewSessionCookie(
  cookies: PreviewCookies,
  request: Request,
  value: string,
): void {
  cookies.set(PREVIEW_SESSION_COOKIE_NAME, value, cookieOptions(request));
}

export function deletePreviewSessionCookie(cookies: PreviewCookies, request: Request): void {
  const { maxAge: _maxAge, ...options } = cookieOptions(request);
  cookies.delete(PREVIEW_SESSION_COOKIE_NAME, options);
}
