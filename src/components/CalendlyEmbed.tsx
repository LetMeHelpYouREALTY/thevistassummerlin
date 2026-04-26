'use client';

type CalendlyEmbedProps = {
  url: string;
  title?: string;
  minHeight?: number;
};

export function CalendlyEmbed({
  url,
  title = 'Schedule a consultation with Dr. Jan Duffy',
  minHeight = 700,
}: CalendlyEmbedProps) {
  const minHeightClass = minHeight >= 700 ? 'min-h-[700px]' : 'min-h-[560px]';

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[rgba(212,168,67,0.25)] bg-white shadow-xl">
      <iframe
        src={url}
        title={title}
        className={`w-full ${minHeightClass}`}
        loading="lazy"
      />
    </div>
  );
}
