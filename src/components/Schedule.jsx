import { motion, useReducedMotion } from 'framer-motion';
import { schedule } from '../data/schedule';
import { copy } from '../data/copy';
import { SECTION_IDS } from '../constants';
import { duration, easing, layout } from '../theme/tokens';
import { getSectionContainerReveal, scheduleItem, timelineDot } from '../theme/motionVariants';
import { scheduleIcons } from './Icons';

const iconKeys = ['clock', 'rings', 'dinner'];

export default function Schedule() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={SECTION_IDS.SCHEDULE}
      className={layout.sectionPadding}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: layout.viewportMargin }}
      variants={getSectionContainerReveal({ staggerChildren: 0.12, delayChildren: 0.08 })}
      custom={{ reduced: shouldReduceMotion }}
    >
      <div className={`${layout.contentMaxWidthWide} mx-auto`}>
        {/* Decorative line above title */}
        <motion.div
          variants={scheduleItem}
          className="flex items-center justify-center gap-2 mb-6"
          aria-hidden
        >
          <span className="h-px flex-1 max-w-[60px] bg-brand-300/60" />
          <span className="w-2 h-2 rounded-full bg-brand-400/80" />
          <span className="h-px flex-1 max-w-[60px] bg-brand-300/60" />
        </motion.div>

        <motion.h2
          variants={scheduleItem}
          className="font-display text-section uppercase text-brand-900 mb-12 md:mb-16 text-center"
        >
          {copy.schedule}
        </motion.h2>

        {/* Desktop: horizontal cards with timeline line and markers below */}
        <div className="hidden md:block">
          <ul className="grid grid-cols-3 gap-4 lg:gap-6" aria-label="Wedding schedule">
            {schedule.map((entry, i) => (
              <motion.li
                key={`${entry.time}-${entry.title}`}
                variants={scheduleItem}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="w-full rounded-2xl border border-brand-200/90 bg-white/85 backdrop-blur-sm p-5 shadow-sm text-center flex flex-col items-center gap-2"
                  whileHover={
                    !shouldReduceMotion
                      ? { y: -4, boxShadow: '0 12px 28px rgba(26,35,50,0.1)' }
                      : undefined
                  }
                  transition={{ duration: duration.motion / 1000, ease: easing.soft }}
                >
                  <div className="flex justify-center text-brand-500" aria-hidden>
                    {(() => {
                      const Icon = scheduleIcons[iconKeys[i % iconKeys.length]];
                      return Icon ? <Icon className="w-6 h-6 text-brand-500" /> : null;
                    })()}
                  </div>
                  <time
                    dateTime={entry.time}
                    className="font-display text-xl text-brand-700 tracking-wide"
                  >
                    {entry.time}
                  </time>
                  <span className="font-display text-lg text-brand-900">{entry.title}</span>
                  {entry.location && (
                    <span className="font-body text-sm text-brand-600">{entry.location}</span>
                  )}
                </motion.div>
              </motion.li>
            ))}
          </ul>
          {/* Timeline line with markers below cards (same grid as cards) */}
          <motion.div
            variants={scheduleItem}
            className="relative grid grid-cols-3 gap-4 lg:gap-6 mt-6"
            aria-hidden
          >
            <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-brand-300/70" />
            {schedule.map((_, i) => (
              <div key={`dot-${i}`} className="flex justify-center">
                <motion.span
                  variants={timelineDot}
                  className="relative z-10 w-3 h-3 rounded-full bg-brand-500 border-2 border-white shadow-sm"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: vertical timeline */}
        <ul className="md:hidden relative pl-6 space-y-8" aria-label="Wedding schedule">
          {/* Vertical line */}
          <div
            className="absolute left-[5px] top-2 bottom-2 w-px bg-brand-300/70"
            aria-hidden
          />
          {schedule.map((entry, i) => (
            <motion.li
              key={`${entry.time}-${entry.title}`}
              variants={scheduleItem}
              className="relative"
            >
              {/* Dot on line */}
              <span
                className="absolute left-0 top-5 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-500 border-2 border-white shadow-sm"
                aria-hidden
              />
              <motion.div
                className="rounded-2xl border border-brand-200/90 bg-white/85 backdrop-blur-sm p-5 shadow-sm"
                whileHover={
                  !shouldReduceMotion
                    ? { x: 4, boxShadow: '0 8px 20px rgba(26,35,50,0.08)' }
                    : undefined
                }
                transition={{ duration: duration.motion / 1000, ease: easing.soft }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-brand-500" aria-hidden>
                    {(() => {
                      const Icon = scheduleIcons[iconKeys[i % iconKeys.length]];
                      return Icon ? <Icon className="w-6 h-6 text-brand-500" /> : null;
                    })()}
                  </span>
                  <time dateTime={entry.time} className="font-display text-lg text-brand-700">
                    {entry.time}
                  </time>
                </div>
                <span className="font-display text-lg text-brand-900 block">{entry.title}</span>
                {entry.location && (
                  <span className="font-body text-sm text-brand-600 mt-1 block">
                    {entry.location}
                  </span>
                )}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
