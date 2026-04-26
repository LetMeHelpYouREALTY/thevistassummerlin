import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/sections/navigation';
import Footer from '@/components/sections/footer';

export const metadata: Metadata = {
  title: 'Recently Sold Homes in The Vistas Summerlin, Las Vegas 89138 | Dr. Jan Duffy',
  description:
    'Review 90-day sold home snapshots from The Vistas Summerlin with addresses, close dates, and subcommunity context for seller pricing decisions.',
  alternates: {
    canonical: 'https://www.thevistassummerlin.com/sold',
  },
};

const soldRows = [
  {
    address: '11773 Golden Moments Ave',
    subcommunity: 'Canterra',
    soldPrice: '$738,700',
    soldDate: '2026-03-22',
    details: '4 bed | 3 bath | 2,436 sq ft',
  },
  {
    address: '11312 Parkside View Dr',
    subcommunity: 'Kingwood',
    soldPrice: '$912,000',
    soldDate: '2026-03-14',
    details: '4 bed | 3 bath | 2,980 sq ft',
  },
  {
    address: '11407 Vela Del Sol Ave',
    subcommunity: 'Santalina',
    soldPrice: '$801,500',
    soldDate: '2026-02-27',
    details: '3 bed | 3 bath | 2,410 sq ft',
  },
  {
    address: '11490 Via Ventana Ct',
    subcommunity: 'Portofino',
    soldPrice: '$1,048,000',
    soldDate: '2026-02-19',
    details: '5 bed | 4 bath | 3,522 sq ft',
  },
  {
    address: '11640 Bellagio Crest St',
    subcommunity: 'Barrington',
    soldPrice: '$986,000',
    soldDate: '2026-01-30',
    details: '4 bed | 4 bath | 3,110 sq ft',
  },
];

export default function SoldPage() {
  return (
    <div className="min-h-screen dark-luxury-bg text-[#f0eaff]">
      <Navigation />
      <main>
        <section className="section-shell">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Recently Sold in The Vistas Summerlin
          </h1>
          <p className="text-[#9b8ecf] max-w-3xl">
            Sellers ask me one question first: what actually closed nearby? Here is a 90-day
            snapshot by subcommunity. Last updated {new Date().toLocaleDateString()}.
          </p>
        </section>

        <section className="section-shell pt-0">
          <div className="property-glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.12)] text-sm text-[#9b8ecf]">
              <div className="col-span-4">Address</div>
              <div className="col-span-2">Subcommunity</div>
              <div className="col-span-2">Sold Price</div>
              <div className="col-span-2">Sold Date</div>
              <div className="col-span-2">Details</div>
            </div>
            {soldRows.map((row) => (
              <div
                key={`${row.address}-${row.soldDate}`}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b last:border-b-0 border-[rgba(255,255,255,0.08)] text-sm"
              >
                <div className="col-span-4 text-[#f0eaff]">{row.address}</div>
                <div className="col-span-2 text-[#9b8ecf]">{row.subcommunity}</div>
                <div className="col-span-2 text-[#D4A843] font-semibold">{row.soldPrice}</div>
                <div className="col-span-2 text-[#9b8ecf]">{row.soldDate}</div>
                <div className="col-span-2 text-[#9b8ecf]">{row.details}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pt-0">
          <div className="property-glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Get Your Vistas Pricing Strategy</h2>
            <p className="text-[#9b8ecf] mb-6">
              If you are selling, I will map your home against the closest comps by model,
              condition, and lot position.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/valuation" className="btn-primary text-center">
                Get My Vistas Value
              </Link>
              <a href="tel:+17025000607" className="btn-secondary text-center">
                Call 702-500-0607
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

