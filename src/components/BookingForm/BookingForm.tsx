import { useMemo, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icons'
import Img from '@/components/ui/Img'
import Reveal from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { siteImages } from '@/data/gallery'
import { contactLinks, studioInfo } from '@/data/site'
import pub from '@/utils/asset'
import {
  bookingWhatsAppLink,
  emptyBooking,
  serviceOptions,
  submitBooking,
  todayISO,
  validateBooking,
  type BookingErrors,
  type BookingValues,
} from '@/utils/booking'
import './BookingForm.css'

type FieldName = keyof BookingValues

type SubmitState = 'idle' | 'pending' | 'success' | 'error'

const TIME_OPTIONS = [
  'Early morning (6:00 – 8:00 AM)',
  'Morning (8:00 – 11:00 AM)',
  'Evening (4:00 – 6:00 PM)',
  'Late evening (6:00 – 8:00 PM)',
  'Flexible — suggest a time',
]

const FORM_NOTES = [
  {
    icon: 'clock' as const,
    text: 'We reply to every enquiry, usually within one working day.',
  },
  {
    icon: 'heart-hand' as const,
    text: 'First session? Tell us if you are new to yoga — we will keep it gentle.',
  },
  {
    icon: 'info' as const,
    text: 'Share any health considerations and we will adapt the practice for you.',
  },
]

export function BookingForm() {
  const [values, setValues] = useState<BookingValues>(emptyBooking)
  const [errors, setErrors] = useState<BookingErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [state, setState] = useState<SubmitState>('idle')
  const [failureNote, setFailureNote] = useState('')
  const successRef = useRef<HTMLDivElement>(null)
  const firstErrorRef = useRef<HTMLElement | null>(null)

  const minDate = useMemo(() => todayISO(), [])

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    // Re-validate a field live only once the visitor has already left it.
    if (touched[field]) {
      setErrors(validateBooking({ ...values, [field]: value }))
    }
  }

  const blur = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }))
    setErrors(validateBooking(values))
  }

  const showError = (field: FieldName) => (touched[field] ? errors[field] : undefined)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateBooking(values)
    setErrors(nextErrors)
    setTouched({
      name: true,
      phone: true,
      email: true,
      service: true,
      date: true,
      time: true,
      message: true,
    })

    const errorFields = Object.keys(nextErrors) as FieldName[]
    if (errorFields.length > 0) {
      firstErrorRef.current = document.getElementById(`field-${errorFields[0]}`)
      firstErrorRef.current?.focus()
      return
    }

    setState('pending')
    setFailureNote('')

    const result = await submitBooking(values)

    if (result.ok) {
      setState('success')
      setValues(emptyBooking)
      setTouched({})
      // Move focus to the confirmation so screen readers announce it.
      requestAnimationFrame(() => successRef.current?.focus())
      return
    }

    setState('error')
    setFailureNote(
      result.message ?? 'Something went wrong while sending your request. Please try again.',
    )
  }

  const fieldError = (field: FieldName, label: string) => {
    const message = showError(field)
    return (
      <>
        <label className="form__label" htmlFor={`field-${field}`}>
          {label}
          {field !== 'message' ? <span className="form__required"> *</span> : null}
        </label>
        {message ? (
          <p className="form__error" id={`error-${field}`} role="alert">
            <Icon name="info" size={14} strokeWidth={1.9} />
            {message}
          </p>
        ) : null}
      </>
    )
  }

  const describedBy = (field: FieldName) => (showError(field) ? `error-${field}` : undefined)

  return (
    <Section id="book" labelledBy="book-title" className="booking">
      <div className="booking__shell">
        {/* ---------------- Side panel ---------------- */}
        <Reveal className="booking__aside">
          <div className="booking__aside-media">
            <Img
              className="booking__aside-img"
              src={pub(siteImages.booking.src)}
              alt={siteImages.booking.alt}
              width={720}
              height={540}
            />
          </div>

          <h3 className="booking__aside-title">What happens next</h3>
          <ul className="booking__notes">
            {FORM_NOTES.map((note) => (
              <li key={note.text}>
                <span className="booking__note-icon" aria-hidden="true">
                  <Icon name={note.icon} size={18} strokeWidth={1.6} />
                </span>
                <span>{note.text}</span>
              </li>
            ))}
          </ul>

          <p className="booking__aside-alt">
            Prefer to speak to someone?{' '}
            <a href={contactLinks.whatsapp()} target="_blank" rel="noreferrer">
              Message us on WhatsApp
            </a>{' '}
            or call <a href={contactLinks.tel()}>{studioInfo.phone}</a>.
          </p>
        </Reveal>

        {/* ---------------- Form ---------------- */}
        <Reveal delay={120} className="booking__main">
          <span className="eyebrow">Book a Class</span>
          <h2 id="book-title" className="section-title">
            {studioInfo.booking.heading}
          </h2>
          <p className="section-lede booking__lede">
            Tell us a little about what you are looking for and we will suggest the right session.
            Fields marked <span aria-hidden="true">*</span>
            <span className="visually-hidden">with an asterisk</span> are required.
          </p>

          {state === 'success' ? (
            <div
              ref={successRef}
              className="booking__success"
              role="status"
              tabIndex={-1}
            >
              <span className="booking__success-icon" aria-hidden="true">
                <Icon name="check" size={26} strokeWidth={2.2} />
              </span>
              <h3>Thank you</h3>
              <p>{studioInfo.booking.successMessage}</p>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setState('idle')}
              >
                Send another request
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form__grid">
                <div className="form__field">
                  {fieldError('name', 'Name')}
                  <input
                    id="field-name"
                    className="form__input"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    aria-required="true"
                    aria-invalid={showError('name') ? true : undefined}
                    aria-describedby={describedBy('name')}
                    onChange={(event) => update('name', event.target.value)}
                    onBlur={() => blur('name')}
                  />
                </div>

                <div className="form__field">
                  {fieldError('phone', 'Phone number')}
                  <input
                    id="field-phone"
                    className="form__input"
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    value={values.phone}
                    aria-required="true"
                    aria-invalid={showError('phone') ? true : undefined}
                    aria-describedby={describedBy('phone')}
                    onChange={(event) => update('phone', event.target.value)}
                    onBlur={() => blur('phone')}
                  />
                </div>

                <div className="form__field form__field--wide">
                  {fieldError('email', 'Email')}
                  <input
                    id="field-email"
                    className="form__input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    aria-required="true"
                    aria-invalid={showError('email') ? true : undefined}
                    aria-describedby={describedBy('email')}
                    onChange={(event) => update('email', event.target.value)}
                    onBlur={() => blur('email')}
                  />
                </div>

                <div className="form__field form__field--wide">
                  {fieldError('service', 'Preferred class / service')}
                  <select
                    id="field-service"
                    className="form__input form__select"
                    name="service"
                    value={values.service}
                    aria-required="true"
                    aria-invalid={showError('service') ? true : undefined}
                    aria-describedby={describedBy('service')}
                    onChange={(event) => update('service', event.target.value)}
                    onBlur={() => blur('service')}
                  >
                    <option value="">Select a practice…</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form__field">
                  {fieldError('date', 'Preferred date')}
                  <input
                    id="field-date"
                    className="form__input"
                    type="date"
                    name="date"
                    min={minDate}
                    value={values.date}
                    aria-required="true"
                    aria-invalid={showError('date') ? true : undefined}
                    aria-describedby={describedBy('date')}
                    onChange={(event) => update('date', event.target.value)}
                    onBlur={() => blur('date')}
                  />
                </div>

                <div className="form__field">
                  {fieldError('time', 'Preferred time')}
                  <select
                    id="field-time"
                    className="form__input form__select"
                    name="time"
                    value={values.time}
                    aria-required="true"
                    aria-invalid={showError('time') ? true : undefined}
                    aria-describedby={describedBy('time')}
                    onChange={(event) => update('time', event.target.value)}
                    onBlur={() => blur('time')}
                  >
                    <option value="">Select a time…</option>
                    {TIME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form__field form__field--wide">
                  {fieldError('message', 'Message')}
                  <textarea
                    id="field-message"
                    className="form__input form__textarea"
                    name="message"
                    rows={4}
                    maxLength={500}
                    placeholder="Anything we should know — your experience with yoga, any health considerations, or what you are hoping for."
                    value={values.message}
                    aria-invalid={showError('message') ? true : undefined}
                    aria-describedby={describedBy('message')}
                    onChange={(event) => update('message', event.target.value)}
                    onBlur={() => blur('message')}
                  />
                  <p className="form__counter" aria-hidden="true">
                    {values.message.length}/500
                  </p>
                </div>
              </div>

              {state === 'error' ? (
                <p className="form__failure" role="alert">
                  <Icon name="info" size={17} strokeWidth={1.8} />
                  {failureNote}{' '}
                  <a href={bookingWhatsAppLink(values)} target="_blank" rel="noreferrer">
                    Send it on WhatsApp instead
                  </a>
                  .
                </p>
              ) : null}

              <div className="form__actions">
                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  disabled={state === 'pending'}
                >
                  {state === 'pending' ? (
                    <>
                      <span className="form__spinner" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Book a Class
                      <Icon name="arrow-right" size={18} strokeWidth={1.8} />
                    </>
                  )}
                </button>
                <p className="form__privacy">
                  We only use these details to arrange your session. Nothing is shared.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  )
}

export default BookingForm
