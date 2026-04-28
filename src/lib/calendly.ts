/**
 * Calendly — per-site event URLs and UTM helper for Follow Up Boss attribution.
 * Override in Vercel when event slugs change (see scripts/env.example).
 */

const DEFAULT_HOST = 'https://calendly.com/drjanduffy' as const;

/** 15-minute consult (default for badge, popup, inline). */
export const CALENDLY_URL_15MIN =
  process.env.NEXT_PUBLIC_CALENDLY_15MIN_URL?.trim() || `${DEFAULT_HOST}/15min`;

/** Private tour / showing — use only when that event is intentional. */
export const CALENDLY_URL_SHOWING =
  process.env.NEXT_PUBLIC_CALENDLY_SHOWING_URL?.trim() ||
  `${DEFAULT_HOST}/showing`;

export type CalendlyUtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

/**
 * Append UTM query params. Preserves existing keys on `baseUrl` unless the same key is set here.
 */
export function buildCalendlyUrl(
  baseUrl: string,
  params: CalendlyUtmParams = {}
): string {
  try {
    const u = new URL(baseUrl);
    const source =
      params.utm_source ??
      process.env.NEXT_PUBLIC_CALENDLY_UTM_SOURCE ??
      'thevistassummerlin';
    const medium =
      params.utm_medium ?? process.env.NEXT_PUBLIC_CALENDLY_UTM_MEDIUM ?? 'web';
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', medium);
    if (params.utm_campaign) {
      u.searchParams.set('utm_campaign', params.utm_campaign);
    }
    if (params.utm_content) {
      u.searchParams.set('utm_content', params.utm_content);
    }
    if (process.env.NEXT_PUBLIC_CALENDLY_HIDE_GDPR_BANNER === 'true') {
      u.searchParams.set('hide_gdpr_banner', '1');
    }
    return u.toString();
  } catch {
    return baseUrl;
  }
}
