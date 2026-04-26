"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Buffer } from "buffer";
import { getOfficeListingsPriceBand } from "@/lib/realscout-office-listings-band";

const DEFAULT_AGENT_B64 = "QWdlbnQtMjI1MDUw";
const AGENT_ID = process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID;

export type VistasRealScoutOfficeListingsProps = {
  /** If set, used to pick the price window instead of the current pathname (e.g. tests or embedded contexts). */
  bandKey?: string;
  "sort-order"?: string;
  "listing-status"?: string;
  "property-types"?: string;
};

/**
 * `realscout-office-listings` with a $500K–$1.8M cap and a per-route price window
 * so the footer and each page can show different active listings.
 */
export function VistasRealScoutOfficeListings({
  bandKey,
  "sort-order": sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  "listing-status": listingStatus = "For Sale",
  "property-types": propertyTypes = "SFR,LAL",
}: VistasRealScoutOfficeListingsProps) {
  const pathname = usePathname() ?? "/";
  const { priceMin, priceMax } = useMemo(
    () => getOfficeListingsPriceBand(bandKey ?? pathname),
    [bandKey, pathname]
  );

  const agentEncodedId = useMemo(() => {
    if (!AGENT_ID) {
      return DEFAULT_AGENT_B64;
    }
    return Buffer.from(`Agent-${AGENT_ID}`).toString("base64");
  }, []);

  return React.createElement("realscout-office-listings", {
    "agent-encoded-id": agentEncodedId,
    "sort-order": sortOrder,
    "listing-status": listingStatus,
    "property-types": propertyTypes,
    "price-min": priceMin,
    "price-max": priceMax,
    suppressHydrationWarning: true,
  });
}
