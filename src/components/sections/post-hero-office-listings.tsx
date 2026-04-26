"use client";

import { useEffect, useRef, useState } from "react";
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
 * first viewport. RealScout listing images/JS are deferred until this section
 * is near the viewport to improve LCP/TBT.
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadWidget, setShouldLoadWidget] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoadWidget(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoadWidget(true);
            obs.disconnect();
            return;
          }
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
              ? "bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 min-h-[28rem]"
              : "bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 min-h-[28rem]"
          }
        >
          {shouldLoadWidget ? (
            <VistasRealScoutOfficeListings
              bandKey={bandKey}
              sort-order={sortOrder}
              listing-status={listingStatus}
              property-types={propertyTypes}
            />
          ) : (
            <div
              className="flex h-[26rem] flex-col items-center justify-center gap-3 text-center"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300/40 dark:bg-white/20" />
              <p className={isDark ? "text-sm text-slate-200" : "text-sm text-slate-500"}>
                Loading live MLS listings…
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
