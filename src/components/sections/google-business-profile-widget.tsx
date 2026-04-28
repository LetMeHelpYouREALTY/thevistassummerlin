'use client';

import React from 'react';
import { MapPin, Phone, Clock, Star, MessageCircle, Users, Award, TrendingUp } from 'lucide-react';
import { gbpTelHref, getGbpMapEmbedUrl, getGbpLinks } from '@/lib/gbp';
import { CalendlyButton } from '@/components/CalendlyButton';
export default function GoogleBusinessProfileWidget() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      text: "Dr. Jan Duffy made our dream home purchase seamless. Her knowledge of The Vistas is unmatched!",
      date: "2024-01-15",
      verified: true
    },
    {
      id: 2,
      name: "Michael R.",
      rating: 5,
      text: "Exceptional service and expertise. Found us the perfect home in Santaluz within weeks.",
      date: "2024-01-08",
      verified: true
    },
    {
      id: 3,
      name: "Jennifer L.",
      rating: 5,
      text: "Professional, knowledgeable, and always available. Highly recommend for luxury real estate.",
      date: "2024-01-02",
      verified: true
    }
  ];

  const mapEmbedSrc = getGbpMapEmbedUrl();
  const { directions: directionsUrl, reviews: reviewsUrl } = getGbpLinks();
  const telHref = gbpTelHref();
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-3 text-blue-700 font-medium mb-6 shadow-lg">
            <Star className="w-5 h-5" />
            <span>Google Business Profile</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Local Expertise for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">The Vistas Summerlin</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See why clients choose Dr. Jan Duffy for their luxury real estate needs in The Vistas Summerlin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Business Info Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Business Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a href={telHref} className="text-blue-600 hover:text-blue-700">(702) 500-0607</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Hours</p>
                  <p className="text-gray-600">Daily: 6:00 AM - 9:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">Service Area</p>
                  <p className="text-gray-600">Henderson, Enterprise, Southwest Vegas & More</p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
              <iframe
                title="Google Map - The Vistas Summerlin office"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full"
              />
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-3">
              <a
                href={telHref}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Reviews Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Client Highlights
              </h3>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">Google</span>
                </div>
                <p className="text-sm text-gray-600">View latest profile details</p>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      {review.verified && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                  <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View All Reviews on Google →
              </a>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Performance Stats
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-100">Google Rating</p>
                    <p className="text-2xl font-bold">See Profile</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-100">Customer Reviews</p>
                    <p className="text-2xl font-bold">Live on Google</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-100">Response Time</p>
                    <p className="text-2xl font-bold">Fast Follow-Up</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-blue-100">Consultation</p>
                    <p className="text-2xl font-bold">By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <CalendlyButton
                utmCampaign="gbp-widget-card"
                label="Schedule Consultation"
                showIcons
                className="w-full bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Work with The Vistas Summerlin Expert?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join 150+ families who chose Dr. Jan Duffy for their luxury real estate needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={telHref}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call (702) 500-0607</span>
              </a>
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Message</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
