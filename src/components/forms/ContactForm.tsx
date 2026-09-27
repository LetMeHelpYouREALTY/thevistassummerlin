'use client';

import { useState, type FormEvent } from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';

const CONTACT_ERROR_PHONE = '(702) 500-0607';

const FAILURE_MESSAGE = `Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at ${CONTACT_ERROR_PHONE}.`;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState('submitting');
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      company: String(formData.get('company') ?? ''),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
        return;
      }

      setFormState('error');
      if (response.status === 400) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(data?.error ?? FAILURE_MESSAGE);
      } else {
        setErrorMessage(FAILURE_MESSAGE);
      }
    } catch {
      setFormState('error');
      setErrorMessage(FAILURE_MESSAGE);
    }
  }

  if (formState === 'success') {
    return (
      <div
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
        role="status"
      >
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message sent</h3>
        <p className="text-gray-700">
          Thank you. Dr. Jan Duffy will get back to you within 24 hours.
        </p>
        <button
          type="button"
          className="mt-6 text-blue-600 font-semibold hover:text-blue-700"
          onClick={() => setFormState('idle')}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
            required
            disabled={formState === 'submitting'}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
            required
            disabled={formState === 'submitting'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
          required
          disabled={formState === 'submitting'}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
          disabled={formState === 'submitting'}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
          required
          disabled={formState === 'submitting'}
          defaultValue=""
        >
          <option value="" disabled>Select a subject</option>
          <option value="buying">I&apos;m interested in buying a home</option>
          <option value="selling">I&apos;m interested in selling my home</option>
          <option value="market-report">I&apos;d like a market report</option>
          <option value="consultation">I&apos;d like to schedule a consultation</option>
          <option value="general">General inquiry</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70 resize-none"
          placeholder="Tell us about your real estate needs..."
          required
          disabled={formState === 'submitting'}
        />
      </div>

      {errorMessage && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
      >
        <MessageCircle className="w-5 h-5" />
        <span>{formState === 'submitting' ? 'Sending…' : 'Send Message'}</span>
      </button>
    </form>
  );
}
