import type { ReactNode } from 'react';

/** Server-rendered JSON-LD (not next/script) so crawlers see structured data in initial HTML. */
export function JsonLd({
  id,
  data,
}: {
  id: string;
  data: Record<string, unknown> | object;
}): ReactNode {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
