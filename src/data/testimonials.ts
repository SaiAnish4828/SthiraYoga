export interface Testimonial {
  id: string
  quote: string
  name: string
  /** Optional context line — the kind of class they attend. */
  context?: string
}

/**
 * ============================================================================
 *  TESTIMONIALS  —  ⚠  PLACEHOLDER CONTENT  ⚠
 * ============================================================================
 *
 *  >>>  OWNER: REPLACE ALL OF THESE BEFORE GOING LIVE.  <<<
 *
 *  Every quote below is sample copy written for the design mock-up. They are
 *  NOT genuine customer feedback and must be swapped for real, consented
 *  testimonials from actual students before the site is published.
 *
 *  Suggested replacements for each entry:
 *    - a real quote from a student (with their permission to publish it)
 *    - their first name + initial, or however they wish to be credited
 *    - the class they attend, if they are happy to say
 *
 *  Remove an entry to take a testimonial down; the carousel adapts itself.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'placeholder-1',
    quote:
      'A peaceful and welcoming experience. The sessions helped me become more consistent with my practice.',
    name: 'Priya R.',
    context: 'Weekly group class',
  },
  {
    id: 'placeholder-2',
    quote:
      'I came in stiff and a little nervous about being a complete beginner. Everything was explained slowly, and nobody made me feel out of place.',
    name: 'Arun K.',
    context: 'Chair yoga',
  },
  {
    id: 'placeholder-3',
    quote:
      'The breathing sessions have become the calmest hour of my week. I sleep better on the evenings I go.',
    name: 'Meera S.',
    context: 'Pranayama & meditation',
  },
  {
    id: 'placeholder-4',
    quote:
      'Sessions at home made all the difference for my mother. She looks forward to them, and the instructor always adjusts to how she is feeling that day.',
    name: 'Deepa V.',
    context: 'House visits',
  },
  {
    id: 'placeholder-5',
    quote:
      'Gentle, patient and never rushed. My daughter enjoys the classes and comes home talking about the animal poses.',
    name: 'Karthik N.',
    context: "Children's yoga",
  },
]

/**
 * Flag surfaced in the UI during development so placeholder copy is never
 * mistaken for real feedback. Set to `false` once real testimonials are in.
 */
export const testimonialsArePlaceholders = true
