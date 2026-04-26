'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle, Heart } from 'lucide-react';

const footerLinks = {
  communities: [
    { name: 'All Communities', href: '/communities' },
    { name: 'Barrington', href: '/communities/barrington' },
    { name: 'Kingwood', href: '/communities/kingwood' },
    { name: 'Santalina', href: '/communities/santalina' },
    { name: 'Portofino', href: '/communities/portofino' },
    { name: 'View All Communities', href: '/communities' }
  ],
  services: [
    { name: 'Home Valuation', href: '/valuation' },
    { name: 'Market Reports', href: '/market-reports' },
    { name: 'Property Search', href: '/search' },
    { name: 'Sell Your Home', href: '/sell' },
    { name: 'Community Guide', href: '/community-guide' }
  ],
  resources: [
    { name: 'Blog & News', href: '/blog' },
    { name: 'Market Analysis', href: '/market-analysis' },
    { name: 'Recently Sold', href: '/sold' },
    { name: 'Investment Guide', href: '/investment' },
    { name: 'Featured Property', href: '/properties/11773-golden-moments-avenue' },
    { name: 'About Dr. Jan Duffy', href: '/about' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Sitemap', href: '/sitemap.xml' }
  ]
};

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/RealtorDrJanDuffySummerlin', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/drjanduffy/', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/showcase/berkshire-hathaway-homeservices-summerlin/', icon: Linkedin },
  { name: 'YouTube', href: 'https://www.youtube.com/@DrDuffy', icon: Youtube },
  { name: 'TikTok', href: 'https://www.tiktok.com/@dr.janduffy', icon: MessageCircle },
  { name: 'Twitter', href: 'https://twitter.com/drjanduffy', icon: Twitter },
  { name: 'Pinterest', href: 'https://www.pinterest.com/DrJanDuffy/', icon: Heart },
];

export default function Footer() {
  return (
    <footer className="text-white relative overflow-hidden footer-dark-luxury">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 section-shell">
        {/* Global high-intent MLS lead generator */}
        <section className="mb-12 property-glass-card rounded-3xl p-8 border border-[rgba(212,168,67,0.35)]">
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#f0eaff] mb-3">
              Live MLS Inventory by Dr. Jan Duffy
            </h2>
            <p className="text-[#9b8ecf] max-w-2xl mx-auto">
              Browse active listings across The Vistas Summerlin, then call 702-500-0607 for a subcommunity pricing strategy.
            </p>
          </div>
          {React.createElement('realscout-office-listings', {
            'agent-encoded-id': 'QWdlbnQtMjI1MDUw',
            'sort-order': 'STATUS_AND_SIGNIFICANT_CHANGE',
            'listing-status': 'For Sale',
            'property-types': 'SFR,LAL',
            'price-min': '500000',
            suppressHydrationWarning: true,
          })}
        </section>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">
                The Vistas Summerlin
              </h3>
              <div className="mb-4">
                <p className="text-[#D4A843] font-semibold mb-2">Homes by Dr. Jan Duffy</p>
                <p className="text-sm text-blue-200">Berkshire Hathaway HomeServices Nevada Properties</p>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                I track pricing in all 28 Vistas subcommunities. If you are selling, I will show you the nearby closings and where buyers are negotiating this month.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-300" />
                </div>
                <a href="tel:+17025000607" className="text-blue-100 hover:text-[#D4A843] transition-colors duration-200">
                  Call Dr. Jan: (702) 500-0607
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-300" />
                </div>
                <a href="mailto:DrJanSells@TheVistasSummerlin.com" className="text-blue-100 hover:text-[#D4A843] transition-colors duration-200">
                  DrJanSells@TheVistasSummerlin.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-300" />
                </div>
                <span className="text-blue-100">2827 Paradise Rd, Suite 2, Las Vegas, NV 89109</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent className="w-5 h-5 text-blue-200" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Communities */}
          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-[0.12em] text-[#D4A843]">Communities</h4>
            <ul className="space-y-3">
              {footerLinks.communities.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-[#D4A843] transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-[0.12em] text-[#D4A843]">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-[#D4A843] transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-[0.12em] text-[#D4A843]">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-100 hover:text-[#D4A843] transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-12 py-8 border-t border-white/20">
          <p className="text-blue-100 text-sm text-center">
            Coverage includes Barrington, Kingwood, Santalina, Portofino, Canterra, and 23 additional Vistas subcommunities.
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold mb-4">
              Stay Updated with Market Insights
            </h4>
            <p className="text-blue-100 mb-6">
              Get the latest market updates and property alerts delivered to your inbox.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-200 mb-4 md:mb-0">
              <span className="text-[0.75rem] text-[#6b5f8a]">
                © {new Date().getFullYear()} The Vistas Summerlin. License S.0197614.LLC. Berkshire Hathaway HomeServices Nevada Properties.
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy"
                className="text-blue-200 hover:text-[#D4A843] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-blue-200 hover:text-[#D4A843] transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                href="/sitemap.xml"
                className="text-blue-200 hover:text-[#D4A843] transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}