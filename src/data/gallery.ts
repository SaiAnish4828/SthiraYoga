export interface GalleryImage {
  id: string
  /** Path under `public/`. Drop a photo into the category folder and point here. */
  src: string
  /** Larger version used by the lightbox (falls back to `src`). */
  large?: string
  category: GalleryCategory
  /**
   * Grid span used by the masonry layout: 'tall' occupies an extra row.
   * Change these to re-balance the grid after swapping photos.
   */
  span?: 'tall' | 'normal'
}

export type GalleryCategory =
  | 'All'
  | 'Studio'
  | 'Sessions'
  | 'Meditation'
  | 'Wellness'
  | 'Workshops'

/**
 * ============================================================================
 *  GALLERY
 * ============================================================================
 *
 *  >>>  OWNER: drop your own photos into `public/assets/gallery/<category>/`
 *  (studio, sessions, meditation, wellness, workshops) and point `src` at
 *  the file. Nothing else in the code needs to change.
 *
 *  Example — adding a workshop photo:
 *    1. Save it as `public/assets/gallery/workshops/diwali-2026.jpg`
 *    2. Add an entry below:
 *         { id: 'w1', src: '/assets/gallery/workshops/diwali-2026.jpg',
 *           category: 'Workshops', span: 'tall' },
 *
 *  `All` is a virtual filter that always shows everything — it needs no
 *  folder. Remove an entry to take a photo down; the grid adapts itself.
 *
 *  Recommended: JPEGs around 1200px on the long edge, quality ~80, roughly
 *  100–200 KB each.
 */
export const galleryImages: GalleryImage[] = [
  { id: 'g1', src: '/assets/gallery/studio/gallery-01.jpg', category: 'Studio', span: 'tall' },
  { id: 'g2', src: '/assets/gallery/meditation/gallery-02.jpg', category: 'Meditation' },
  { id: 'g3', src: '/assets/gallery/sessions/gallery-03.jpg', category: 'Sessions' },
  { id: 'g4', src: '/assets/gallery/wellness/gallery-04.jpg', category: 'Wellness' },
  { id: 'g5', src: '/assets/gallery/meditation/gallery-05.jpg', category: 'Meditation' },
  { id: 'g6', src: '/assets/gallery/wellness/gallery-06.jpg', category: 'Wellness' },
  { id: 'g7', src: '/assets/gallery/studio/gallery-07.jpg', category: 'Studio', span: 'tall' },
  { id: 'g8', src: '/assets/gallery/wellness/gallery-08.jpg', category: 'Wellness' },
  { id: 'g9', src: '/assets/gallery/studio/gallery-09.jpg', category: 'Studio', span: 'tall' },
  { id: 'g10', src: '/assets/gallery/studio/gallery-10.jpg', category: 'Studio', span: 'tall' },
  { id: 'g11', src: '/assets/gallery/meditation/gallery-11.jpg', category: 'Meditation' },
  { id: 'g12', src: '/assets/gallery/studio/gallery-12.jpg', category: 'Studio' },
]

export const galleryCategories: GalleryCategory[] = [
  'All',
  'Studio',
  'Sessions',
  'Meditation',
  'Wellness',
  'Workshops',
]

/** Alt text is derived from the category so no per-photo copy is needed. */
export function galleryAlt(image: Pick<GalleryImage, 'category'>): string {
  return `${image.category} practice at Sthira Yoga & Wellness`
}

/** Hero + section imagery — centralised so photos can be swapped in one place. */
export const siteImages = {
  hero: {
    src: '/assets/hero/hero-main.jpg',
    alt: 'A person practising yoga in soft morning light, calm and unhurried',
  },
  intro: {
    src: '/assets/about/intro.jpg',
    alt: 'Warm, softly lit Sthira studio interior with lavender cushions and plants',
  },
  philosophy: {
    src: '/assets/about/philosophy.jpg',
    alt: 'Hands resting gently in a mudra during a seated breathing practice',
  },
  approach: {
    src: '/assets/about/approach.jpg',
    alt: 'An instructor guiding a student through a gentle supported posture',
  },
  booking: {
    src: '/assets/hero/booking.jpg',
    alt: 'Folded blankets, a rolled mat and a small brass bowl in a quiet studio corner',
  },
} as const
