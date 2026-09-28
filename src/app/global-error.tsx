'use client'

import { useEffect } from 'react'
import { AnswerFacts } from '@/components/AnswerFacts'
import { BrokerageDisclosure } from '@/components/BrokerageDisclosure'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-light-gray">
          <div className="text-center p-8">
            <h2 className="text-h2 font-primary font-medium text-text-dark mb-4">
              Something went wrong!
            </h2>
            <p className="text-body font-secondary text-text-light mb-6">
              We&apos;re sorry, but something unexpected happened. Please try again.
            </p>
            <button
              onClick={() => reset()}
              className="bg-link-blue text-white px-6 py-3 rounded-default text-body font-secondary font-medium hover:bg-primary-navy transition-colors duration-300"
            >
              Try again
            </button>
          </div>
        </div>
        <AnswerFacts />
        <BrokerageDisclosure />
      </body>
    </html>
  )
} 