import { Icon } from '@/components/ui/Icons'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { Section, SectionHead } from '@/components/ui/Section'
import { trainers } from '@/data/trainers'
import pub from '@/utils/asset'
import './Trainers.css'

export function Trainers() {
  return (
    <Section id="trainers" labelledBy="trainers-title" className="trainers">
      <SectionHead
        align="center"
        eyebrow="Our Teachers"
        id="trainers-title"
        title="Meet Our Trainers"
        lede="A small, unhurried team. Every session is taught by someone who will learn your name, notice how you are that day, and adjust accordingly."
      />

      <ul className="trainers__grid">
        {trainers.map((trainer, index) => (
          <Reveal as="li" key={trainer.id} delay={index * 110} className="trainers__item">
            <article className="trainer-card card">
              <div className="trainer-card__media">
                <Img
                  className="trainer-card__img"
                  src={pub(trainer.image)}
                  alt={trainer.imageAlt}
                  width={600}
                  height={720}
                />
                <span className="trainer-card__spec">{trainer.specialization}</span>
              </div>

              <div className="trainer-card__body">
                <h3 className="trainer-card__name">{trainer.name}</h3>
                <p className="trainer-card__bio">{trainer.bio}</p>

                {trainer.focus && trainer.focus.length > 0 ? (
                  <ul className="trainer-card__focus" aria-label={`${trainer.name} focus areas`}>
                    {trainer.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="trainers__foot">
        <Icon name="info" size={18} strokeWidth={1.6} />
        <p>
          Trainer profiles are placeholders for now — detailed biographies and areas of practice
          will be added shortly.
        </p>
      </Reveal>
    </Section>
  )
}

export default Trainers
