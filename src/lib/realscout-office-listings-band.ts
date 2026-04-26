/** Hard bounds for the RealScout `realscout-office-listings` widget (USD). */
export const OFFICE_LISTINGS_USD_MIN = 500_000;
export const OFFICE_LISTINGS_USD_MAX = 1_800_000;

const WINDOW_USD = 400_000;
const SLIDE_STEP_USD = 20_000;

function djb2Hash(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(h) >>> 0;
}

/**
 * Deterministic [price-min, price-max] inside OFFICE_LISTINGS_USD_MIN..MAX so each
 * `key` (usually pathname) surfaces a different slice of the office inventory
 * while staying in the $500K–$1.8M band.
 */
export function getOfficeListingsPriceBand(key: string): {
  priceMin: string;
  priceMax: string;
} {
  const lastStart = OFFICE_LISTINGS_USD_MAX - WINDOW_USD;
  const span = lastStart - OFFICE_LISTINGS_USD_MIN;
  const nSlots = Math.floor(span / SLIDE_STEP_USD) + 1;
  const slot = djb2Hash(key) % nSlots;
  let start = OFFICE_LISTINGS_USD_MIN + slot * SLIDE_STEP_USD;
  let end = start + WINDOW_USD;
  if (end > OFFICE_LISTINGS_USD_MAX) {
    end = OFFICE_LISTINGS_USD_MAX;
    start = Math.max(OFFICE_LISTINGS_USD_MIN, end - WINDOW_USD);
  }
  return { priceMin: String(start), priceMax: String(end) };
}
