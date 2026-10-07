# Sthira Yoga & Wellness

A calm, production-quality single-page website for **Sthira Yoga & Wellness** —
traditional yoga wisdom with a modern, minimalist wellness experience.

Built with **Vite + React + TypeScript**. No UI framework; a hand-rolled design
system keeps the bundle small and the look bespoke.

---

## Quick start

```bash
npm install
npm run dev      # local dev server on http://localhost:5173
npm run build    # type-check + production build to dist/
```

---

## Replacing placeholder content (owner guide)

Everything temporary lives in **three places**. You never need to touch a
component to update the site.

### 1. Contact details, social links, logo, booking

👉 `src/data/site.ts` — one file for:

- studio name, tagline and descriptions
- address / phone / WhatsApp / email
- working hours
- social links (`#` = shown as "coming soon")
- logo file, wordmark and height
- booking form heading + confirmation message
- SEO title/description

Set `booking.endpoint` to an HTTPS URL that accepts JSON POST and the booking
form will start sending submissions there (until then it runs in demo mode and
only shows the confirmation message).

### 2. Photos

👉 `public/assets/` — drop your own files **using the same names**, no code
changes:

```
public/assets/
  logo/Sthira_logo.png     ← your logo (update src in site.ts if the name changes)
  hero/hero-main.jpg       ← hero background
  hero/booking.jpg         ← booking side panel
  about/intro.jpg          ← welcome section
  about/philosophy.jpg     ← philosophy figure
  about/approach.jpg       ← approach figure
  founder/uma.jpg          ← founder portrait
  trainers/uma.jpg         ← trainer card photos
  trainers/prav.jpg
  trainers/sl.jpg
  gallery/studio/…         ← gallery photos, one folder per category
  gallery/sessions/…         (studio, sessions, meditation, wellness, workshops)
  gallery/meditation/…       point `src` in src/data/gallery.ts at the file
  gallery/wellness/…
  gallery/workshops/…
```

Recommended sizes: photos ≈ 1200px on the long edge, JPEG quality ~80
(≈ 100–200 KB each) so the site stays fast.

### 3. Text content

| What                         | Where                          |
| ---------------------------- | ------------------------------ |
| Services / therapies         | `src/data/services.ts`         |
| Trainers + founder bios      | `src/data/trainers.ts`         |
| Testimonials ⚠️ placeholders | `src/data/testimonials.ts`     |
| Gallery photos               | `public/assets/gallery/<category>/` + `src` in `src/data/gallery.ts` |
| Navigation + "why" cards     | `src/data/navigation.ts`       |

⚠️ **Before going live:** testimonials, trainer bios and the address/phone are
deliberate placeholders. They are clearly marked in the data files and must be
replaced with real, consented content.

---

## Deploying to GitHub Pages (free public link)

A ready-to-serve production build lives in **`docs/`** on this branch, built
with the `/Sthira_Yoga_Wellness/` base path.

**One-time setup (repo owner, ~30 seconds):**

1. Open **Settings → Pages**:
   `https://github.com/saicareer3344/Sthira_Yoga_Wellness/settings/pages`
2. *Build and deployment → Source* → **Deploy from a branch**
3. *Branch* → `arena/01a0494f-sthira-yoga-wellness` · *Folder* → `/docs` → **Save**

Within a minute the site is live at:

```
https://saicareer3344.github.io/Sthira_Yoga_Wellness/
```

**Updating later:** after content changes run `npm run build:pages`, commit the
refreshed `docs/` folder and push — Pages redeploys automatically.

## Accessibility & performance notes

- Semantic landmarks, single `h1`, logical heading order, skip link.
- Visible focus states, focus traps in the menu/lightbox/dialogs, `Esc` closes.
- All motion respects `prefers-reduced-motion`.
- Images lazy-load with graceful branded fallbacks; the hero preloads.
- No tracking, no web fonts beyond Playfair Display + Inter (Google Fonts).

## Project structure

```
src/
  components/   one folder per section (Navbar, Hero, …, Footer)
  data/         editable content (services, trainers, testimonials, site config)
  hooks/        useReveal-style helpers (reduced motion, focus trap, …)
  styles/       design tokens + global primitives
  utils/        booking submit/validation
public/assets/  swappable images (logo, hero, founder, trainers, gallery)
```
