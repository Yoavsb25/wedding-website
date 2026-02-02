import { motion, useReducedMotion } from 'framer-motion';
import { schedule } from '../data/schedule';
import { duration, easing } from '../theme/tokens';

const container = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.petal },
  },
};

export default function Schedule() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="schedule"
      className="py-16 md:py-24 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      <div className="max-w-[700px] mx-auto">
        <motion.h2
          variants={item}
          className="font-display text-2xl md:text-3xl uppercase tracking-widest text-brand-900 mb-10 text-center"
        >
          Schedule
        </motion.h2>
        <ul className="space-y-6" aria-label="Wedding schedule">
          {schedule.map((entry, i) => (
            <motion.li
              key={`${entry.time}-${entry.title}`}
              variants={item}
              className="card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
            >
              <time dateTime={entry.time} className="font-display text-xl text-brand-700 shrink-0">
                {entry.time}
              </time>
              <span className="font-body text-brand-900">{entry.title}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
