import type { AmenityCategoryId } from './community-config';

export type AmenityFaq = {
  question: string;
  /** First sentence is AEO-optimized direct answer */
  answer: string;
};

export const AMENITIES_FAQS: AmenityFaq[] = [
  {
    question: 'What grocery stores are near The Vistas Summerlin?',
    answer:
      'Whole Foods Market on South Town Center Drive and Smith\'s Food and Drug on West Charleston Boulevard are common grocery runs from The Vistas. Drive time varies with traffic and which Vistas neighborhood you are in.',
  },
  {
    question: 'How far is The Vistas Summerlin from the Las Vegas Strip?',
    answer:
      'The Vistas sits in west Summerlin, roughly 20–25 miles from the central Strip corridor depending on your route and starting point. Approximate drive time is often 25–40 minutes in typical traffic.',
  },
  {
    question: 'Are there hospitals near The Vistas Summerlin?',
    answer:
      'Summerlin Hospital Medical Center on North Town Center Drive is the closest major hospital campus serving many Vistas residents. Always confirm emergency and specialty services with the facility directly.',
  },
  {
    question: 'Where do Vistas residents shop and dine locally?',
    answer:
      'Downtown Summerlin is the primary walkable retail and restaurant district for the area, with additional options along Charleston Boulevard and Sahara Avenue corridors.',
  },
  {
    question: 'Is golf available near The Vistas Summerlin?',
    answer:
      'TPC Las Vegas in Summerlin and multiple resort courses across the valley are within a short drive of The Vistas. Tee times and membership details vary by course.',
  },
  {
    question: 'What parks and trails are close to The Vistas?',
    answer:
      'Neighborhood parks and trails are woven through The Vistas master plan, and Summerlin Centre Community Park plus Red Rock Canyon National Conservation Area are popular regional outdoor destinations.',
  },
  {
    question: 'Which schools serve The Vistas Summerlin?',
    answer:
      'Assignments depend on your exact address; many Vistas homes feed Clark County School District campuses such as Sig Rogich Middle School and Palo Verde High School. Verify current zoning with CCSD before you buy.',
  },
  {
    question: 'How far is Harry Reid International Airport from The Vistas?',
    answer:
      'Harry Reid International Airport is approximately 18–22 miles from The Vistas depending on route. Plan on roughly 25–45 minutes by car in normal traffic.',
  },
];

export type CategoryCopyBlock = {
  id: AmenityCategoryId;
  title: string;
  paragraphs: string[];
};

export const CATEGORY_COPY: CategoryCopyBlock[] = [
  {
    id: 'restaurants',
    title: 'Dining near The Vistas',
    paragraphs: [
      'Downtown Summerlin concentrates dozens of restaurants—from casual patios to chef-driven spots—within a few miles of most Vistas addresses.',
      'Along Charleston Boulevard and Sahara Avenue you will also find established local favorites and national chains for quick weeknight meals.',
    ],
  },
  {
    id: 'cafes',
    title: 'Cafes & coffee',
    paragraphs: [
      'Coffee shops and bakeries cluster at Downtown Summerlin and along major Summerlin arterials, making meetups and remote-work stops easy from The Vistas.',
    ],
  },
  {
    id: 'grocery',
    title: 'Grocery & everyday errands',
    paragraphs: [
      'Whole Foods Market on South Town Center Drive and Smith\'s Food and Drug on West Charleston Boulevard cover weekly shopping for many households.',
      'Specialty markets and big-box retailers are scattered along the 215 belt corridor for larger hauls.',
    ],
  },
  {
    id: 'parks',
    title: 'Parks & recreation',
    paragraphs: [
      'The Vistas includes neighborhood parks and trail connectors; Summerlin Centre Community Park adds sports fields and playgrounds to the mix.',
      'Red Rock Canyon National Conservation Area is the signature outdoor escape for hiking and scenic drives west of Summerlin.',
    ],
  },
  {
    id: 'golf',
    title: 'Golf',
    paragraphs: [
      'TPC Las Vegas anchors Summerlin\'s tournament-caliber public golf, with additional public and private courses across the west valley.',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    paragraphs: [
      'Summerlin Hospital Medical Center provides inpatient and emergency services on Town Center Drive, with medical offices and urgent care sites throughout Summerlin.',
    ],
  },
  {
    id: 'pharmacies',
    title: 'Pharmacies',
    paragraphs: [
      'Major pharmacy chains operate along Charleston Boulevard, Sahara Avenue, and inside Downtown Summerlin for prescriptions and essentials.',
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping',
    paragraphs: [
      'Downtown Summerlin mixes national retailers, boutiques, and services in a master-planned open-air center designed for Summerlin residents.',
    ],
  },
  {
    id: 'parking',
    title: 'Parking & mobility',
    paragraphs: [
      'Most Vistas homes include garages and driveway parking; retail districts such as Downtown Summerlin provide structured and surface parking for visitors.',
    ],
  },
  {
    id: 'fitness',
    title: 'Fitness',
    paragraphs: [
      'Gyms and boutique studios are located throughout Summerlin, with many residents also using community trails and recreation centers for daily movement.',
    ],
  },
  {
    id: 'schools',
    title: 'Schools',
    paragraphs: [
      'The Vistas falls within Clark County School District boundaries; Palo Verde High School and Sig Rogich Middle School are frequently referenced campuses for west Summerlin.',
      'Confirm your assigned schools with CCSD using your prospective street address.',
    ],
  },
];

export const COMMUTE_COPY = {
  title: 'Commute snapshots (approximate)',
  items: [
    {
      label: 'Downtown Summerlin',
      detail: 'Often 10–20 minutes by car from central Vistas addresses, depending on neighborhood and traffic.',
    },
    {
      label: 'Las Vegas Strip (central corridor)',
      detail: 'Commonly 25–40 minutes by car in typical daytime traffic.',
    },
    {
      label: 'Harry Reid International Airport',
      detail: 'Often 25–45 minutes by car via the 215 belt and I-15 connections.',
    },
    {
      label: 'Summerlin Hospital Medical Center',
      detail: 'Usually within 15–25 minutes for most Vistas neighborhoods.',
    },
  ],
};
