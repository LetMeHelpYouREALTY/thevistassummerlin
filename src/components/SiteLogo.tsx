import Image from "next/image";
import Link from "next/link";

export const SITE_LOGO_NAME = "The Vistas Summerlin";
export const SITE_LOGO_BYLINE = "Homes by Dr. Jan Duffy";

type SiteLogoProps = {
  /** `light` sits on the white header. `dark` sits on the footer. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Site wordmark. Portrait plus the name, with the agent line under it.
 * The lockup does not wrap, so the header cannot collapse it into the menu.
 */
export function SiteLogo({ variant = "light", className = "" }: SiteLogoProps) {
  const onDark = variant === "dark";

  return (
    <Link
      href="/"
      className={`group inline-flex max-w-none shrink-0 items-center gap-3 whitespace-nowrap leading-none ${className}`}
      title={`${SITE_LOGO_NAME} | ${SITE_LOGO_BYLINE}`}
      aria-label={`${SITE_LOGO_NAME}, ${SITE_LOGO_BYLINE} — home`}
    >
      <Image
        src="/images/dr-jan-duffy.png"
        alt=""
        width={56}
        height={56}
        priority
        className={
          onDark
            ? "h-12 w-12 rounded-full object-cover ring-2 ring-[#D4A843] sm:h-14 sm:w-14"
            : "h-11 w-11 rounded-full object-cover ring-2 ring-[#D4A843] sm:h-14 sm:w-14"
        }
      />
      <span className="flex flex-col items-start">
        <span
          className={
            onDark
              ? "font-primary text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#D4A843] sm:text-2xl"
              : "font-primary text-lg font-bold text-primary-navy transition-colors duration-300 group-hover:text-link-blue sm:text-xl"
          }
        >
          {SITE_LOGO_NAME}
        </span>
        <span
          className={
            onDark
              ? "mt-1 font-primary text-sm font-semibold text-[#D4A843]"
              : "mt-1 font-primary text-xs font-semibold tracking-wide text-[#6b5420] sm:text-sm"
          }
        >
          {SITE_LOGO_BYLINE}
        </span>
      </span>
    </Link>
  );
}
