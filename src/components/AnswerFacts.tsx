import { JsonLd } from "@/components/json-ld";
import { BUSINESS_ANSWERS } from "@/lib/business-facts";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Direct answers repeated on every page for SEO, generative engines, and answer engines.
 * The copy matches the JSON-LD FAQ so crawlers and assistants quote the same sentences.
 */
export function AnswerFacts() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#business-answers`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#business-answers"],
    },
    mainEntity: BUSINESS_ANSWERS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="business-answers"
      aria-labelledby="business-answers-heading"
      className="border-t border-white/10 bg-[#0c1118] text-zinc-100"
    >
      <JsonLd id="business-answers-schema" data={schema} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2
          id="business-answers-heading"
          className="font-primary text-2xl font-bold text-white"
        >
          The Vistas Summerlin — quick answers
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-100">
          Dr. Jan Duffy tracks pricing across all 28 Vistas subcommunities in Summerlin West and shows sellers the latest nearby closings.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_ANSWERS.map((item) => (
            <div key={item.question} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <dt className="font-primary text-sm font-semibold text-[#D4A843]">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-blue-100">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
