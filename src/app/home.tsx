'use client';

import Link from 'next/link';
import OptimizedImage, { BLUR_DATA_URLS } from '@/components/OptimizedImage';
import { realScoutImageUrls } from '@/lib/propertyImages';
import Navigation from '@/components/sections/navigation';
import Hero from '@/components/sections/hero';
import HomeEvaluationSection from '@/components/sections/home-evaluation-v0';
import Footer from '@/components/sections/footer';
import { Phone, MapPin, ArrowRight, Sparkles, TrendingUp, DollarSign, Calendar, Bed, Bath, Square, ExternalLink, ChevronDown } from 'lucide-react';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Home() {
  const faqTeasers = [
    {
      q: 'What is The Vistas Summerlin?',
      a: 'A premier Summerlin master-planned community with luxury neighborhoods, parks, and nearby golf and lifestyle amenities.',
    },
    {
      q: 'How much do homes cost in The Vistas Summerlin?',
      a: 'Pricing varies by neighborhood and home size, with active listings spanning upper-mid to luxury tiers.',
    },
    {
      q: 'Where can I see all communities and listings?',
      a: 'Use the dedicated communities and search pages for the most complete and current inventory.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col font-secondary text-text-light dark-luxury-bg">
      <Navigation />
      <main className="flex-grow">
        <Hero />

        {/* Featured Property Teaser */}
        <section className="text-white relative overflow-hidden dark-luxury-bg">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative section-shell">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-8 py-4 text-yellow-200 font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Sparkles className="w-6 h-6" />
                <span>Featured Property</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent leading-tight">
                Golden Moments Avenue
                <span className="block text-3xl lg:text-4xl mt-4">Canterra Community</span>
              </h2>

              <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
                Discover a move-in-ready home in one of The Vistas Summerlin&apos;s most desirable neighborhoods.
                For full details, photos, and listing updates, visit the dedicated property page.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                <div className="stat-glass-card text-center"><Bed className="w-7 h-7 gold-icon mx-auto mb-2" /><div className="stat-value">4</div><div className="stat-label">Bedrooms</div></div>
                <div className="stat-glass-card text-center"><Bath className="w-7 h-7 gold-icon mx-auto mb-2" /><div className="stat-value">3</div><div className="stat-label">Bathrooms</div></div>
                <div className="stat-glass-card text-center"><Square className="w-7 h-7 gold-icon mx-auto mb-2" /><div className="stat-value">2,500+</div><div className="stat-label">Sq Ft</div></div>
                <div className="stat-glass-card text-center"><DollarSign className="w-7 h-7 gold-icon mx-auto mb-2" /><div className="stat-value">$738K</div><div className="stat-label">Price</div></div>
              </div>
            </div>

            <div className="property-glass-card shadow-2xl overflow-hidden max-w-6xl mx-auto transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-[500px]">
                  <OptimizedImage
                    src={realScoutImageUrls.kitchen}
                    alt="11773 Golden Moments Avenue luxury kitchen in The Vistas Summerlin - Modern black and white design with granite countertops"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URLS.house}
                  />

                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg hover:border-white/80 transition-colors">
                      <OptimizedImage
                        src={realScoutImageUrls.frontExterior}
                        alt="Front exterior of 11773 Golden Moments Avenue"
                        width={64}
                        height={48}
                        className="object-cover w-full h-full"
                        quality={80}
                      />
                    </div>
                    <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg hover:border-white/80 transition-colors">
                      <OptimizedImage
                        src={realScoutImageUrls.livingRoom}
                        alt="Living room with gas fireplace"
                        width={64}
                        height={48}
                        className="object-cover w-full h-full"
                        quality={80}
                      />
                    </div>
                    <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg hover:border-white/80 transition-colors">
                      <OptimizedImage
                        src={realScoutImageUrls.backyard}
                        alt="Huge landscaped backyard perfect for entertaining"
                        width={64}
                        height={48}
                        className="object-cover w-full h-full"
                        quality={80}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <h3 className="text-3xl font-bold mb-2">11773 Golden Moments Avenue</h3>
                      <div className="flex items-center space-x-2 text-blue-100 mb-4">
                        <MapPin className="w-5 h-5" />
                        <span>Canterra - The Vistas Summerlin, Las Vegas, NV 89138</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Bed className="w-4 h-4" />
                          <span>4 bed</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bath className="w-4 h-4" />
                          <span>3 bath</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Square className="w-4 h-4" />
                          <span>2,500+ sq ft</span>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-blue-100">
                        <span className="bg-white/20 px-3 py-1 rounded-full">MLS #2722090</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-12 md:p-12 p-5 bg-[rgba(255,255,255,0.02)] text-[#f0eaff]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#f0eaff] mb-4">Property Snapshot</h3>
                      <p className="text-lg text-[#9b8ecf] leading-relaxed">
                        This featured home offers a practical floor plan, modern finishes, and strong location appeal in Canterra.
                        Explore the full listing page for complete room-by-room details, expanded photos, and current status.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Link
                        href="/properties/11773-golden-moments-avenue"
                        className="btn-primary block w-full text-center py-4 text-lg shadow-xl"
                      >
                        View Dedicated Property Page
                      </Link>
                      <a
                        href="https://drjanduffy.realscout.com/homesearch/listings/p-11773-golden-moments-avenue-las-vegas-89138-glvartrestle-139"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary block w-full text-center py-4 text-lg shadow-xl flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Open Live Listing</span>
                      </a>
                      <a
                        href="tel:+17025000607"
                        className="btn-secondary block w-full text-center py-4 text-lg shadow-lg flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-5 h-5" />
                        <span>Call Dr. Jan Duffy</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Navigation Hub */}
        <section className="relative overflow-hidden dark-luxury-bg">
          <div className="relative section-shell">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#f0eaff] mb-6">
                Explore by Intent
              </h2>
              <p className="text-xl text-[#9b8ecf] max-w-3xl mx-auto">
                Use focused pages for deeper information on communities, active listings, valuation, and agent guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="property-glass-card p-8">
                <h3 className="text-2xl font-bold text-[#f0eaff] mb-4">Communities</h3>
                <p className="text-[#9b8ecf] mb-6">
                  Compare Vistas neighborhoods, amenities, and home styles.
                </p>
                <Link href="/communities" className="btn-secondary">Explore Communities</Link>
              </div>

              <div className="property-glass-card p-8">
                <h3 className="text-2xl font-bold text-[#f0eaff] mb-4">Property Search</h3>
                <p className="text-[#9b8ecf] mb-6">
                  View active inventory and narrow by price, beds, baths, and location.
                </p>
                <Link href="/search" className="btn-secondary">View Listings</Link>
              </div>

              <div className="property-glass-card p-8">
                <h3 className="text-2xl font-bold text-[#f0eaff] mb-4">Agent & Strategy</h3>
                <p className="text-[#9b8ecf] mb-6">
                  Learn Dr. Jan Duffy&apos;s market approach, process, and local expertise.
                </p>
                <Link href="/about" className="btn-secondary">Meet Dr. Jan Duffy</Link>
              </div>
            </div>

            <div className="text-center">
              <div className="property-glass-card rounded-3xl p-12 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6">Start with the Right Next Step</h3>
                <p className="text-xl text-[#9b8ecf] mb-8 max-w-2xl mx-auto">
                  Get buyer support, seller strategy, and neighborhood guidance tailored to The Vistas Summerlin.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/contact" className="btn-primary text-lg">Contact Dr. Jan Duffy</Link>
                  <Link href="/valuation" className="btn-secondary text-lg">Get Home Value</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomeEvaluationSection />

        {/* FAQ Teasers (full answers on /faq) */}
        <section className="dark-luxury-bg">
          <div className="section-shell">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#f0eaff] mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-[#9b8ecf] max-w-3xl mx-auto">
                Quick answers below. For full guidance and expanded detail, visit the dedicated FAQ page.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqTeasers.map((item) => (
                <details key={item.q} className="property-glass-card overflow-hidden group">
                  <summary className="faq-question-row flex items-center justify-between">
                    <span className="faq-question-text">{item.q}</span>
                    <ChevronDown className="w-5 h-5 faq-chevron group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="faq-answer-text">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/faq" className="btn-secondary">
                View All FAQs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActionButton href="tel:+17025000607">
        <Phone className="w-6 h-6" />
      </FloatingActionButton>
      <ScrollToTop />
    </div>
  );
}