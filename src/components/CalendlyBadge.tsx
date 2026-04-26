'use client';

import { useEffect } from 'react';

type CalendlyBadgeProps = {
  url: string;
  text?: string;
  color?: string;
  textColor?: string;
};

export function CalendlyBadge({
  url,
  text = 'Schedule with Dr. Jan',
  color = '#235D89',
  textColor = '#ffffff',
}: CalendlyBadgeProps) {
  useEffect(() => {
    if (document.querySelector('.calendly-badge-widget')) return;

    let tries = 0;
    const maxTries = 200; // ~20s at 100ms (widget.js may load via lazyOnload)
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
      calendly.initBadgeWidget({ url, text, color, textColor, branding: false });
    }, 100);

    return () => window.clearInterval(id);
  }, [url, text, color, textColor]);

  return null;
}
