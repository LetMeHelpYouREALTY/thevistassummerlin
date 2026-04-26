import React from 'react';

type HomeSearchProps = {
  title?: string;
};

export function HomeSearch({ title = 'Vistas Home Search' }: HomeSearchProps) {
  return (
    <section
      aria-label={title}
      className="property-glass-card rounded-2xl border border-[rgba(212,168,67,0.25)] overflow-hidden"
    >
      <div className="px-6 pt-6 pb-3">
        <h2 className="text-2xl font-semibold text-[#f0eaff]">{title}</h2>
        <p className="text-sm text-[#9b8ecf] mt-2">
          Live MLS inventory by Dr. Jan Duffy. Updated in real time.
        </p>
      </div>
      <iframe
        src="https://drjanduffy.realscout.com/homesearch/agents/QWdlbnQtMjI1MDUw"
        title={title}
        className="w-full h-[800px] bg-white"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
}

