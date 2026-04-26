/**
 * Google Business Profile (GBP) helpers — NAP and Maps URLs.
 * Use env from Vercel: NEXT_PUBLIC_GBP_PLACE_ID, NEXT_PUBLIC_GBP_WRITEREVIEW_URL, NEXT_PUBLIC_GBP_REVIEWS_DISABLED.
 */
export const GBP_OFFICE_ADDRESS = "11312 Parkside Way, Las Vegas, NV 89138" as const;

const TEL_E164 = "+17025000607" as const;

/**
 * In-client uses `tel:17025000607` to match `href` patterns elsewhere on the site.
 */
export function gbpTelHref() {
  return `tel:${TEL_E164.replace(/\D/g, "")}`;
}

export function getGbpMapEmbedUrl(): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID;
  const q = encodeURIComponent(GBP_OFFICE_ADDRESS);
  if (key && placeId) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=place_id:${placeId}`;
  }
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export function getGbpLinks(): {
  directions: string;
  /** Reviews: write-review when allowed; otherwise maps search / read-only */
  reviews: string;
  reviewsLabel: "Reviews" | "View on Google Maps";
  /** If true, prefer listing view over write-review (verification window) */
  reviewsGated: boolean;
} {
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID;
  const encoded = encodeURIComponent(GBP_OFFICE_ADDRESS);
  const writeReview = process.env.NEXT_PUBLIC_GBP_WRITEREVIEW_URL;
  const reviewsDisabled = process.env.NEXT_PUBLIC_GBP_REVIEWS_DISABLED === "true";

  const directions = placeId
    ? `https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}&destination=${encoded}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;

  const viewOnMaps = placeId
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  const defaultWrite = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : viewOnMaps;

  if (reviewsDisabled) {
    return {
      directions,
      reviews: viewOnMaps,
      reviewsLabel: "View on Google Maps",
      reviewsGated: true,
    };
  }

  return {
    directions,
    reviews: writeReview || defaultWrite,
    reviewsLabel: "Reviews",
    reviewsGated: false,
  };
}
