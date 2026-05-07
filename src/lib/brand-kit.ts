/**
 * Canonical brand kit for The Vistas Summerlin (fonts are applied in `layout.tsx` via next/font).
 * Campaign image files are referenced by `fileName`; add assets under `public/brand/campaigns/`
 * to match paths from {@link brandCampaignAssetPath}.
 */
export const brandKit = {
  name: "The Vistas Summerlin",
  overview:
    "The Vistas Summerlin is a specialized real estate service led by Dr. Jan Duffy, focusing on luxury property transactions within Las Vegas's premier master-planned community. The brand provides expert market analysis, data-driven valuations, and personalized guidance for discerning buyers and sellers across 28 distinct subcommunities.",
  websiteUrl: "https://www.thevistassummerlin.com/",
  brandValues: [
    "Local Market Expertise",
    "Data-Informed Strategy",
    "Personalized Service",
    "Flexible Professionalism",
  ] as const,
  visualAesthetics: [
    "Modern Luxury Real Estate",
    "Tech-Forward Authority",
    "Deep Indigo Sophistication",
    "Data-Driven Trust",
    "Sleek Digital Boutique",
  ] as const,
  toneOfVoice: ["Professional", "Authoritative", "Informative", "Reliable"] as const,
  fonts: ["playfair display", "dm sans"] as const,
  campaigns: [
    {
      creatives: [
        { title: "Master the Summerlin Summer.", versions: [{ fileName: "resource_8mig_mMh7YSf3ZUHlNH4WA.png" }] },
        { title: "Beyond the Surface.", versions: [{ fileName: "resource_8aswJ4ljkLj2vUIvJNe4mu.png" }] },
        { title: "Built for the Host.", versions: [{ fileName: "resource_9yb16sS9e8He5KfVSnrOMA.png" }] },
        { title: "Your Summer Legacy.", versions: [{ fileName: "resource_a5QFij4BaWp3Ql6MK6U_Oi.png" }] },
        { title: "The Data of Cool", versions: [{ fileName: "resource_ayIXSdBZ0fGfOBuzR0nkc4.png" }] },
      ],
    },
    {
      creatives: [
        { title: "28 Neighborhoods. 1 Perfect Summer.", versions: [{ fileName: "resource_80RDdbrvnGe6flg0Hb6Ox5.png" }] },
        { title: "Timing Is Everything", versions: [{ fileName: "resource_bSug4g8uA-BbVit0OrS4Zg.png" }] },
        { title: "Expert Data, Personal Fit", versions: [{ fileName: "resource_8MTU4gWTjP61zaoGVU64Pc.png" }] },
        { title: "Your Summer Starts Here", versions: [{ fileName: "resource_9sFxlV__zXm7fN7AiA5k1m.png" }] },
      ],
    },
    {
      creatives: [
        { title: "Your Summerlin Summer Starts Here.", versions: [{ fileName: "resource_9KQ99eOj5Nv12NHkPEkOEd.png" }] },
        { title: "Beyond the Heat.", versions: [{ fileName: "resource_ajcxE5Hs2bX2vK7mwJ6_3b.png" }] },
        { title: "Expertise in Every Detail", versions: [{ fileName: "resource_bPO9vc2ZVgbaRaEaEihkpJ.png" }] },
        { title: "Secure Your Sanctuary", versions: [{ fileName: "resource_9quW-ScDAdpeLwMt58BOdo.png" }] },
      ],
    },
  ],
} as const;

/**
 * Default SERP-focused description: blends brand positioning with established local SEO signals.
 */
export const BRAND_META_DESCRIPTION =
  "The Vistas Summerlin luxury homes from $800K with Dr. Jan Duffy—data-driven valuations, expert market analysis, and personalized guidance across 28 Summerlin subcommunities.";

export type BrandKit = typeof brandKit;

/** Path under `public/brand/campaigns/`. */
export function brandCampaignAssetPath(fileName: string): string {
  return `/brand/campaigns/${fileName}`;
}

/** Flat list of campaign headlines (deduped order as in kit). */
export function getBrandCampaignTitles(): string[] {
  const titles: string[] = [];
  for (const campaign of brandKit.campaigns) {
    for (const c of campaign.creatives) {
      titles.push(c.title);
    }
  }
  return titles;
}
