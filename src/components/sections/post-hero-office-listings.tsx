"use client";

import { VistasRealScoutOfficeListings } from "@/components/VistasRealScoutOfficeListings";

export type PostHeroOfficeListingsProps = {
  title: string;
  description: string;
  "sort-order"?: string;
  "listing-status"?: string;
  "property-types"?: string;
  /** Differentiates the price band if multiple instances share one URL (e.g. layout + main). */
  bandKey?: string;
  /** Visual variant: light cards on gray (community), or dark (search-style). */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Placed immediately after the page hero so the RealScout office widget loads below the
 * first viewport and does not compete with the hero for attention.
 */
export function PostHeroOfficeListings({
  title,
  description,
  "sort-order": sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  "listing-status": listingStatus = "For Sale",
  "property-types": propertyTypes = "SFR,LAL",
  bandKey,
  tone = "light",
  className = "",
}: PostHeroOfficeListingsProps) {
  const isDark = tone === "dark";

  return (
    <section
      id="live-mls-office-listings"
      aria-label="Live MLS office listings"
      className={[
        isDark
          ? "py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden"
          : "py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 text-slate-900 border-y border-slate-200/80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isDark ? (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      ) : null}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className={
              isDark
                ? "text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3"
                : "text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3"
            }
          >
            {title}
          </h2>
          <p
            className={
              isDark
                ? "text-slate-200 max-w-2xl mx-auto"
                : "text-slate-600 max-w-2xl mx-auto"
            }
          >
            {description}
          </p>
        </div>
        <div
          className={
            isDark
              ? "bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20"
              : "bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80"
          }
        >
          <VistasRealScoutOfficeListings
            bandKey={bandKey}
            sort-order={sortOrder}
            listing-status={listingStatus}
            property-types={propertyTypes}
          />
        </div>
      </div>
    </section>
  );
}
