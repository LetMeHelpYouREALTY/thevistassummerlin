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

    if (!calendly) return;

    if (document.querySelector('.calendly-badge-widget')) return;

    calendly.initBadgeWidget({
      url,
      text,
      color,
      textColor,
      branding: false,
    });
  }, [url, text, color, textColor]);

  return null;
}
