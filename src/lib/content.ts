import type { LucideIcon } from "lucide-react";
import { TrendingUp, KeyRound, Home, LandPlot } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Verified business details (from gspropertygroup.co.uk)              */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  phoneDisplay: "0121 714 1658",
  phoneHref: "tel:+441217141658",
  email: "info@gspropertygroup.co.uk",
  emailHref: "mailto:info@gspropertygroup.co.uk",
  addressLines: ["Brindley House, 2 Wheeleys Road", "Birmingham, West Midlands", "B15 2LD"],
  privacyUrl: "https://gspropertygroup.co.uk/privacy-policy",
};

export const ACCREDITATIONS = [
  "The Property Ombudsman",
  "Trading Standards Approved Code",
  "Information Commissioner's Office",
  "Deposit Protection Scheme",
  "Residential Landlords Association",
];

/* ------------------------------------------------------------------ */
/* The four audiences                                                  */
/* ------------------------------------------------------------------ */

export type AudienceId = "investor" | "landlord" | "owner" | "landowner";

export interface Audience {
  id: AudienceId;
  number: string;
  title: string;
  navLabel: string;
  selectorLabel: string;
  icon: LucideIcon;
  panelCopy: string;
  panelCta: string;
  image: string;
  imageAlt: string;
  formIntro: string;
  formNote: string;
}

const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const AUDIENCES: Audience[] = [
  {
    id: "investor",
    number: "01",
    title: "Investors",
    navLabel: "Investors",
    selectorLabel: "I'm an Investor",
    icon: TrendingUp,
    panelCopy:
      "Explore property investment and development opportunities with a local partner who understands the market.",
    panelCta: "For Investors",
    image: px(26957421, 900, 1250),
    imageAlt: "Modern brick residential development photographed from street level",
    formIntro:
      "Tell us about your investment interests and we'll arrange an initial conversation about current and upcoming projects.",
    formNote:
      "Whether you're considering active involvement or a more hands-off partnership, we'll explain how we work and answer your questions.",
  },
  {
    id: "landlord",
    number: "02",
    title: "Landlords",
    navLabel: "Landlords",
    selectorLabel: "I'm a Landlord",
    icon: KeyRound,
    panelCopy:
      "Explore property management, portfolio solutions, or options for moving on from rental ownership.",
    panelCta: "For Landlords",
    image: px(9620508, 900, 1250),
    imageAlt: "Brick apartment building with balconies in warm daylight",
    formIntro:
      "Tell us about your property or portfolio and what you'd like to change — management, a sale, or planning an exit.",
    formNote:
      "Tired landlords, tenanted properties and whole portfolios can all be discussed. There's no commitment at this stage.",
  },
  {
    id: "owner",
    number: "03",
    title: "Property Owners",
    navLabel: "Property Owners",
    selectorLabel: "I Want to Sell a Property",
    icon: Home,
    panelCopy:
      "Considering selling? Discuss your property and explore a potential route that suits your circumstances.",
    panelCta: "For Property Owners",
    image: px(39060777, 900, 1250),
    imageAlt: "Red-brick house with a bay window on a quiet residential street",
    formIntro:
      "Share a few details about your property and your preferred timescale, and we'll talk through the options available.",
    formNote:
      "Residential and commercial property considered, including homes that need refurbishment. We'll explain every step clearly.",
  },
  {
    id: "landowner",
    number: "04",
    title: "Landowners",
    navLabel: "Landowners",
    selectorLabel: "I Own Land",
    icon: LandPlot,
    panelCopy:
      "Discover how a development partnership could help you explore your land's potential.",
    panelCta: "For Landowners",
    image: px(31125307, 900, 1250),
    imageAlt: "Aerial view of green fields and farmland in the English countryside",
    formIntro:
      "Tell us where your land is and anything you know about its current status, and we'll discuss whether it may have development potential.",
    formNote:
      "A development partnership can allow you to explore potential without funding or managing the development yourself, subject to agreed terms.",
  },
];

export const IMAGES = {
  hero: px(11935244, 2000, 1350),
  heroAlt: "Elegant Victorian terraced houses on a tree-lined British residential street",
  trustMain: px(7244476, 1250, 950),
  trustMainAlt: "Narrowboat moored on a calm city canal between brick buildings",
  trustSecondary: px(11935240, 760, 980),
  trustSecondaryAlt: "Terraced houses overlooking a green in soft daylight",
  finalCta: px(29579462, 2000, 1150),
  finalCtaAlt: "A row of Georgian terrace houses with classical detailing",
};

/* ------------------------------------------------------------------ */
/* Audience detail sections — deep dives linked from the header menu   */
/* ------------------------------------------------------------------ */

export interface AudienceDetail {
  id: AudienceId;
  /** Section anchor that the header menu links to. */
  sectionId: string;
  number: string;
  eyebrow: string;
  headingPlain: string;
  headingAccent: string;
  headingTail?: string;
  copy: string;
  points: string[];
  caption: string;
  primaryCta: string;
  secondaryCta: string;
  /** Section background tone, alternating to keep the rhythm coherent. */
  tone: "warm-white" | "parchment" | "cream" | "dark";
  /** Image appears before the copy in the source order (left on desktop). */
  imageFirst?: boolean;
  image: string;
  imageAlt: string;
}

const landscape = (id: number) => px(id, 1200, 900);

export const AUDIENCE_DETAILS: AudienceDetail[] = [
  {
    id: "investor",
    sectionId: "investors",
    number: "01",
    eyebrow: "For Investors",
    headingPlain: "Invest and develop with a",
    headingAccent: "local partner",
    copy:
      "GS Property Group works with investors, funds and joint venture partners on property projects across Birmingham and the West Midlands — from commercial units and conversions to refurbishment and new-build development. Every opportunity is assessed on the principles we have always used: location, the property itself, and tenant or covenant strength.",
    points: [
      "Joint venture opportunities on current and upcoming projects",
      "Commercial units and commercial-to-residential refurbishments",
      "Conversions to HMOs and apartments, plus new-build development",
      "Partner on an active or passive basis — tell us how involved you would like to be",
      "Projects sourced through partners, agents and long-standing local contacts",
    ],
    caption: "Development and conversion projects across the West Midlands",
    primaryCta: "Explore Investment Opportunities",
    secondaryCta: "Discuss a Partnership",
    tone: "warm-white",
    image: landscape(26957421),
    imageAlt: "Modern brick residential development photographed from street level",
  },
  {
    id: "landlord",
    sectionId: "landlords",
    number: "02",
    eyebrow: "For Landlords",
    headingPlain: "Step back from the day-to-day,",
    headingAccent: "on your terms",
    copy:
      "Owning rental property can become draining — particularly with a portfolio, difficult tenancies or changing legislation. Whether you want professional management, a straightforward sale, or a structured way to retire from being a landlord, we will talk through the routes open to you before you decide anything.",
    points: [
      "Professional property management for single properties and portfolios",
      "Selling with tenants in place — no need to wait for vacant possession",
      "Phased portfolio sales structured around your plans, including retirement",
      "A clear comparison of managing versus selling, with no obligation either way",
    ],
    caption: "Management and portfolio solutions for single properties and portfolios",
    primaryCta: "Explore Landlord Solutions",
    secondaryCta: "Discuss My Property",
    imageFirst: true,
    tone: "parchment",
    image: landscape(1571460),
    imageAlt: "Bright, well-kept living room interior with natural daylight",
  },
  {
    id: "owner",
    sectionId: "property-owners",
    number: "03",
    eyebrow: "For Property Owners",
    headingPlain: "A direct, considered",
    headingAccent: "route to selling",
    copy:
      "If you own a house, flat, HMO or commercial property in Birmingham or the West Midlands, we may be able to buy directly from you — including properties that need work. No viewings treadmill, no chain, and no estate-agent fees when you sell to us. We will explain exactly what is possible, and what is not, before you commit to anything.",
    points: [
      "Houses, flats, HMOs and commercial property all considered",
      "Properties needing refurbishment — we buy to renovate and develop",
      "Buy directly from you, cutting out middlemen and agent fees",
      "Time-sensitive circumstances discussed openly, with clear next steps",
    ],
    caption: "Residential and commercial property considered across the region",
    primaryCta: "Explore My Selling Options",
    secondaryCta: "Request a Property Discussion",
    tone: "cream",
    image: landscape(39060777),
    imageAlt: "Residential street with parked cars in the West Midlands",
  },
  {
    id: "landowner",
    sectionId: "landowners",
    number: "04",
    eyebrow: "For Landowners",
    headingPlain: "Explore your",
    headingAccent: "land's potential",
    headingTail: "— without funding the development",
    copy:
      "You do not need to fund or manage a development to find out what your land could achieve. Through a development partnership with GS Property Group, we can assess your land, explore planning and design with appropriately qualified professionals, and — subject to agreed terms — you would not need to fund the development upfront or carry the development risk yourself.",
    points: [
      "Land with or without planning permission considered",
      "Development partnerships with no upfront development funding from you, subject to agreed terms",
      "Delivery through qualified professionals, including RICS, FMB and RIBA-affiliated partners",
      "A straightforward first assessment — just tell us where the land is",
    ],
    caption: "Land with or without planning permission considered",
    primaryCta: "Discuss My Land",
    secondaryCta: "Explore Development Partnerships",
    tone: "dark",
    imageFirst: true,
    image: landscape(1642125),
    imageAlt: "Aerial view of a housing development surrounded by greenery",
  },
];

/* ------------------------------------------------------------------ */
/* FAQs — answers drawn from verified business information             */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "What types of property projects does GS Property Group work with?",
    answer:
      "Our work spans commercial units, commercial-to-residential refurbishment projects, conversions to HMOs and apartments, and the development of new property. We specialise in property sourcing, refurbishment and property management across Birmingham and the West Midlands, and every project is assessed against our core principles of location, the property itself, and tenant or covenant strength.",
  },
  {
    question: "How can I explore a property investment or joint venture?",
    answer:
      "Start with a conversation. We work with local, national and international investors, as well as funds and lenders interested in joint venture opportunities — whether as an active or a more passive partner. Share your investment interests and, if you wish, an indicative budget through our enquiry form, and we'll explain how our partnerships work and discuss whether any current projects may be suitable. Returns are never guaranteed, and we'll always be open about the risks involved.",
  },
  {
    question: "Can you help landlords who want to sell their rental properties?",
    answer:
      "Yes. If you've reached the point where managing rental property no longer suits you — whether because of changing legislation, retirement plans, or simply wanting your time back — we can discuss purchasing your property or portfolio directly, including properties with tenants in place. We can also talk through property management if you'd prefer to keep ownership. The right route depends on your circumstances, which is why we always start with a discussion.",
  },
  {
    question: "Can I discuss selling a property that needs refurbishment?",
    answer:
      "Absolutely. Refurbishment is one of our core specialisms, so a property that needs work is not a barrier to a conversation. We consider residential and commercial property across Birmingham and the West Midlands, and because you would be dealing with us directly, there are no estate agency chains to manage. Tell us about the property and your timescale, and we'll explain the options clearly.",
  },
  {
    question:
      "Can landowners explore development partnerships without funding the development themselves?",
    answer:
      "In many cases, yes. A development partnership can allow you to explore your land's potential without funding or managing the development personally, subject to the site's suitability and agreed terms. We consider development land with or without planning permission. Share the location and approximate size of your land and we'll give you an honest view of whether it may have potential.",
  },
  {
    question: "What information should I provide when making an enquiry?",
    answer:
      "Just the essentials: your contact details and a brief outline of your situation. Investors may find it helpful to mention their interests and an indicative budget; landlords, the location and number of properties; sellers, the property type and preferred timescale; landowners, the land's location, approximate size and planning status if known. The more relevant detail you share, the more useful our first conversation can be — but nothing beyond the basics is required.",
  },
  {
    question: "Am I committing to anything by contacting GS Property Group?",
    answer:
      "No. An enquiry simply starts a conversation. We'll discuss your circumstances, explain the routes that may be available, and set out any proposed next steps clearly. Whether you proceed is entirely your decision, and submitting an enquiry does not guarantee an offer or a particular outcome — that always depends on the property, the project and terms we can agree together.",
  },
];
