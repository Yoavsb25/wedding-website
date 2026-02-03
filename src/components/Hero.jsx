import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';
import Countdown from './Countdown';
import AddToCalendar from './AddToCalendar';
import ShareButton from './ShareButton';

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
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(90,111,148,0.08),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="absolute top-12 right-8 w-16 h-16 md:w-24 md:h-24 rounded-full border border-brand-400/20" aria-hidden="true" />

      <div className="relative z-10 max-w-[700px] mx-auto space-y-4 md:space-y-6">
        <motion.h1
          variants={item}
          className="font-display text-hero uppercase text-brand-900"
        >
          We're Getting Married
        </motion.h1>
        <motion.p variants={item} className="font-display text-hero-sub text-brand-900">
          {site.coupleNames}
        </motion.p>
        <motion.p variants={item} className="text-lg text-brand-800">
          {dateFormatted}
        </motion.p>
        <motion.p variants={item} className="text-lg text-brand-800">
          {site.venueFullName}, Tel Aviv
        </motion.p>

        <motion.div variants={item}>
          <Countdown />
        </motion.div>
        <motion.img
          variants={item}
          src={`${import.meta.env.BASE_URL}images/image.png`}
          alt="Illustration of the couple"
          className="max-w-xs mx-auto w-full h-auto block"
          loading="eager"
          width={320}
          height={320}
          whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
          transition={{ duration: duration.motion / 1000, ease: easing.soft }}
        />

        {/* Mark your calendars & RSVP */}
        <motion.div variants={item} className="w-full mt-6">
          <div className="flex items-center justify-center gap-3 text-brand-600 text-sm">
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 shrink-0 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Mark your calendars & RSVP
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
          </div>
          <motion.a
            href="#rsvp"
            variants={item}
            className="btn inline-flex items-center justify-center gap-2 mt-3"
            whileHover={!shouldReduceMotion ? { scale: 1.03, boxShadow: '0 6px 20px rgba(38,50,72,0.25)' } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
            transition={{ duration: duration.motion / 1000, ease: easing.soft }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            RSVP Now
          </motion.a>
        </motion.div>

        {/* Add to Calendar */}
        <motion.div variants={item} className="w-full mt-5">
          <div className="flex items-center justify-center gap-3 text-brand-600 text-sm">
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="shrink-0 font-medium">Add to Calendar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <AddToCalendar />
            <ShareButton />
          </div>
        </motion.div>
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
