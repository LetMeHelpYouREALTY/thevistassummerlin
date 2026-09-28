/**
 * Quotable business facts for on-page answers and JSON-LD.
 * Brokerage name and license number are not included here.
 * Those appear only in the footer disclosure.
 */
export const BUSINESS_ANSWERS = [
  {
    question: "Who is the real estate agent for The Vistas Summerlin?",
    answer:
      "Dr. Jan Duffy is the real estate agent for The Vistas Summerlin, Homes by Dr. Jan Duffy, in Las Vegas, Nevada.",
  },
  {
    question: "Where is the office?",
    answer: "The office is at 11312 Parkside Way, Las Vegas, NV 89138.",
  },
  {
    question: "What area does this business serve?",
    answer:
      "The service area is Summerlin West, Las Vegas, Nevada, including all 28 Vistas subcommunities.",
  },
  {
    question: "What is the phone number?",
    answer: "Call or text Dr. Jan Duffy at (702) 500-0607.",
  },
  {
    question: "What are the business hours?",
    answer: "Open daily from 8:00 AM to 8:00 PM.",
  },
] as const;

export const BUSINESS_HOURS_LABEL = "Daily, 8:00 AM–8:00 PM";
export const BUSINESS_SERVICE_AREA = "Summerlin West, Las Vegas, NV";
