'use client';

import Link from 'next/link';
import { ChevronDown, Home as HomeIcon, TrendingUp, Phone, ArrowRight } from 'lucide-react';

/**
 * Hero is LCP-critical: no mount-delayed opacity (was hurting LCP render delay on mobile).
 * Decorative backgrounds are static; avoid animate-pulse in the first viewport for main-thread work.
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark-luxury-bg">
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a1e] to-[#1a0a3a]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-w-[90vw] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-pink-400/10 rounded-full blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-20">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-blue-100 font-medium shadow-lg">
              <span>Dr. Jan Duffy | S.0197614.LLC</span>
            </div>

            <div className="space-y-4">
              <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="block text-white">What&apos;s Your Home Worth</span>
                <span className="block text-[#D4A843]">in The Vistas Summerlin?</span>
              </h1>
            </div>

            <p className="text-xl lg:text-2xl font-light max-w-2xl leading-relaxed text-blue-100">
              I have worked every Vistas subcommunity since 2009. Pricing in Barrington is different from
              Kingwood and Santalina. I will show you where buyers are paying a premium this month.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 py-6">
              <div className="text-center stat-glass-card">
                <div className="stat-value">28</div>
                <div className="stat-label">Subcommunities</div>
              </div>
              <div className="text-center stat-glass-card col-span-2 md:col-span-1">
                <div className="stat-value">2009</div>
                <div className="stat-label">Tracking Vistas Since</div>
              </div>
              <div className="text-center stat-glass-card">
                <div className="stat-value">Now</div>
                <div className="stat-label">Last Updated</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="tel:+17025000607"
                className="btn-primary px-8 py-4 shadow-lg flex items-center justify-center space-x-2 group w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Call Dr. Jan: (702) 500-0607</span>
              </a>

              <Link
                href="/valuation"
                className="btn-secondary px-8 py-4 shadow-lg flex items-center justify-center space-x-2 hover:text-[#D4A843] w-full sm:w-auto"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Get My Vistas Value</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/search"
                className="btn-secondary px-8 py-4 shadow-lg flex items-center justify-center space-x-2 hover:text-[#D4A843] w-full sm:w-auto"
              >
                <span>Browse Vistas Homes</span>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2 text-blue-100 transition-colors group">
                <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Barrington | Kingwood | Santalina | Portofino | Canterra + 23 more</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 transition-shadow duration-300 hover:shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What&apos;s Your Home Worth?</h2>
                <p className="text-gray-600">Get an instant, data-driven estimate</p>
              </div>

              <realscout-home-value
                agent-encoded-id="QWdlbnQtMjI1MDUw"
                placeholder="Enter your address..."
                button-text="Get Home Value"
                class="realscout-hero-widget"
              />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-xl p-3 hover:bg-blue-100 transition-colors">
                    <div className="text-lg font-bold text-blue-600">Local</div>
                    <div className="text-xs text-gray-600">Subcommunity Comps</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 hover:bg-green-100 transition-colors">
                    <div className="text-lg font-bold text-green-600">Fast</div>
                    <div className="text-xs text-gray-600">Seller Follow-up</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 motion-safe:animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      <div className="absolute top-20 right-20 z-10 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-sm">
            <div className="font-bold mb-1">Market Status</div>
            <div className="text-green-300 flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Active & Growing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-20 z-10 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white text-sm">
            <div className="font-bold mb-1">Seller-first strategy</div>
            <div className="text-blue-300">Address-level pricing calls</div>
          </div>
        </div>
      </div>
    </section>
  );
}
