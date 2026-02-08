/**
 * App-wide constants: timing, section ids, and magic values in one place.
 * Use these instead of scattered literals so behavior is easy to tune and keep in sync.
 * @module constants
 */

/** Countdown timer update interval in milliseconds */
export const COUNTDOWN_INTERVAL_MS = 1000;

/** How long the "Link copied!" toast is shown (ShareButton) */
export const SHARE_COPY_RESET_MS = 2000;

/** Minimum touch target height in pixels (a11y) */
export const TOUCH_TARGET_MIN_HEIGHT_PX = 44;

/** Section id attributes used for anchor links and nav. Must match navLinks[].id. */
export const SECTION_IDS = {
  HERO: 'hero',
  SCHEDULE: 'schedule',
  LOCATION: 'location',
  PARKING: 'parking',
  RSVP: 'rsvp',
};
