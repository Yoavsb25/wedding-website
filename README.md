# Wedding Website & RSVP

A single-page wedding website built with React (Vite) and Tailwind CSS. RSVP is handled via an embedded Google Form; submissions go to Google Sheets as the admin dashboard.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build & deploy

```bash
npm run build
```

The app builds to `dist/`. For GitHub Pages (project page), the workflow in `.github/workflows/deploy.yml` runs on push to `main`. Set **Settings → Pages → Source** to "GitHub Actions" and use the `github-pages` environment.

**Base path:** If the site is at `https://<user>.github.io/wedding-website/`, `vite.config.js` already has `base: '/wedding-website/'`. For a user/org site at the root, set `base: '/'` in `vite.config.js`.

## Content

- **Site copy & venue:** `src/data/site.js` — title, couple names, date, venue, address, maps URL, RSVP note, form embed URL.
- **Schedule:** `src/data/schedule.js` — array of `{ time, title }`.
- **Countdown phrases:** `src/data/countdownCopy.js` — poetic microcopy by "days until" bucket.

Replace `site.rsvpFormEmbedUrl` with your Google Form embed URL (Form → Send → Embed → copy iframe `src`).

## Google Form & Sheets

1. **Form:** Create a form with required fields: First Name, Last Name, Number of Guests (numeric). Enable "Edit after submit". Set a friendly confirmation message.
2. **Sheet:** Link the form to a new sheet. Ensure columns: Timestamp, First Name, Last Name, Number of Guests.
3. **Dashboard:** Add a tab with total RSVPs (`=COUNTA(A2:A)`) and total guests (`=SUM(D2:D)`). Restrict sheet access to admins only.

## Images

- Add `public/images/couple.png` (or replace `public/images/couple.svg`) for the hero image.
- Add `public/images/venue.jpg` for the hotel photo (the image you see on Google Maps for **R48 Hotel and Garden**): open [R48 Hotel and Garden](https://www.google.com/maps/search/?api=1&query=R48+Hotel+and+Garden+48+Rothschild+Boulevard+Tel+Aviv) in Google Maps, right‑click the main cover image → Save image, save as `public/images/venue.jpg`, then set `venueImageUrl: '/images/venue.jpg'` in `src/data/site.js`. Compress images to stay within performance budget (~200KB total).

## Launch checklist

- [ ] Finalize copy in `src/data/*`
- [ ] Replace/compress `public/images/couple.png`
- [ ] Set Google Form embed URL in `site.js`
- [ ] Confirm Form: "Edit after submit" on; confirmation message set
- [ ] Test RSVP on mobile and desktop; verify Sheet totals
- [ ] Run Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90
- [ ] GitHub Pages HTTPS; optional custom domain + CNAME

## Docs

- [ARCHITECTURE.MD](ARCHITECTURE.MD) — architecture and structure
- [DESIGN.md](DESIGN.md) — design and animation spec
- [PRD.MD](PRD.MD) — product requirements
