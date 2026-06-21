# Photos Section Design

**Date:** 2026-06-21
**Status:** Approved

## Overview

Add a Photos section to the wedding website displaying curated static photos from two events — the wedding day and the pool party. Each event shows a featured photo plus a 2×2 thumbnail grid, with a lightbox on click and a link out to the full Google Photos album.

## Placement

- Inserted between the `Gifts` section and the footer in `App.jsx`
- Section divider above (matching existing pattern)
- Anchor `id="photos"` for deep-linking
- Footer nav gains a "Photos" link alongside the existing nav items

## Section Structure

Two event blocks stacked vertically inside the section:

1. **Wedding**
2. **Pool Party**

Each block contains:
- Section heading: Playfair Display, uppercase, `tracking-widest` — matches existing section heading style
- Featured + grid photo layout (see below)
- `btn-secondary` "View all in Google Photos" button linking to the album URL in a new tab

## Photo Layout

### Desktop
Two-column layout per event block:
- **Left column (~55%):** one tall featured photo
- **Right column (~45%):** 2×2 grid of 4 square thumbnails

### Mobile
Stacks vertically:
- Featured photo full-width
- 2-column 2×2 thumbnail grid below

### Styling
- `rounded-2xl` on all photos (matches existing card style)
- Framer Motion `whileHover={{ scale: 1.02 }}` with `weddingRing` easing on each photo
- `cursor-pointer` on all photos

## Lightbox

Triggered by clicking any photo (featured or thumbnail).

- **Backdrop:** `bg-black/80`, full-screen overlay
- **Photo:** centered, `max-h-[85vh]`, `object-contain`
- **Close:** X button top-right corner; ESC key; clicking backdrop
- **Album link:** small "View full album →" link below the photo, opens Google Photos in new tab
- **Animation:** Framer Motion `opacity` + `scale` (0.95 → 1) on enter/exit, `weddingRing` easing
- **Accessibility:** focus trapped inside lightbox while open; X button is the initial focus target; `aria-modal="true"`, `role="dialog"`

## Photo Storage

Static files committed to the repo under `public/`:

```
public/images/photos/
  wedding/
    featured.jpg
    thumb-1.jpg
    thumb-2.jpg
    thumb-3.jpg
    thumb-4.jpg
  pool-party/
    featured.jpg
    thumb-1.jpg
    thumb-2.jpg
    thumb-3.jpg
    thumb-4.jpg
```

Album URLs and photo metadata live in `src/data/site.js` alongside existing site config:

```js
photos: {
  wedding: {
    albumUrl: 'https://photos.google.com/...',
    images: [...] // paths relative to public/
  },
  poolParty: {
    albumUrl: 'https://photos.google.com/...',
    images: [...]
  }
}
```

## i18n

All user-facing strings added to `src/locales/en.json`, `he.json`, and `es.json`:
- Section heading
- Event labels ("Wedding", "Pool Party")
- "View all in Google Photos" button text
- Alt text for each photo (or a generic fallback pattern)

## New Files

- `src/components/Photos.jsx` — section component with both event blocks
- `src/components/Lightbox.jsx` — reusable lightbox overlay component

## Changes to Existing Files

- `src/App.jsx` — import and render `<Photos />` between Gifts and footer; add section divider
- `src/data/site.js` — add `photos` config object
- `src/locales/en.json`, `he.json`, `es.json` — add photo section strings
- Footer nav in `App.jsx` — add "Photos" anchor link
