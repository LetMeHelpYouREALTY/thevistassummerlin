'use client';
import { Calendar, ArrowRight } from 'lucide-react';

export function CalendlyButton({ url }: { url: string }) {
  const openCalendly = () => {
    const calendly = (window as Window & { Calendly?: { initPopupWidget: (args: { url: string }) => void } }).Calendly;

    if (calendly) {
      calendly.initPopupWidget({ url });
      return;
    }

    // Fallback if the external script has not loaded yet.
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
      onClick={openCalendly}
      type="button"
    >
      <Calendar className="w-5 h-5" />
      <span>Schedule with Calendly</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  );
} 