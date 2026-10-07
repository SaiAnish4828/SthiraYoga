import { Icon } from '@/components/ui/Icons'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/Section'
import { siteImages } from '@/data/gallery'
import { approachSteps } from '@/data/navigation'
import pub from '@/utils/asset'
import './About.css'

const VALUES = [
  {
    icon: 'mountain' as const,
    title: 'Balance',
    text: 'Effort and ease held together — a practice that never pushes past what serves you.',
  },
  {
    icon: 'sun' as const,
    title: 'Consistency',
    text: 'Small, repeatable sessions that fit real life beat ambitious plans that fall apart.',
  },
  {
    icon: 'moon' as const,
    title: 'Mindfulness',
    text: 'Attention to the breath and the present moment, practised plainly and without mystique.',
  },
  {
    icon: 'leaf' as const,
    title: 'Strength',
    text: 'Steadiness built gradually — in the body, the breath and the way you meet the day.',
  },
  {
    icon: 'heart-hand' as const,
    title: 'Healing',
    text: 'Room to recover, rest and feel looked after, at whatever pace your body asks for.',
  },
  {
    icon: 'lotus' as const,
    title: 'Sustainable wellbeing',
    text: 'Habits you can keep for years, not a short programme you finish and forget.',
  },
]

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        {/* ---------------- Philosophy ---------------- */}
        <div className="about__block">
          <Reveal className="about__media">
            <figure className="about__figure">
              <Img
                className="about__img"
                src={pub(siteImages.philosophy.src)}
                alt={siteImages.philosophy.alt}
                width={760}
                height={560}
              />
              <figcaption className="about__caption">
                <Icon name="quote" size={18} strokeWidth={1.4} />
                <span>
                  “Steady and comfortable” — the oldest instruction for a posture, and still the
                  best one.
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="about__body">
            <SectionHead
              eyebrow="Our Philosophy"
              id="about-title"
              title={
                <>
                  The meaning behind <span className="accent">Sthira</span>
                </>
              }
              lede="In classical yoga, sthira describes something steady, grounded and at ease. It is not rigidity — it is the calm strength that lets you hold, breathe and stay."
            />

            <Reveal delay={80}>
              <p className="about__text">
                We took that word as our name because it says what this studio is for. A practice
                here is not about reaching an impressive shape. It is about arriving, paying
                attention, and leaving a little more settled than you came.
              </p>
            </Reveal>

            <ul className="about__values">
              {VALUES.map((value, index) => (
                <Reveal as="li" key={value.title} delay={120 + index * 70} className="about__value">
                  <span className="about__value-icon" aria-hidden="true">
                    <Icon name={value.icon} size={20} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="about__value-title">{value.title}</h3>
                    <p className="about__value-text">{value.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- Approach ---------------- */}
        <div className="about__block about__block--reverse">
          <Reveal className="about__media">
            <figure className="about__figure about__figure--tall">
              <Img
                className="about__img"
                src={pub(siteImages.approach.src)}
                alt={siteImages.approach.alt}
                width={760}
                height={940}
              />
            </figure>
          </Reveal>

          <div className="about__body">
            <SectionHead
              eyebrow="Our Approach"
              title="Adapted to you, not the other way round"
              lede="Every body is at a different place. Sessions at Sthira are adjusted for age, physical condition, mobility and what you are actually hoping for — from a first gentle class to a long-standing home practice."
            />

            <ol className="about__steps">
              {approachSteps.map((step, index) => (
                <Reveal as="li" key={step.step} delay={80 + index * 90} className="about__step">
                  <span className="about__step-num" aria-hidden="true">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="about__step-title">{step.title}</h3>
                    <p className="about__step-text">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={380} className="about__note">
              <Icon name="info" size={20} strokeWidth={1.6} />
              <p>
                We teach both traditional and accessible approaches — classical sequences where
                they suit you, and simple supported variations where they do not. Both belong to
                the same practice.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
