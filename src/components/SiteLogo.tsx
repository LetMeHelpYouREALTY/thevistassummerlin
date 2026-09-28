import Link from "next/link";

export const SITE_LOGO_NAME = "The Vistas Summerlin";
export const SITE_LOGO_BYLINE = "Homes by Dr. Jan Duffy";

type SiteLogoProps = {
  /** `light` sits on the white header. `dark` sits on the footer. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Site wordmark. The name is the logo; the byline is the agent line under it.
 */
export function SiteLogo({ variant = "light", className = "" }: SiteLogoProps) {
  const onDark = variant === "dark";

  return (
    <Link
      href="/"
      className={`group inline-flex max-w-full flex-col leading-none ${className}`}
      title={`${SITE_LOGO_NAME} | ${SITE_LOGO_BYLINE}`}
      aria-label={`${SITE_LOGO_NAME}, ${SITE_LOGO_BYLINE} — home`}
    >
      <span
        className={
          onDark
            ? "font-primary text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#D4A843] sm:text-3xl"
            : "font-primary text-lg font-bold text-primary-navy transition-colors duration-300 group-hover:text-link-blue sm:text-xl lg:text-2xl"
        }
      >
        {SITE_LOGO_NAME}
      </span>
      <span
        className={
          onDark
            ? "mt-1 font-primary text-sm font-semibold text-[#D4A843]"
            : "mt-1 font-primary text-[0.7rem] font-semibold tracking-wide text-[#6b5420] sm:text-xs lg:text-sm"
        }
      >
        {SITE_LOGO_BYLINE}
      </span>
    </Link>
  );
}
