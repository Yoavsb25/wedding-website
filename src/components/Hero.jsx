import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { duration, easing, layout } from '../theme/tokens';
import { SECTION_IDS } from '../constants';
import { getHeroContainer, heroItem } from '../theme/motionVariants';
import { CalendarIcon, EmailIcon } from './Icons';
import Countdown from './Countdown';
import AddToCalendar from './AddToCalendar';
import ShareButton from './ShareButton';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const dateFormatted = new Date(site.dateISO).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.section
      id={SECTION_IDS.HERO}
      className={`relative ${layout.heroMinHeight} flex flex-col items-center justify-center text-center overflow-hidden px-4 ${layout.heroPaddingY}`}
      variants={getHeroContainer()}
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
          variants={heroItem}
          className="font-display text-hero uppercase text-brand-900"
        >
          {copy.heroTitle}
        </motion.h1>
        <motion.p variants={heroItem} className="font-display text-hero-sub text-brand-900">
          {site.coupleNames}
        </motion.p>
        <motion.p variants={heroItem} className="text-lg text-brand-800">
          {dateFormatted}
        </motion.p>
        <motion.p variants={heroItem} className="text-lg text-brand-800">
          {site.venueFullName}, Tel Aviv
        </motion.p>

        <motion.div variants={heroItem}>
          <Countdown />
        </motion.div>
        <motion.img
          variants={heroItem}
          src={`${import.meta.env.BASE_URL}images/image.png`}
          alt="Illustration of the couple"
          className="max-w-xs mx-auto w-full h-auto block"
          loading="eager"
          width={320}
          height={320}
          whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
          transition={{ duration: duration.motion / 1000, ease: easing.soft }}
        />

        <motion.div variants={heroItem} className="w-full mt-6">
          <div className="flex items-center justify-center gap-3 text-brand-600 text-sm">
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="inline-flex items-center gap-2 shrink-0 font-medium">
              <CalendarIcon className="w-4 h-4" />
              {copy.markCalendarsAndRsvp}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
          </div>
          <motion.a
            href="#rsvp"
            variants={heroItem}
            className="btn inline-flex items-center justify-center gap-2 mt-3"
            whileHover={!shouldReduceMotion ? { scale: 1.03, boxShadow: '0 6px 20px rgba(38,50,72,0.25)' } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
            transition={{ duration: duration.motion / 1000, ease: easing.soft }}
          >
            <EmailIcon className="w-5 h-5" />
            {copy.rsvpNow}
          </motion.a>
        </motion.div>

        <motion.div variants={heroItem} className="w-full mt-5">
          <div className="flex items-center justify-center gap-3 text-brand-600 text-sm">
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="shrink-0 font-medium">{copy.addToCalendar}</span>
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
          variants={heroItem}
          className={`inline-flex flex-col items-center gap-1 text-xs text-brand-300 tracking-widest ${layout.scrollCtaMarginTop} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded px-2 py-2 min-h-[44px] justify-center`}
          aria-label={copy.scrollToScheduleAria}
        >
          <span className="text-lg" aria-hidden="true">↓</span>
          <span>{copy.scrollToSchedule}</span>
        </motion.a>
      </div>
    </motion.section>
  );
}
