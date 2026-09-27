import { NextRequest, NextResponse } from 'next/server';
import {
  buildContactFubEvent,
  type ContactFormBody,
  FUB_SITE_ID,
  postFubEvent,
  validateContactFormBody,
} from '@/lib/fub';
import { getSiteUrl } from '@/lib/site-url';

function resolveSourceUrl(body: ContactFormBody, request: NextRequest): string {
  const fromClient = (body.sourceUrl ?? '').trim();
  if (fromClient && fromClient.startsWith('http')) {
    return fromClient;
  }
  const referer = request.headers.get('referer');
  if (referer) {
    return referer;
  }
  return `${getSiteUrl()}/contact`;
}

export async function POST(request: NextRequest) {
  let body: ContactFormBody = {};
  try {
    body = (await request.json()) as ContactFormBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (body.company?.trim()) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const validation = validateContactFormBody(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) {
    console.error(
      `[${FUB_SITE_ID}] FOLLOW_UP_BOSS_API_KEY is not configured; contact form cannot send to FUB.`,
    );
    return NextResponse.json(
      { error: 'Lead routing is temporarily unavailable.' },
      { status: 503 },
    );
  }

  const sourceUrl = resolveSourceUrl(body, request);
  const event = buildContactFubEvent({
    firstName: validation.data.firstName,
    lastName: validation.data.lastName,
    email: validation.data.email ?? '',
    phone: validation.data.phone ?? '',
    subject: validation.data.subject,
    message: validation.data.message,
    sourceUrl,
  });

  const result = await postFubEvent(event, { apiKey });

  if (!result.ok) {
    if (result.status !== null) {
      console.error(`[${FUB_SITE_ID}] Follow Up Boss event failed with status ${result.status}`);
    } else {
      console.error(`[${FUB_SITE_ID}] Follow Up Boss event request threw`);
    }
    return NextResponse.json(
      { error: 'Failed to send message to Follow Up Boss.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
