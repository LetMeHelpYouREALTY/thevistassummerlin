import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { brandKit } from "@/lib/brand-kit";

/** Default OG/Twitter image (Las Vistas Summerlin hero). */
export const BRAND_OG_DEFAULT_IMAGE = "/subcommunities/IMG_0737.JPG";

export const BRAND_OG_SITE_NAME = `${brandKit.name} | Homes by Dr. Jan Duffy`;

/** Core keyword block merged into page-specific keywords. */
export const BRAND_KEYWORDS_CORE = [
  brandKit.name,
  "Dr. Jan Duffy realtor",
  "Summerlin luxury homes",
  "Las Vegas luxury real estate",
  "Berkshire Hathaway HomeServices Nevada Properties",
  "Vistas Summerlin subcommunities",
] as const;

export function withBrandKeywords(extra: string[]): string[] {
  return [...extra, ...BRAND_KEYWORDS_CORE];
}

export type BrandPageMetadataInput = {
  /** Short title segment; root `layout` template appends site name. */
  title: string;
  description: string;
  /** URL path starting with `/` (e.g. `/contact`). */
  path: string;
  keywords?: string[];
  socialTitle?: string;
  socialDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  robots?: Metadata["robots"];
};

/**
 * Consistent metadata + OG + Twitter + canonical for inner pages.
 * Do not pass full “| The Vistas Summerlin …” titles—use a short segment only.
 */
export function brandPageMetadata(input: BrandPageMetadataInput): Metadata {
  const site = getSiteUrl();
  const path = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const canonical = path === "/" ? site : `${site}${path}`;
  const ogTitle = input.socialTitle ?? input.title;
  const ogDesc = input.socialDescription ?? input.description;
  const image = input.ogImage ?? BRAND_OG_DEFAULT_IMAGE;
  const meta: Metadata = {
    title: input.title,
    description: input.description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    ...(input.robots ? { robots: input.robots } : {}),
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      siteName: BRAND_OG_SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.ogImageAlt ?? `${brandKit.name} — Las Vegas luxury real estate`,
        },
      ],
      locale: "en_US",
      type: input.ogType ?? "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [image],
    },
    alternates: {
      canonical,
    },
  };
  return meta;
}
