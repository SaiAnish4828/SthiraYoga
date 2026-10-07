import type { IconName } from '@/components/ui/Icons'

export interface Service {
  id: string
  name: string
  /** Short line shown on the card. */
  summary: string
  /** Longer copy shown in the detail dialog. */
  detail: string
  icon: IconName
  /** Tag shown as a small pill on the card (optional). */
  tag?: string
  /** Extra note shown inside the detail dialog (e.g. medical guidance). */
  note?: string
}

/**
 * ============================================================================
 *  PRACTICES / THERAPIES
 * ============================================================================
 *  Edit names, summaries and details here. `icon` must be one of the names
 *  exported from `src/components/ui/Icons.tsx`.
 *
 *  Content rule: no medical claims, no promised outcomes. Descriptions stay
 *  supportive and educational.
 */
export const services: Service[] = [
  {
    id: 'yoga-therapy',
    name: 'Yoga Therapy',
    summary:
      'Personalised yoga-based practices designed around your body, your comfort and your everyday wellbeing.',
    detail:
      'Yoga therapy sessions begin with a conversation. From there, a gentle practice is built for you — posture, breath and rest — that fits your current condition and your goals. The pace stays unhurried, and everything can be modified or rested out of at any point. These sessions support general physical and mental wellbeing alongside whatever care you are already receiving.',
    icon: 'lotus',
    tag: 'Most requested',
    note: 'Yoga therapy is a complementary wellbeing practice. Please continue with any medical advice or treatment from your doctor, and let us know about any condition you are managing so we can adapt safely.',
  },
  {
    id: 'mudra-therapy',
    name: 'Mudra Therapy',
    summary:
      'Traditional hand gestures woven into mindful practice to support focus, calm and body awareness.',
    detail:
      'Mudras are traditional hand positions drawn from classical yoga and used as a quiet aid to attention. In these sessions we introduce a small set of mudras, hold them comfortably alongside easy breathing, and explore how they feel. It is a seated, low-intensity practice that works well for people who prefer stillness to movement.',
    icon: 'mudra',
  },
  {
    id: 'house-visits',
    name: 'House Visits',
    summary:
      'Yoga and wellness sessions conducted in the comfort of your own home, at a time that suits you.',
    detail:
      'For anyone who finds it easier to practise at home — because of mobility, caring responsibilities, recovery, or simply because the living room is where you relax — we bring the session to you. Only a mat-sized clear space is needed. House visits follow the same structure as studio sessions, with equipment provided.',
    icon: 'home',
    tag: 'In your home',
  },
  {
    id: 'childrens-yoga',
    name: "Children's Yoga",
    summary:
      'Playful, age-appropriate sessions that introduce children to movement, breathing and mindfulness.',
    detail:
      "Children's sessions are built around play. Poses become animals and stories, breathing becomes a game, and stillness is kept short and sweet. The aim is simply to help young children feel comfortable in their bodies, notice their breath, and enjoy moving — with no pressure to perform and plenty of room to giggle.",
    icon: 'child',
    tag: 'Kids',
  },
  {
    id: 'prenatal-postnatal',
    name: 'Prenatal & Postnatal Yoga',
    summary:
      'Gentle, supportive practices for pregnancy and the postnatal period, paced around each trimester.',
    detail:
      'Prenatal sessions focus on breath, pelvic and postural comfort, relaxation and rest positions that change as pregnancy progresses. Postnatal sessions are gradual — rebuilding core and pelvic awareness, easing tension from carrying and feeding, and giving new mothers a quiet hour to themselves. Both are offered one-to-one or in small groups.',
    icon: 'mother',
    note: 'Please consult your doctor or midwife before beginning or continuing a yoga practice during pregnancy or after birth, and share their guidance with us so we can adapt each session safely.',
  },
  {
    id: 'pranayama-meditation',
    name: 'Pranayama & Meditation',
    summary:
      'Breathwork and seated practice that support relaxation, steadier attention and everyday mindfulness.',
    detail:
      'Pranayama is the practice of breathing with attention — learning to slow the breath, lengthen it, and use it as an anchor. Meditation sessions build on that with simple, secular techniques for settling the mind. Nothing esoteric is required of you; you sit comfortably (a chair is fine), close your eyes, and are guided throughout.',
    icon: 'breath',
    note: 'Breath retention practices are not suitable for everyone, including during pregnancy or with certain heart or respiratory conditions. Tell us beforehand and we will keep the practice gentle.',
  },
  {
    id: 'senior-citizen-yoga',
    name: 'Senior Citizen Yoga',
    summary:
      'Gentle, accessible movement, balance and breath practices designed for older adults.',
    detail:
      'Sessions for older adults move slowly and stay close to the chair or wall when helpful. We work on ease of movement, comfortable breathing, balance confidence and relaxation, always within what feels safe. Chairs, blocks and straps are used freely — the practice is adapted to the person, never the reverse.',
    icon: 'elder',
    tag: 'Gentle',
  },
  {
    id: 'varma-therapy',
    name: 'Varma Therapy',
    summary:
      'A traditional Tamil wellness practice, offered here as a mindful bodywork and relaxation experience.',
    detail:
      'Varma is part of the traditional Siddha wellness heritage of Tamil Nadu, working with specific points on the body through gentle touch and pressure. At Sthira we offer it as a traditional wellness and relaxation experience — a quiet, hands-on session in a calm setting. It is not presented as a medical treatment or a substitute for clinical care.',
    icon: 'varma',
    tag: 'Traditional',
    note: 'Varma sessions at Sthira are offered as a traditional wellness experience only, and are not a medical treatment or diagnosis. For any health concern, please see a qualified medical practitioner.',
  },
  {
    id: 'chair-yoga',
    name: 'Chair Yoga',
    summary:
      'Accessible yoga that can be practised seated, or using a chair for support and confidence.',
    detail:
      'Chair yoga keeps the benefits of a full practice — mobility, breath, relaxation — while removing the need to get up and down from the floor. It suits people recovering from injury, managing limited mobility, or simply preferring a supported practice. It is also a comfortable entry point for complete beginners.',
    icon: 'chair',
    tag: 'Accessible',
  },
  {
    id: 'sound-healing',
    name: 'Sound Healing Therapy',
    summary:
      'Deeply restful sessions using sound and vibration to support relaxation and quiet attention.',
    detail:
      'You lie down, get comfortable under a blanket, and listen. Instruments such as singing bowls, chimes and gentle percussion create a continuous wash of sound that many people find settles the nervous system quickly. No participation is needed — the whole session is about letting go. It pairs beautifully with a short meditation or yoga nidra.',
    icon: 'sound',
  },
  {
    id: 'one-to-one',
    name: 'Personal 1-to-1 Sessions',
    summary:
      'Individual sessions shaped entirely around your goals, your body and your comfort level.',
    detail:
      'One-to-one sessions are the most adaptable thing we offer. The whole hour belongs to you: we can focus on a single area, work slowly through a sequence you find difficult, build a home practice you will actually keep up with, or simply give you space to practise with someone alongside. Ideal before joining a group, or if you would rather not.',
    icon: 'user',
    tag: 'One-to-one',
  },
  {
    id: 'workshops',
    name: 'Workshops',
    summary:
      'Themed sessions and wellness workshops — breathwork, restorative evenings, seasonal practices and more.',
    detail:
      'Workshops run occasionally and go deeper into a single theme: an introduction to pranayama, a restorative wind-down evening, hip and spine mobility, yoga for stress, or seasonal practices. They are open to beginners unless stated otherwise, and usually run for two to three hours with tea afterwards.',
    icon: 'workshop',
    tag: 'Occasional',
  },
  {
    id: 'online-classes',
    name: 'Online Classes',
    summary:
      'Live yoga and wellness sessions you can attend from home, wherever you are.',
    detail:
      'Live online sessions run over video call so you can practise from your own space — useful if you travel, if timings do not suit a studio visit, or if you simply prefer to start at home. Sessions are small enough that we can see and guide each participant, and recordings can be arranged on request.',
    icon: 'online',
    tag: 'From home',
  },
]

/** Short disclaimer shown under the practices grid. */
export const servicesDisclaimer =
  'Sthira Yoga & Wellness offers yoga, breathwork and traditional wellness practices for general wellbeing. These are not medical treatments and do not replace advice from a qualified doctor or therapist. Where relevant, please practise alongside appropriate professional or medical guidance.'
