/**
 * Primary public site origin (https + www) for this property.
 * Set `NEXT_PUBLIC_BASE_URL` in Vercel to match Search Console (usually https://www.thevistassummerlin.com).
 */
const DEFAULT_SITE_URL = "https://www.thevistassummerlin.com" as const;

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Absolute site URL, no trailing slash. Defaults to the production www host.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv) return normalizeBaseUrl(fromEnv);
  return DEFAULT_SITE_URL;
}

/** For cases that must not depend on env (e.g. docs in constants). */
export { DEFAULT_SITE_URL as CANONICAL_SITE_URL };

/**
 * Build an absolute URL for a path. `path` must start with `/` (or is normalized).
 */
export function siteAbsoluteUrl(path: string = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
