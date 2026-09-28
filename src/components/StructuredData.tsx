import React from 'react';
import { JsonLd } from '@/components/json-ld';
import { getSiteUrl } from '@/lib/site-url';

const siteUrl = getSiteUrl();

// E-E-A-T Schema for Real Estate Expertise
export function RealEstateExpertSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "The Vistas Summerlin",
    "alternateName": "Homes by Dr. Jan Duffy",
    "description": "Dr. Jan Duffy is the real estate agent for The Vistas Summerlin in Summerlin West, Las Vegas. She tracks pricing across all 28 Vistas subcommunities and shows sellers recent nearby closings. Office: 11312 Parkside Way, Las Vegas, NV 89138. Open daily 8:00 AM to 8:00 PM. Call or text (702) 500-0607.",
    "url": siteUrl,
    "telephone": "+1-702-500-0607",
    "email": "DrJanSells@TheVistasSummerlin.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11312 Parkside Way",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89138",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.1699",
      "longitude": "-115.1398"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Summerlin West, Las Vegas, NV, USA"
    },
    "serviceType": [
      "Real Estate Sales",
      "Property Valuation",
      "Market Analysis",
      "Buyer Representation",
      "Seller Representation",
      "Investment Consulting"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Real Estate License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Nevada Real Estate Division"
        }
      }
    ],
    "knowsAbout": [
      "The Vistas Summerlin Real Estate",
      "Las Vegas Luxury Homes",
      "Summerlin Master-Planned Community",
      "Nevada Real Estate Market",
      "Property Investment Analysis",
      "Home Valuation",
      "Real Estate Market Trends"
    ],
    "sameAs": [
      siteUrl,
      "https://www.facebook.com/VistasSummerlin",
      "https://www.instagram.com/drjanduffy/",
      "https://www.linkedin.com/showcase/berkshire-hathaway-homeservices-summerlin/",
      "https://www.youtube.com/@DrDuffy",
      "https://twitter.com/drjanduffy",
      "https://www.pinterest.com/DrJanDuffy/"
    ],
    "image": `${siteUrl}/images/dr-jan-duffy.png`,
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Nevada, Las Vegas"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "@id": `${siteUrl}/#dr-jan-duffy`
  };

  return <JsonLd id="real-estate-expert-schema" data={schema} />;
}

// FAQ Schema for common questions
export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is The Vistas Summerlin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Vistas Summerlin is a prestigious master-planned community in Las Vegas featuring luxury homes, world-class amenities, and access to TPC Summerlin golf course. It offers over 28 distinct subcommunities with homes ranging from $800K to over $2.5M."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Dr. Jan Duffy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Jan Duffy is a Las Vegas real estate expert specializing in The Vistas Summerlin with over 12 years of experience. She offers flexible scheduling that works around your lifestyle and provides personalized service for buyers, sellers, and investors."
        }
      },
      {
        "@type": "Question",
        "name": "What are the HOA fees in The Vistas Summerlin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "HOA fees in The Vistas Summerlin typically range from $200 to $400 per month, depending on the specific subcommunity and amenities included."
        }
      },
      {
        "@type": "Question",
        "name": "What schools serve The Vistas Summerlin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Vistas Summerlin is served by Palo Verde High School, Sig Rogich Middle School, and several top-rated elementary schools including Ernest May Elementary."
        }
      },
      {
        "@type": "Question",
        "name": "What amenities are available in The Vistas Summerlin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Vistas Summerlin offers golf course access, community pools, tennis courts, walking trails, parks, and proximity to TPC Summerlin golf course."
        }
      }
    ]
  };

  return <JsonLd id="faq-schema" data={schema} />;
}

/** @deprecated Use RealEstateExpertSchema only — avoids duplicate RealEstateAgent entities. */
export function LocalBusinessSchema() {
  return null;
}

// Real Estate Listing Schema
export function RealEstateListingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": "Luxury Homes in The Vistas Summerlin",
    "description": "Discover luxury homes for sale in The Vistas Summerlin, Las Vegas's premier master-planned community.",
    "url": `${siteUrl}/search`,
    "priceRange": "$800,000 - $2,500,000+",
    "numberOfRooms": "4-6 bedrooms",
    "floorSize": {
      "@type": "QuantitativeValue",
      "minValue": "2500",
      "maxValue": "5000",
      "unitCode": "SQF"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89138",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.1699",
      "longitude": "-115.1398"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Golf Course Access",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Community Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Tennis Courts",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Walking Trails",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Mountain Views",
        "value": true
      }
    ],
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  return <JsonLd id="real-estate-listing-schema" data={schema} />;
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Vistas Summerlin | Homes by Dr. Jan Duffy",
    "description": "Premier real estate services for The Vistas Summerlin luxury community. Expert guidance from Dr. Jan Duffy.",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Vistas Summerlin | Homes by Dr. Jan Duffy",
      "url": siteUrl
    }
  };

  return <JsonLd id="website-schema" data={schema} />;
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Vistas Summerlin | Homes by Dr. Jan Duffy",
    "description": "Premier real estate services specializing in The Vistas Summerlin luxury community.",
    "url": siteUrl,
    "logo": `${siteUrl}/berkshire-hathaway-logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-702-500-0607",
      "contactType": "customer service",
      "email": "DrJanSells@TheVistasSummerlin.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11312 Parkside Way",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89138",
      "addressCountry": "US"
    },
    "sameAs": [
      siteUrl,
      "https://www.facebook.com/VistasSummerlin"
    ]
  };

  return <JsonLd id="organization-schema" data={schema} />;
}

// Community Schema for individual community pages
export function CommunitySchema({ 
  communityName, 
  description, 
  priceRange, 
  homeCount, 
  amenities = [] 
}: {
  communityName: string;
  description: string;
  priceRange: string;
  homeCount: number;
  amenities?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    "name": `${communityName} - The Vistas Summerlin`,
    "description": description,
    "url": `${siteUrl}/communities/${communityName.toLowerCase().replace(/\s+/g, '-')}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89138",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.1699",
      "longitude": "-115.1398"
    },
    "priceRange": priceRange,
    "numberOfUnits": homeCount,
    "amenityFeature": amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    })),
    "isPartOf": {
      "@type": "Place",
      "name": "The Vistas Summerlin"
    }
  };

  return <JsonLd id="community-schema" data={schema} />;
}

// Breadcrumb Schema for navigation
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd id="breadcrumb-schema" data={schema} />;
}

// Property Schema for individual listings
export function PropertySchema({
  address,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  description,
  imageUrl,
  mlsNumber
}: {
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  imageUrl: string;
  mlsNumber?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": address,
    "description": description,
    "url": `${siteUrl}/properties/${address.toLowerCase().replace(/\s+/g, '-')}`,
    "price": price,
    "priceCurrency": "USD",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89138",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.1699",
      "longitude": "-115.1398"
    },
    "numberOfRooms": bedrooms,
    "numberOfBathroomsTotal": bathrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": squareFeet,
      "unitCode": "SQF"
    },
    "image": imageUrl,
    "identifier": mlsNumber ? {
      "@type": "PropertyValue",
      "propertyID": mlsNumber
    } : undefined,
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };

  return <JsonLd id="property-schema" data={schema} />;
}

// Review Schema for testimonials
export function ReviewSchema() {
  // Google review rich results are ineligible for self-authored LocalBusiness/Organization pages.
  // Keep this as a no-op to avoid publishing self-serving aggregateRating/review markup.
  return null;
}

// Service Schema for real estate services
export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "The Vistas Summerlin Real Estate Services",
    "description": "Expert real estate services for The Vistas Summerlin luxury community including buying, selling, and investment consulting with flexible scheduling.",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Dr. Jan Duffy",
      "telephone": "+1-702-500-0607",
      "email": "DrJanSells@TheVistasSummerlin.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Summerlin West, Las Vegas, NV, USA"
    },
    "serviceType": [
      "Real Estate Sales",
      "Property Valuation",
      "Market Analysis",
      "Buyer Representation",
      "Seller Representation",
      "Investment Consulting"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Flexible scheduling that works around YOUR lifestyle - available early mornings, evenings, and weekends"
    }
  };

  return <JsonLd id="service-schema" data={schema} />;
}


// Article Schema with Date Markup for Content Pages
export function ArticleSchema({ 
  title, 
  description, 
  datePublished, 
  dateModified, 
  author = "Dr. Jan Duffy",
  url 
}: { 
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${siteUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Vistas Summerlin",
      "url": siteUrl
    },
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return <JsonLd id="article-schema" data={schema} />;
}