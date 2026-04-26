'use client';

import React from 'react';

const AGENT_ID = process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ID || 'QWdlbnQtMjI1MDUw';

export default function HomeEvaluationSection() {
  return (
    <section id="home-valuation" className="relative overflow-hidden valuation-section-bg">
      <div className="relative z-10 section-shell">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What&apos;s Your Home Worth in The Vistas Summerlin?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Enter your address below to open the live RealScout valuation widget.
          </p>
        </div>

        <div className="max-w-3xl mx-auto valuation-widget-card bg-white rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Instant Home Value</h3>
            <p className="text-gray-600">Live valuation tool powered by current MLS context.</p>
          </div>

          {React.createElement('realscout-home-value', {
            'agent-encoded-id': AGENT_ID,
            class: 'valuation-widget-element',
            suppressHydrationWarning: true,
          })}
        </div>
      </div>
    </section>
  );
}
