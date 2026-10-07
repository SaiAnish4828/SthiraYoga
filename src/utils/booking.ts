import { contactLinks, studioInfo } from '@/data/site'
import { services } from '@/data/services'

/* ============================================================================
 *  BOOKING — data shape, validation and submission
 *
 *  The form is deliberately backend-agnostic. Today it validates and confirms
 *  locally; later you can point `studioInfo.booking.endpoint` at an API, or
 *  swap `submitBooking` for a WhatsApp / email hand-off without touching the UI.
 * ========================================================================== */

export interface BookingValues {
  name: string
  phone: string
  email: string
  service: string
  date: string
  time: string
  message: string
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>

export const emptyBooking: BookingValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  date: '',
  time: '',
  message: '',
}

/** Options for the "Preferred class / service" select. */
export const serviceOptions = services.map((service) => ({
  value: service.id,
  label: service.name,
}))

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+()\d][\d\s\-()]{6,19}$/

/** Trims every value so validation never sees stray whitespace. */
function normalise(values: BookingValues): BookingValues {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  ) as BookingValues
}

/** Today's date as `yyyy-mm-dd` in the visitor's own timezone. */
export function todayISO(): string {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

export function validateBooking(input: BookingValues): BookingErrors {
  const values = normalise(input)
  const errors: BookingErrors = {}

  if (!values.name) {
    errors.name = 'Please tell us your name.'
  } else if (values.name.length < 2) {
    errors.name = 'That looks a little short — please use your full name.'
  }

  if (!values.phone) {
    errors.phone = 'A phone number helps us confirm your booking.'
  } else if (!PHONE_RE.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number, including the country code.'
  }

  if (!values.email) {
    errors.email = 'Please add an email address so we can reply.'
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'That email address does not look quite right.'
  }

  if (!values.service) {
    errors.service = 'Choose the class or practice you are interested in.'
  }

  if (!values.date) {
    errors.date = 'Pick a date you would like to come in.'
  } else if (values.date < todayISO()) {
    errors.date = 'Please choose today or a future date.'
  }

  if (!values.time) {
    errors.time = 'Let us know roughly what time suits you.'
  }

  if (values.message.length > 500) {
    errors.message = 'Please keep your message under 500 characters.'
  }

  return errors
}

export interface SubmitResult {
  ok: boolean
  /** 'api' when a real endpoint answered, 'demo' when running without a backend. */
  mode: 'api' | 'demo'
  message?: string
}

/**
 * Sends the booking. With no `endpoint` configured it resolves in demo mode so
 * the confirmation flow can be exercised end to end.
 */
export async function submitBooking(input: BookingValues): Promise<SubmitResult> {
  const values = normalise(input)
  const endpoint = studioInfo.booking.endpoint

  const payload = {
    ...values,
    serviceLabel:
      serviceOptions.find((option) => option.value === values.service)?.label ?? values.service,
    studio: studioInfo.name,
    submittedAt: new Date().toISOString(),
    source: typeof window === 'undefined' ? 'unknown' : window.location.href,
  }

  if (!endpoint) {
    // Demo mode: pretend latency so the pending state is visible.
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { ok: true, mode: 'demo' }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return { ok: false, mode: 'api', message: `The booking service replied ${response.status}.` }
    }
    return { ok: true, mode: 'api' }
  } catch {
    return {
      ok: false,
      mode: 'api',
      message: 'We could not reach the booking service. Please try WhatsApp or call us instead.',
    }
  }
}

/**
 * Fallback hand-off: build a WhatsApp deep link carrying the same details, so
 * a visitor always has a way through even if the API is unavailable.
 */
export function bookingWhatsAppLink(values: BookingValues): string {
  const serviceLabel =
    serviceOptions.find((option) => option.value === values.service)?.label ?? values.service

  const lines = [
    `Booking request — ${studioInfo.name}`,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Interested in: ${serviceLabel}`,
    `Preferred date: ${values.date}`,
    `Preferred time: ${values.time}`,
    values.message ? `Message: ${values.message}` : '',
  ].filter(Boolean)

  return contactLinks.whatsapp(lines.join('\n'))
}
