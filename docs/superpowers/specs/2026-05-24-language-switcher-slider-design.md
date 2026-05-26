# Language Switcher Slider — Design Spec

**Date:** 2026-05-24
**Status:** Approved

---

## Overview

Replace the current footer-based `LanguageSwitcher` with a fixed, frosted-glass sliding pill that floats in the **top-right corner** of the screen at all times. Adds Spanish as a third language alongside the existing English and Hebrew.

---

## Visual Design

A single rounded-full pill, always visible at `fixed top-4 right-4 z-50`.

```
┌─────────────────────────────┐
│  EN  │  ES  │  עב           │
│      └──────┘               │  ← gold pill slides under active
└─────────────────────────────┘
```

- **Container:** `backdrop-blur-md bg-white/10 border border-white/20 rounded-full shadow-md px-1 py-1`
- **Segment labels:** `EN` / `ES` / `עב` — short abbreviations, `text-xs font-sans font-medium`
- **Active indicator:** `bg-brand-500 rounded-full` positioned absolutely under the active label, animated with Framer Motion `layoutId="lang-indicator"` (layout animation, spring physics)
- **Inactive label color:** `text-white/70`, active: `text-brand-900` (dark text on gold)
- **Hover:** subtle `text-white` on inactive segments
- **Works over both** dark hero (`bg-brand-900`) and light parchment body — `bg-white/10` + blur reads in both contexts without any scroll-based color change

---

## Component: `LanguageSwitcher.jsx`

Full replacement of the existing component.

**Structure:**
```jsx
<div className="fixed top-4 right-4 z-50 ...pill styles...">
  {LANGUAGES.map(({ code, label }) => (
    <button key={code} onClick={() => i18n.changeLanguage(code)} ...>
      {active === code && <motion.span layoutId="lang-indicator" ... />}
      <span className="relative z-10">{label}</span>
    </button>
  ))}
</div>
```

**Language order (left → right):** `EN → ES → עב`

**State:** No local state needed — `i18n.language` from `useTranslation()` is the single source of truth. Framer Motion's `layoutId` handles the slide animation automatically when `i18n.language` changes.

**`guardReducedMotion`:** Wrap the `motion.span` in a conditional — if `useReducedMotion()` is true, render a plain `<span>` with no animation (consistent with the rest of the site).

---

## Spanish Locale

**New file:** `src/locales/es.json`

Same key structure as `en.json`. All UI strings translated to Spanish. Proper nouns (venue name, bank name, Bit/PayBox brand names) remain unchanged.

**`src/i18n.js` change:** Register the `es` resource alongside `en` and `he`. No other structural changes — the `applyDir` function already handles LTR correctly (Spanish is LTR like English).

---

## Integration

- **`App.jsx`:** The current footer nav includes `<LanguageSwitcher />` and a preceding `|` separator. Both must be **removed** — the fixed top-right component fully replaces the footer version.

- **`src/i18n.js`:** Add `es` resource, add `'es'` to the `applyDir` LTR check (already handles anything that isn't `'he'` as LTR, so no change needed there).

---

## Files Changed

| File | Action |
|------|--------|
| `src/components/LanguageSwitcher.jsx` | Full rewrite |
| `src/locales/es.json` | New file |
| `src/i18n.js` | Add `es` resource import |
| `src/App.jsx` | Remove `<LanguageSwitcher />` + preceding `|` from footer nav |

---

## Verification

1. `npm run build` — zero errors
2. Open site — pill visible top-right over dark hero
3. Click EN → ES → עב: text switches, gold indicator slides smoothly, page direction flips on HE
4. Scroll down — pill stays fixed, readable over light parchment sections
5. Reload page — language persists from `localStorage`
6. `prefers-reduced-motion` enabled — no sliding animation, just instant swap
