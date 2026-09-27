export const FUB_SITE_ID = 'thevistassummerlin.com' as const;

export const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';

export type FubEventType =
  | 'General Inquiry'
  | 'Seller Inquiry'
  | 'Property Inquiry'
  | 'Registration';

export type FubPersonPayload = {
  firstName: string;
  lastName: string;
  emails: { value: string }[];
  phones: { value: string }[];
  tags: string[];
};

export type FubEventPayload = {
  source: string;
  system: string;
  type: FubEventType;
  message: string;
  description: string;
  sourceUrl: string;
  person: FubPersonPayload;
};

export function getFubAuthorizationHeader(apiKey: string): string {
  const token = Buffer.from(`${apiKey}:`, 'utf8').toString('base64');
  return `Basic ${token}`;
}

export function mapContactSubjectToFubType(subject: string): FubEventType {
  if (subject === 'selling') {
    return 'Seller Inquiry';
  }
  return 'General Inquiry';
}

const SUBJECT_LABELS: Record<string, string> = {
  buying: "I'm interested in buying a home",
  selling: "I'm interested in selling my home",
  'market-report': "I'd like a market report",
  consultation: "I'd like to schedule a consultation",
  general: 'General inquiry',
};

export function buildContactFubEvent(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sourceUrl: string;
}): FubEventPayload {
  const subjectLabel = SUBJECT_LABELS[input.subject] ?? input.subject;
  const type = mapContactSubjectToFubType(input.subject);
  const trimmedMessage = input.message.trim();
  const summaryParts = [
    `Subject: ${subjectLabel}`,
    input.phone.trim() ? `Phone: ${input.phone.trim()}` : null,
  ].filter(Boolean);

  const messageBody = [trimmedMessage, ...summaryParts].filter(Boolean).join('\n\n');

  return {
    source: FUB_SITE_ID,
    system: FUB_SITE_ID,
    type,
    message: messageBody,
    description: 'Contact form — /contact',
    sourceUrl: input.sourceUrl,
    person: {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      emails: input.email.trim() ? [{ value: input.email.trim() }] : [],
      phones: input.phone.trim() ? [{ value: input.phone.trim() }] : [],
      tags: [FUB_SITE_ID, 'Contact form'],
    },
  };
}

export type ContactFormBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  sourceUrl?: string;
  /** Honeypot — bots that fill this are rejected silently as success */
  company?: string;
};

export function validateContactFormBody(
  body: ContactFormBody,
): { ok: true; data: ContactFormBody & { firstName: string; lastName: string; message: string; subject: string } } | { ok: false; error: string } {
  const firstName = (body.firstName ?? '').trim();
  const lastName = (body.lastName ?? '').trim();
  const email = (body.email ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const message = (body.message ?? '').trim();
  const subject = (body.subject ?? '').trim();

  const hasName = Boolean(firstName || lastName);
  const hasContact = Boolean(email || phone);

  if (!hasName || !hasContact) {
    return {
      ok: false,
      error: 'Name and either email or phone are required.',
    };
  }

  if (!message) {
    return { ok: false, error: 'Message is required.' };
  }

  if (!subject) {
    return { ok: false, error: 'Subject is required.' };
  }

  return {
    ok: true,
    data: {
      ...body,
      firstName,
      lastName,
      email,
      phone,
      message,
      subject,
    },
  };
}

export async function postFubEvent(
  payload: FubEventPayload,
  options: {
    apiKey: string;
    fetchImpl?: typeof fetch;
  },
): Promise<{ ok: true; status: number } | { ok: false; status: number | null; error: string }> {
  const fetchFn = options.fetchImpl ?? fetch;
  const headers: Record<string, string> = {
    Authorization: getFubAuthorizationHeader(options.apiKey),
    'Content-Type': 'application/json',
    'X-System': FUB_SITE_ID,
  };

  try {
    const response = await fetchFn(FUB_EVENTS_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return { ok: true, status: response.status };
    }

    return {
      ok: false,
      status: response.status,
      error: `Follow Up Boss returned HTTP ${response.status}`,
    };
  } catch {
    return {
      ok: false,
      status: null,
      error: 'Follow Up Boss request failed',
    };
  }
}
