export interface Trainer {
  id: string
  name: string
  /** Path under `public/` — swap the file at this path, no code change needed. */
  image: string
  /** Alt text for the trainer photo. */
  imageAlt: string
  specialization: string
  bio: string
  /** Optional short list of focus areas shown as pills. */
  focus?: string[]
}

/**
 * ============================================================================
 *  TRAINERS
 * ============================================================================
 *  >>>  OWNER: replace `bio` and `specialization` with the real details.  <<<
 *
 *  These bios are intentional placeholders. They deliberately avoid invented
 *  certifications, years of experience, awards or qualifications.
 *
 *  Photos live in `public/assets/trainers/`. Drop in a new file with the same
 *  name (e.g. `uma.jpg`) and it updates everywhere — no code changes.
 */
export const trainers: Trainer[] = [
  {
    id: 'uma',
    name: 'Uma',
    image: '/assets/trainers/uma.jpeg',
    imageAlt: 'Uma, founder and yoga instructor at Sthira Yoga & Wellness',
    specialization: 'Yoga & Wellness',
    bio: 'Yoga instructor focused on creating accessible and mindful practices for students of different needs and experience levels. Uma teaches with patience and warmth, and likes to keep sessions unhurried and easy to follow.',
    focus: ['Yoga Therapy', 'Pranayama', 'One-to-one'],
  },
  {
    id: 'prav',
    name: 'Prav',
    image: '/assets/trainers/prav.jpg',
    imageAlt: 'Prav, yoga instructor at Sthira Yoga & Wellness',
    specialization: 'Yoga & Mindful Movement',
    bio: 'Yoga instructor focused on creating accessible and mindful practices for students of different needs and experience levels. Prav keeps classes steady and encouraging, with plenty of room to rest and ask questions.',
    focus: ['Group Classes', 'Chair Yoga', 'Workshops'],
  }
]

export const founder = {
  name: 'Uma',
  role: 'Founder',
  image: '/assets/founder/uma.jpeg',
  imageAlt: 'Uma, founder of Sthira Yoga & Wellness',
  intro:
    'Uma founded Sthira Yoga & Wellness with a vision of creating a welcoming space where yoga and holistic wellness could become a meaningful part of everyday life.',
  paragraphs: [
    'Her interest in yoga grew quietly, alongside everyday life — and with it the conviction that a practice should fit around a person, rather than the other way around. Sthira was built on that idea: a calm room where beginners, older adults, expecting mothers and children can all find something that suits them.',
    'Sessions at Sthira are gentle, clearly explained and unhurried. Nothing is forced, and nothing is performed. The aim is simply to leave feeling a little steadier than when you arrived.',
  ],
  /** Set to '' to hide the "Learn More About Uma" button. */
  learnMoreLabel: 'Learn More About Uma',
  /**
   * -----------------------------------------------------------------------
   *  FOUNDER DETAILS (modal) —  >>>  OWNER: REPLACE WITH REAL DETAILS  <<<
   * -----------------------------------------------------------------------
   *  This opens in a popup when visitors click "Learn More About Uma".
   *  Everything below is lorem-ipsum placeholder text. To update:
   *    1. Rewrite the `paragraphs` with her real story.
   *    2. Rewrite each `highlights` entry (experience, training,
   *       awards — add or remove entries freely, the popup adapts).
   *  No component changes needed — just edit the strings and save.
   */
  details: {
    heading: 'About Uma',
    paragraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
    ],
    highlights: [
      {
        label: 'Experience',
        text: 'Lorem ipsum — e.g. 10+ years teaching Hatha and Vinyasa across studios and private sessions.',
      },
      {
        label: 'Training & certifications',
        text: 'Lorem ipsum — e.g. 500-hour YTT, prenatal yoga certification, pranayama specialisation.',
      },
      {
        label: 'Awards & recognition',
        text: 'Lorem ipsum — e.g. city wellness award, featured workshops, community outreach honours.',
      },
    ],
  },
} as const
