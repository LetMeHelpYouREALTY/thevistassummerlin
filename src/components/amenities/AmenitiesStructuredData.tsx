import { JsonLd } from '@/components/json-ld';
import { getSiteUrl } from '@/lib/site-url';
import {
  CURATED_NEARBY_PLACES,
  VISTAS_COMMUNITY,
} from '@/lib/amenities/community-config';
import { AMENITIES_FAQS } from '@/lib/amenities/page-content';

const siteUrl = getSiteUrl();
const amenitiesUrl = `${siteUrl}/amenities`;

export function AmenitiesFaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AMENITIES_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd id="amenities-faq-schema" data={schema} />;
}

export function AmenitiesBreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Nearby Amenities',
        item: amenitiesUrl,
      },
    ],
  };

  return <JsonLd id="amenities-breadcrumb-schema" data={schema} />;
}

export function AmenitiesPlacesItemListSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Featured places near ${VISTAS_COMMUNITY.name}`,
    itemListElement: CURATED_NEARBY_PLACES.map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': place.schemaType,
        name: place.name,
        url: place.sourceUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: place.address.split(',')[0]?.trim() ?? place.address,
          addressLocality: VISTAS_COMMUNITY.city,
          addressRegion: VISTAS_COMMUNITY.state,
          addressCountry: 'US',
        },
        ...(place.lat != null && place.lng != null
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: place.lat,
                longitude: place.lng,
              },
            }
          : {}),
      },
    })),
  };

  return <JsonLd id="amenities-itemlist-schema" data={schema} />;
}

export function VistasCommunityPlaceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${amenitiesUrl}#vistas-community`,
    name: VISTAS_COMMUNITY.name,
    description:
      'Master-planned residential community in Summerlin, Las Vegas, with multiple Vistas subcommunities.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11312 Parkside Way',
      addressLocality: VISTAS_COMMUNITY.city,
      addressRegion: VISTAS_COMMUNITY.state,
      postalCode: VISTAS_COMMUNITY.postalCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: VISTAS_COMMUNITY.center.lat,
      longitude: VISTAS_COMMUNITY.center.lng,
    },
    containedInPlace: {
      '@type': 'Place',
      name: 'Summerlin, Las Vegas, NV',
    },
  };

  return <JsonLd id="vistas-place-schema" data={schema} />;
}

/** Extends agent areaServed for this community without replacing global RealEstateExpertSchema */
export function AmenitiesAgentAreaSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}/#real-estate-agent`,
    name: 'Dr. Jan Duffy',
    areaServed: {
      '@type': 'Place',
      name: VISTAS_COMMUNITY.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: VISTAS_COMMUNITY.center.lat,
        longitude: VISTAS_COMMUNITY.center.lng,
      },
    },
  };

  return <JsonLd id="amenities-agent-area-schema" data={schema} />;
}
