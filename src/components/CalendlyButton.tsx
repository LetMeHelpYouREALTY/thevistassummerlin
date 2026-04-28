'use client';

import { useMemo } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { buildCalendlyUrl, CALENDLY_URL_15MIN } from '@/lib/calendly';

type CalendlyButtonProps = {
  /** Calendly event URL; defaults to 15min from lib/calendly (env-aware). */
  url?: string;
  /** FUB attribution: set per page/CTA (e.g. nav-header, contact-card). */
  utmCampaign?: string;
  label?: string;
  variant?: 'button' | 'link';
  className?: string;
  showIcons?: boolean;
};

function openCalendlyPopup(resolvedUrl: string) {
  const getCalendly = () =>
    (window as Window & {
      Calendly?: { initPopupWidget: (args: { url: string }) => void };
    }).Calendly;

  const calendly = getCalendly();
  if (calendly?.initPopupWidget) {
    calendly.initPopupWidget({ url: resolvedUrl });
    return;
  }

  let tries = 0;
  const id = window.setInterval(() => {
    tries += 1;
    const c = getCalendly();
    if (c?.initPopupWidget) {
      window.clearInterval(id);
      c.initPopupWidget({ url: resolvedUrl });
    } else if (tries >= 100) {
      window.clearInterval(id);
      window.open(resolvedUrl, '_blank', 'noopener,noreferrer');
    }
  }, 50);
}

export function CalendlyButton({
  url,
  utmCampaign,
  label = 'Schedule time with me',
  variant = 'button',
  className,
  showIcons = true,
}: CalendlyButtonProps) {
  const resolvedUrl = useMemo(
    () =>
      buildCalendlyUrl(url ?? CALENDLY_URL_15MIN, {
        utm_campaign: utmCampaign,
      }),
    [url, utmCampaign]
  );

  const open = () => openCalendlyPopup(resolvedUrl);

  if (variant === 'link') {
    return (
      <a
        href={resolvedUrl}
        className={
          className ??
          'text-inherit underline decoration-white/50 underline-offset-4 transition-colors hover:text-link-blue hover:decoration-link-blue'
        }
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        {label}
      </a>
    );
  }

  const btnClass =
    className ??
    'w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2';

  return (
    <button className={btnClass} onClick={open} type="button">
      {showIcons ? <Calendar className="w-5 h-5" aria-hidden /> : null}
      <span>{label}</span>
      {showIcons ? <ArrowRight className="w-5 h-5" aria-hidden /> : null}
    </button>
  );
}
