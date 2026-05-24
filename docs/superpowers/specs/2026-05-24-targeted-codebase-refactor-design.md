# Targeted Codebase Refactor — Design Spec

**Date:** 2026-05-24  
**Goal:** Take maintainability, reuse, clean code, and architecture from ~8/10 to 10/10 via three focused, non-breaking changes.

---

## Context

The codebase is well-structured for a config-driven React SPA. Three specific gaps prevent a 10/10:

1. Identical animation variant objects are copy-pasted across 5+ components.
2. SVG icon components are defined inline inside the component files that happen to use them first.
3. Editorial paragraph text is hardcoded in JSX instead of living in the central `site.js` config.

---

## Changes

### 1. `src/theme/motionVariants.js` (new file)

Extract the shared `fadeUp` variant that every section component currently redeclares as `sectionVariants`:

```js
import { duration, easing } from './tokens';

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.soft },
  },
};
```

All section components (`Hero`, `Schedule`, `Location`, `Parking`, `RsvpEmbed`, `Gifts`) replace their local `sectionVariants` definition with `import { fadeUp } from '../theme/motionVariants'` and update the `variants` prop accordingly.

---

### 2. `src/components/icons.jsx` (new file)

Collect all inline SVG icon components into a single named-export file. During implementation, sweep every component for inline SVG definitions and move them here. Import by name in each consumer.

```jsx
export const CopyIcon = () => ( /* ... */ );
export const CheckIcon = () => ( /* ... */ );
// + any others found during sweep
```

---

### 3. `src/data/site.js` — add `copy` object

Add a `copy` key for editorial paragraph text. Rule: prose a human wrote (taglines, descriptions, notes) moves here. UI chrome (button labels, card headers, ARIA labels) stays in components.

```js
copy: {
  gifts: {
    tagline: "Thank you for celebrating with us ♡",
    note: "Gift details are below — bank transfer is preferred",
  },
  // additional keys added during sweep of other sections
},
```

During implementation: sweep all section components for qualifying strings and add them to the appropriate `copy.*` key.

---

## What does NOT change

- Component behavior, layout, or props
- Animation timing or easing values
- UI chrome (button labels, card headers, ARIA strings) — these stay in components
- Structured data in `site.js` (dates, URLs, bank codes, names)

---

## Verification

1. `npm run build && npm run lint` — zero errors, zero warnings
2. Visual check: run dev server, scroll through all sections — no animation, copy, or layout regressions
3. Confirm `sectionVariants` no longer appears in any component file (`grep -r sectionVariants src/`)
4. Confirm no inline SVG `<svg>` definitions remain inside component files (`grep -r "<svg" src/components/` — only `icons.jsx` should have hits)
