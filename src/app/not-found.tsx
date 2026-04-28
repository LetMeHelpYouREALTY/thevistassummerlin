import Link from "next/link";
import type { Metadata } from "next";
import { GBP_OFFICE_ADDRESS, gbpTelHref } from "@/lib/gbp";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This URL may have moved. Return to The Vistas Summerlin — homes and communities in Las Vegas 89138 with Dr. Jan Duffy.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const tel = gbpTelHref();

  return (
    <main
      className="dark-luxury-bg flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 font-secondary text-white/90"
      aria-labelledby="not-found-heading"
    >
      <div className="max-w-lg text-center">
        <p className="font-primary text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--color-gold)]">
          404
        </p>
        <h1 id="not-found-heading" className="mt-3 font-primary text-h2 text-white">
          Page not found
        </h1>
        <p className="mt-4 text-body text-white/80">
          That link may be outdated or mistyped. Use the shortcuts below or call the office
          for help navigating listings in The Vistas Summerlin.
        </p>

        <p className="mt-6 text-sm text-white/70">
          <span className="sr-only">Office address: </span>
          {GBP_OFFICE_ADDRESS}
          <span className="mx-2 text-white/40" aria-hidden>
            ·
          </span>
          <a href={tel} className="text-link-blue underline-offset-4 hover:underline">
            Call Dr. Jan Duffy
          </a>
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-default bg-link-blue px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-navy"
          >
            Back to home
          </Link>
          <Link
            href="/search"
            className="inline-flex min-h-[44px] items-center justify-center rounded-default border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Search properties
          </Link>
        </div>

        <nav aria-label="Popular destinations" className="mt-10 text-sm">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <li>
              <Link href="/communities" className="text-link-blue underline-offset-4 hover:underline">
                Communities
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-link-blue underline-offset-4 hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/market-analysis" className="text-link-blue underline-offset-4 hover:underline">
                Market analysis
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
