import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { COUNTDOWN_INTERVAL_MS } from '../constants';
import { duration, easing } from '../theme/tokens';
import { RingIcon } from './Icons';

function getTimeLeft(dateISO) {
  const wedding = new Date(dateISO).getTime();
  const now = Date.now();
  const diff = Math.max(0, wedding - now);
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalSeconds };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

const partsConfig = [
  { key: 'days', labelKey: 'days' },
  { key: 'hours', labelKey: 'hours' },
  { key: 'minutes', labelKey: 'minutes' },
  { key: 'seconds', labelKey: 'seconds' },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(site.dateISO));
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(site.dateISO));
    tick();
    const interval = setInterval(tick, COUNTDOWN_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <p className="font-display text-2xl text-brand-700">{copy.weDid}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[560px] mx-auto" role="status" aria-live="polite" aria-atomic="true">
      {/* Header: Countdown to "I do" with ring icon and decorative line */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-brand-300/60" aria-hidden />
          <RingIcon />
          <span className="h-px w-6 bg-brand-300/60" aria-hidden />
        </div>
        <h3 className="font-display text-lg md:text-xl text-brand-800 tracking-wide">
          {copy.countdownToIDo}
        </h3>
        <div className="flex items-center gap-2 w-full max-w-[200px]">
          <span className="h-px flex-1 bg-brand-300/60" aria-hidden />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400/80" aria-hidden />
          <span className="h-px flex-1 bg-brand-300/60" aria-hidden />
        </div>
      </div>

      {/* Four glass-style countdown cards */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {partsConfig.map(({ key, labelKey }) => {
          const label = copy.countdownLabels[labelKey];
          const value = timeLeft[key];
          const display = key === 'days' ? value : pad(value);
          return (
            <motion.div
              key={key}
              className="rounded-xl md:rounded-2xl border border-brand-200/90 bg-white/85 backdrop-blur-sm shadow-sm py-4 px-2 md:py-5 md:px-3 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.motion / 1000, ease: easing.petal }}
            >
              <div className="font-display text-2xl md:text-3xl lg:text-4xl text-brand-900 tabular-nums leading-tight">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${key}-${value}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: duration.countdown / 1000, ease: easing.petal }}
                    className="inline-block"
                  >
                    {display}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="font-body text-xs md:text-sm text-brand-600 mt-1">{label ?? labelKey}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
