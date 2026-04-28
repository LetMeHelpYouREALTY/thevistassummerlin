'use client';

import { useEffect, useMemo } from 'react';
import { buildCalendlyUrl, CALENDLY_URL_15MIN } from '@/lib/calendly';

type CalendlyBadgeProps = {
  url?: string;
  utmCampaign?: string;
  text?: string;
  color?: string;
  textColor?: string;
};

export function CalendlyBadge({
  url,
  utmCampaign = 'site-badge',
  text = 'Schedule time with me',
  color = '#0069ff',
  textColor = '#ffffff',
}: CalendlyBadgeProps) {
  const resolvedUrl = useMemo(
    () =>
      buildCalendlyUrl(url ?? CALENDLY_URL_15MIN, {
        utm_campaign: utmCampaign,
      }),
    [url, utmCampaign]
  );

  useEffect(() => {
    if (document.querySelector('.calendly-badge-widget')) return;

    let tries = 0;
    const maxTries = 200;
    const id = window.setInterval(() => {
      tries += 1;
      const calendly = (window as Window & {
        Calendly?: {
          initBadgeWidget: (args: {
            url: string;
            text: string;
            color: string;
            textColor: string;
            branding?: boolean;
          }) => void;
        };
      }).Calendly;

      if (!calendly) {
        if (tries >= maxTries) window.clearInterval(id);
        return;
      }

      window.clearInterval(id);
      if (document.querySelector('.calendly-badge-widget')) return;
      calendly.initBadgeWidget({
        url: resolvedUrl,
        text,
        color,
        textColor,
        branding: false,
      });
    }, 100);

    return () => window.clearInterval(id);
  }, [resolvedUrl, text, color, textColor]);

  return null;
}
