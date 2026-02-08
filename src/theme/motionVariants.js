/**
 * Shared Framer Motion variants for section reveal animations.
 * Supports reduced-motion preference via custom={{ reduced: true }}.
 */
import { duration, easing } from './tokens';

/**
 * Hero container: visible is a function so custom.reduced can zero out stagger/delay.
 * Use with custom={{ reduced: shouldReduceMotion }}.
 */
export function getHeroContainer() {
  return {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        staggerChildren: custom?.reduced ? 0 : 0.1,
        delayChildren: custom?.reduced ? 0 : 0.05,
      },
    }),
  };
}

/**
 * Section container for whileInView sections. visible is a function so custom.reduced
 * can zero out stagger/delay. Use with custom={{ reduced: shouldReduceMotion }}.
 * @param {Object} [opts]
 * @param {number} [opts.staggerChildren=0.1]
 * @param {number} [opts.delayChildren=0.05]
 */
export function getSectionContainerReveal(opts = {}) {
  const { staggerChildren = 0.1, delayChildren = 0.05 } = opts;
  return {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: 1,
      transition: {
        staggerChildren: custom?.reduced ? 0 : staggerChildren,
        delayChildren: custom?.reduced ? 0 : delayChildren,
      },
    }),
  };
}

/** Item variant for section children (fade + slide up). Uses petal easing. */
export const sectionItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.petal },
  },
};

/** Item variant for Hero (weddingRing easing). Use with custom for reduced motion. */
export const heroItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.weddingRing },
  },
};

/** Schedule section: slightly larger y offset. */
export const scheduleItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.petal },
  },
};

/** Timeline dot (scale + opacity) for Schedule. */
export const timelineDot = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: duration.motion / 1000, ease: easing.soft },
  },
};
