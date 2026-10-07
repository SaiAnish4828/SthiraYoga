/**
 * ============================================================================
 *  STHIRA YOGA & WELLNESS — CENTRAL SITE CONFIGURATION
 * ============================================================================
 *
 *  >>>  OWNER: EDIT THIS FILE TO UPDATE CONTACT DETAILS  <<<
 *
 *  Everything the site shows about *where to find you* and *how to reach you*
 *  lives here. Change a value, save, and it updates everywhere — navbar,
 *  contact section, footer, WhatsApp button, SEO meta tags and schema.
 *
 *  Values marked `PLACEHOLDER` are temporary and MUST be replaced before the
 *  site goes live.
 */

export const studioInfo = {
  /** Studio / brand name — used in the header, footer, schema and SEO tags. */
  name: 'Sthira Yoga & Wellness',

  /** One-line positioning statement. */
  tagline: 'Find stillness. Build strength. Live better.',

  /** Short brand description — used in the footer and meta description. */
  description:
    'Sthira Yoga & Wellness is a calm, welcoming studio for yoga therapy, pranayama, meditation and mindful movement — with sessions for children, adults, expecting mothers and senior citizens.',

  /** Longer "about" line used where a little more context helps. */
  longDescription:
    'A space dedicated to holistic wellbeing through yoga, therapeutic practices, breathwork, meditation and mindful movement — adapted to every age, body and stage of life.',

  /* -----------------------------------------------------------------------
   *  LOGO
  *  Replace the file at `public/assets/logo/Sthira_logo.png` with your own
   *  logo (SVG, PNG or JPG) and update `src` if the file name changes.
   *  Set `showWordmark: false` if your logo already includes the studio name.
   * --------------------------------------------------------------------- */
  logo: {
    src: '/assets/logo/Sthira_logo.png',
    alt: 'Sthira Yoga & Wellness — lotus emblem',
    /** Displayed height in pixels; width scales automatically. */
    height: 44,
    showWordmark: true,
    /** Small line shown under the name. Set to '' to hide. */
    wordmarkSub: 'Yoga · Therapy · Mindful Living',
  },

  /* -----------------------------------------------------------------------
   *  CONTACT DETAILS  (PLACEHOLDERS — replace before launch)
   * --------------------------------------------------------------------- */

  /** Studio street address. */
  address: {
    line1: '1, 2nd Main Rd, Jagannathan Nagar',
    line2: 'Arumbakkam',
    city: 'Chennai',
    region: 'Tamil Nadu',
    country: 'India',
    /** Full single-line version used by map links + schema. */
    full: '1, 2nd Main Rd, Jagannathan Nagar, Arumbakkam, Chennai, Tamil Nadu 600106',
    /**
     * Google Maps place query / embed id.
     * Once the address is final, set this to the place name or the `place_id`
     * and the contact section will swap the placeholder tile for a real map.
     * Example: 'Sthira Yoga & Wellness Chennai' or 'ChIJa...'
     */
    mapsQuery: 'Sthira Yoga & Wellness, Arumbakkam, Chennai',
    /** Optional direct Google Maps embed `src`. Leave empty to show the placeholder. */
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485.80070257036687!2d80.20562916053862!3d13.073460022822598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526738853cdf69%3A0x2b7d3928d78e9a5b!2sSthira%20Yoga%20%26%20Wellness!5e0!3m2!1sen!2sin!4v1791093772902!5m2!1sen!2sin',
    /** Optional lat/lng for a static "coming soon" pin. */
    lat: 13.0735,
    lng: 80.2056,
  },

  /** Display phone number. */
  phone: '+91 98404 51668',
  /** Dial-able version of the phone number (digits only, with country code). */
  phoneDial: '+919840451668',

  /** WhatsApp number, digits only with country code. */
  whatsapp: '+919840451668',
  /** Prefilled WhatsApp message. */
  whatsappMessage: 'Hello Sthira Yoga & Wellness, I would like to know more about your classes.',

  /** Public email address. */
  email: 'Sthirayogwell@gmail.com',

  /** PLACEHOLDER — Working hours. */
  hours: [
    { days: 'Monday – Friday', time: '6:00 AM – 12:00 PM  ·  4:00 PM – 8:00 PM' },
    { days: 'Saturday', time: '6:00 AM – 1:00 PM' },
    { days: 'Sunday', time: '7:00 AM – 10:00 AM' },
  ],

  /* -----------------------------------------------------------------------
   *  SOCIAL LINKS  (PLACEHOLDERS — '#' renders a disabled state)
   * --------------------------------------------------------------------- */
  social: {
    instagram: 'https://www.instagram.com/yogawithsthira/',
    facebook: 'https://www.facebook.com/p/Sthira-Yoga-and-Wellness-61560563537770/',
    youtube: '#',
  },

  /* -----------------------------------------------------------------------
   *  BOOKING
   * --------------------------------------------------------------------- */
  booking: {
    /**
     * Where the booking form should send data once a backend exists.
     * Leave empty to keep the form in "demo" mode (it validates and shows a
     * confirmation, but nothing is transmitted).
     *
     * Supported: any HTTPS endpoint that accepts JSON POST.
     */
    endpoint: '',
    /** Heading shown above the form. */
    heading: 'Begin Your Practice',
    /** Confirmation shown after a successful submission. */
    successMessage:
      "Thank you for reaching out to Sthira Yoga & Wellness. We'll get back to you shortly.",
  },

  /* -----------------------------------------------------------------------
   *  SEO
   * --------------------------------------------------------------------- */
  seo: {
    title: 'Sthira Yoga & Wellness | Yoga & Holistic Wellness',
    description:
      'Sthira Yoga & Wellness offers yoga therapy, mudra and varma therapy, pranayama, meditation, prenatal, children and senior citizen yoga — in studio, at home or online. Personalised, gentle and mindful practices for every stage of life.',
    url: 'https://www.sthira-yoga.com',
    locale: 'en_IN',
  },

  /** Copyright year shown in the footer. */
  copyrightYear: 2026,
} as const

export type StudioInfo = typeof studioInfo

/* ---------------------------------------------------------------------------
 *  Convenience helpers (import these instead of hand-building URLs)
 * ------------------------------------------------------------------------- */

const digits = (value: string) => value.replace(/[^\d]/g, '')

export const contactLinks = {
  tel: () => `tel:${digits(studioInfo.phoneDial)}`,
  mail: (subject: string = 'Enquiry from the Sthira website') =>
    `mailto:${studioInfo.email}?subject=${encodeURIComponent(subject)}`,
  /** Gmail web/app compose with To + Subject prefilled. Opens in a new tab. */
  gmail: (subject: string = 'Enquiry from the Sthira website') =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(studioInfo.email)}&su=${encodeURIComponent(subject)}`,
  whatsapp: (message: string = studioInfo.whatsappMessage) =>
    `https://wa.me/${digits(studioInfo.whatsapp)}?text=${encodeURIComponent(message)}`,
  maps: () =>
    studioInfo.address.mapsQuery
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          studioInfo.address.mapsQuery || studioInfo.address.full,
        )}`
      : '#',
}

/** True when the studio address is still the "coming soon" placeholder. */
export const hasRealAddress = (): boolean =>
  !studioInfo.address.full.toLowerCase().includes('coming soon')
