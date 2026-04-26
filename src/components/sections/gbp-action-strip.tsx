import { MapPin, Phone, Star } from "lucide-react";
import { gbpTelHref, getGbpLinks } from "@/lib/gbp";

/**
 * Shared Call / Directions / (Reviews or view on Maps) bar for all pages.
 * Renders in the root layout so it appears on every marketing route.
 */
export function GbpActionStrip() {
  const { directions, reviews, reviewsLabel, reviewsGated } = getGbpLinks();
  const tel = gbpTelHref();

  return (
    <nav
      aria-label="Contact and Google Business location"
      className="relative z-40 w-full border-b border-white/10 bg-[#0c1118] text-zinc-100"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-2 py-2 sm:gap-4 sm:px-4">
        <a
          href={tel}
          className="inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/10 sm:flex-initial sm:text-sm"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          <span>Call</span>
        </a>
        <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/10 sm:flex-initial sm:text-sm"
        >
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span>Directions</span>
        </a>
        <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
        <a
          href={reviews}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/10 sm:flex-initial sm:text-sm"
        >
          <Star
            className="h-4 w-4 shrink-0"
            aria-hidden
            fill={reviewsGated ? "none" : "currentColor"}
          />
          <span className="truncate">{reviewsLabel}</span>
        </a>
      </div>
    </nav>
  );
}
