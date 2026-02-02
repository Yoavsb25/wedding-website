/**
 * Design tokens for animation: duration, easing (organic Bezier curves), optional delay.
 * Use in Framer Motion transition.ease (as array) and GSAP tweens.
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
