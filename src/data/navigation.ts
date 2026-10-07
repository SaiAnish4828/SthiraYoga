import type { IconName } from '@/components/ui/Icons'

export interface NavLink {
  /** Anchor id of the section on the page. */
  id: string
  label: string
  /** Short label used in the mobile drawer if needed. */
  short?: string
}

/**
 * Primary navigation. Every entry scrolls to a section on the single-page
 * site, so the `id` must match a section's `id` attribute.
 */
export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Therapies & Classes', short: 'Therapies' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

/** Anchor of the booking section — wired to every "Book a Class" CTA. */
export const BOOKING_ANCHOR = 'book'

export const cta = {
  primary: 'Book a Class',
  secondary: 'Explore Our Services',
  discover: 'Discover Sthira',
}

export interface WhyItem {
  icon: IconName
  title: string
  text: string
}

export const whySthira: WhyItem[] = [
  {
    icon: 'heart-hand',
    title: 'Personalised Practice',
    text: 'Sessions are shaped around your body, your pace and what you actually want from the practice — never a one-size-fits-all sequence.',
  },
  {
    icon: 'lotus',
    title: 'Holistic Wellness',
    text: 'Movement, breath, mindfulness and gentle therapeutic practices woven together, so the practice supports the whole person.',
  },
  {
    icon: 'people',
    title: 'For All Ages',
    text: 'Practices for children, adults, expecting mothers and senior citizens — each adapted to a different stage of life.',
  },
  {
    icon: 'home',
    title: 'Flexible Sessions',
    text: 'Join us in the studio, invite us home for a house visit, work one-to-one, or attend an online class from your own space.',
  },
  {
    icon: 'sun',
    title: 'A Mindful Environment',
    text: 'A quiet, welcoming room where it is easy to slow down, put the day down, and come back to yourself.',
  },
]

/** Simple, editable "how we work" steps shown in the About section. */
export const approachSteps: { step: string; title: string; text: string }[] = [
  {
    step: '01',
    title: 'Listen first',
    text: 'We begin by understanding where you are — your comfort, your routine and what you are hoping the practice will change.',
  },
  {
    step: '02',
    title: 'Adapt the practice',
    text: 'The sequence, pace and props are chosen for your body and your stage of life, not the other way around.',
  },
  {
    step: '03',
    title: 'Keep it gentle, keep it regular',
    text: 'Small, consistent sessions that fit real life. Nothing extreme, nothing rushed — just steady, sustainable practice.',
  },
]
