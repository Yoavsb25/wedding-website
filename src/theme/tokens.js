/**
 * Design tokens for animation and layout.
 * Duration/easing used in Framer Motion; layout class names used in section components.
 */
export const duration = {
  motion: 300,
  motionSlow: 400,
  countdown: 350,
};

export const easing = {
  /** Smooth, slight ease-in then gentle ease-out (wedding ring style) */
  weddingRing: [0.33, 0, 0.2, 0.99],
  /** Softer start, gentle settle */
  petal: [0.25, 0.1, 0.25, 1],
  /** General soft ease */
  soft: [0.4, 0, 0.2, 1],
};

export const delay = {
  stagger: 100,
};

/**
 * Layout constants for consistent spacing and section sizing.
 * Use layout.* in className or viewport config to avoid magic numbers.
 */
export const layout = {
  /** Section vertical/horizontal padding (e.g. Schedule, Location, Parking) */
  sectionPadding: 'py-16 md:py-24 px-4',
  /** Section padding with subtle background (Location, RSVP) */
  sectionPaddingWithBg: 'py-16 md:py-24 px-4 bg-brand-100/50',
  /** Hero min height for above-the-fold */
  heroMinHeight: 'min-h-[85vh]',
  /** Hero vertical padding */
  heroPaddingY: 'py-20 md:py-28',
  /** Scroll CTA margin below hero content */
  scrollCtaMarginTop: 'mt-8 md:mt-12',
  /** Viewport margin for whileInView (px string for Framer Motion) */
  viewportMargin: '-80px',
  /** Narrow content max width (e.g. RSVP, section dividers) */
  contentMaxWidthNarrow: 'max-w-[700px]',
  /** Wide content max width (e.g. Schedule, Location cards) */
  contentMaxWidthWide: 'max-w-[900px]',
  /** RSVP iframe and container min height */
  rsvpMinHeight: 'min-h-[400px]',
  /** Map iframe min height */
  mapMinHeight: 'min-h-[280px]',
  /** Venue image aspect min height */
  venueImageMinHeight: 'min-h-[240px]',
};
