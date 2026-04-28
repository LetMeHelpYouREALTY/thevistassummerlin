# Agent context — The Vistas Summerlin

Use this file as the **project-specific** anchor for Cursor Agent / Composer. Global rules in the user’s Cursor settings still apply (NAP per site, RealScout + Calendly, no generic lead forms).

## Stack

- **Next.js** App Router, **TypeScript**, **Tailwind**
- **Deploy:** Vercel; set `NEXT_PUBLIC_BASE_URL` to the live origin (usually `https://www.thevistassummerlin.com`)
- **Node:** Prefer **20.x** locally (matches `package.json` `engines`)

## Single source of truth

- **Site URL:** `src/lib/site-url.ts` (`getSiteUrl`, `siteAbsoluteUrl`)
- **GBP / NAP helpers:** `src/lib/gbp.ts` — office address, `tel:` pattern, Maps/reviews URLs (env: `NEXT_PUBLIC_GBP_*`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)
- **Global chrome:** `src/app/layout.tsx` — `GbpActionStrip`, RealScout script (once, `afterInteractive`, `type="module"`), Calendly `widget.js` (`id="calendly-widget-js"`)
- **Structured data:** `src/components/StructuredData.tsx` (and related)

## Commands

- **Lint:** `npm run lint`
- **Production-like build on Vercel:** `vercel build` (preferred over raw `npm run build` for parity)
- **Dev (Vercel parity when debugging routing/env):** `vercel dev`

## Guardrails

- **Do not edit** `components/idx/*` unless the user explicitly approves (MLS/IDX compliance).
- **Dr. Jan Duffy** — never “Janet”; license **S.0197614.LLC**; brokerage **Berkshire Hathaway HomeServices Nevada Properties** where required by NV practice rules.
- **Lead capture:** RealScout primary; Calendly secondary — avoid new generic `<form>` lead capture.
- **CSP / widgets:** If changing `next.config.mjs` or headers, keep **both** `em.realscout.com` and `www.realscout.com` where RealScout is allowed.

## UX surfaces

- **`src/app/not-found.tsx`** — marketing 404 (theme-aligned, internal links).
- **`src/app/global-error.tsx`** — root error boundary (client).

When adding routes, follow existing patterns under `src/app/(routes)/` and keep metadata unique per `page.tsx`.
