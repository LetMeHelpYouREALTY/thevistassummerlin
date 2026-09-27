import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import {
  buildContactFubEvent,
  getFubAuthorizationHeader,
  mapContactSubjectToFubType,
  postFubEvent,
  validateContactFormBody,
} from './fub';

describe('validateContactFormBody', () => {
  it('rejects an empty object', () => {
    const result = validateContactFormBody({});
    assert.equal(result.ok, false);
  });

  it('accepts name with email', () => {
    const result = validateContactFormBody({
      firstName: 'Jan',
      lastName: 'Duffy',
      email: 'test@example.com',
      subject: 'general',
      message: 'Hello',
    });
    assert.equal(result.ok, true);
  });
});

describe('buildContactFubEvent', () => {
  it('maps selling to Seller Inquiry', () => {
    assert.equal(mapContactSubjectToFubType('selling'), 'Seller Inquiry');
    const event = buildContactFubEvent({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      phone: '',
      subject: 'selling',
      message: 'Sell my home',
      sourceUrl: 'https://www.thevistassummerlin.com/contact',
    });
    assert.equal(event.type, 'Seller Inquiry');
    assert.equal(event.source, 'thevistassummerlin.com');
    assert.deepEqual(event.person.tags, ['thevistassummerlin.com', 'Contact form']);
  });
});

describe('postFubEvent', () => {
  it('succeeds only on 2xx FUB responses', async () => {
    const payload = buildContactFubEvent({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      phone: '',
      subject: 'general',
      message: 'Hi',
      sourceUrl: 'https://www.thevistassummerlin.com/contact',
    });

    const fetchImpl = mock.fn(async () => ({
      status: 201,
    })) as typeof fetch;

    const ok = await postFubEvent(payload, { apiKey: 'test-key', fetchImpl });
    assert.equal(ok.ok, true);

    assert.equal(fetchImpl.mock.calls.length, 1);
    const [, init] = fetchImpl.mock.calls[0].arguments as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    assert.equal(headers.Authorization, getFubAuthorizationHeader('test-key'));
    assert.equal(headers['X-System'], 'thevistassummerlin.com');
  });

  it('returns failure on non-2xx', async () => {
    const payload = buildContactFubEvent({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      phone: '',
      subject: 'general',
      message: 'Hi',
      sourceUrl: 'https://www.thevistassummerlin.com/contact',
    });

    const fetchImpl = mock.fn(async () => ({
      status: 500,
    })) as typeof fetch;

    const result = await postFubEvent(payload, { apiKey: 'test-key', fetchImpl });
    assert.equal(result.ok, false);
    assert.equal(result.status, 500);
  });
});
