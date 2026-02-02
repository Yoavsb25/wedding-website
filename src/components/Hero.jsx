import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing, delay } from '../theme/tokens';
import Countdown from './Countdown';

const container = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: (i?.reduced ?? false) ? 0 : 0.05,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.motion / 1000,
      ease: easing.weddingRing,
    },
  }),
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const dateFormatted = new Date(site.dateISO).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 py-20 md:py-28"
      variants={container}
      initial="hidden"
      animate="visible"
      custom={{ reduced: shouldReduceMotion }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(213,164,138,0.12),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="absolute top-8 left-8 w-24 h-24 md:w-32 md:h-32 rounded-full border border-brand-400/30" aria-hidden="true" />
      <div className="absolute top-12 right-8 w-16 h-16 md:w-24 md:h-24 rounded-full border border-brand-400/20" aria-hidden="true" />

      <div className="relative z-10 max-w-[700px] mx-auto space-y-4 md:space-y-6">
        <motion.h1
          variants={item}
          className="font-display text-3xl md:text-4xl uppercase tracking-[0.2em] text-brand-900"
        >
          We're Getting Married
        </motion.h1>
        <motion.p variants={item} className="font-display text-5xl md:text-6xl text-brand-900">
          {site.coupleNames}
        </motion.p>
        <motion.p variants={item} className="text-lg text-brand-800">
          {dateFormatted} · {site.venueFullName}, Tel Aviv
        </motion.p>
        <motion.div variants={item}>
          <Countdown />
        </motion.div>
        <motion.img
          variants={item}
          src={`${import.meta.env.BASE_URL}images/couple.svg`}
          alt="Illustration of the couple"
          className="mx-auto max-w-xs rounded-2xl shadow-md w-full h-auto"
          loading="eager"
          width={320}
          height={320}
        />
        <motion.a
          href="#rsvp"
          variants={item}
          className="btn inline-block mt-2"
          whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' } : undefined}
          whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
          transition={{ duration: duration.motion / 1000, ease: easing.soft }}
        >
          RSVP
        </motion.a>
        <motion.a
          href="#schedule"
          variants={item}
          className="inline-flex flex-col items-center gap-1 text-xs text-brand-300 tracking-widest mt-8 md:mt-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded px-2 py-2 min-h-[44px] justify-center"
          aria-label="Scroll to schedule"
        >
          <span className="text-lg" aria-hidden="true">↓</span>
          <span>Scroll to schedule</span>
        </motion.a>
      </div>
    </motion.section>
  );
}
