import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';

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

const ringIcon = (
  <svg className="w-5 h-5 text-brand-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const partsConfig = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hours' },
  { key: 'minutes', label: 'minutes' },
  { key: 'seconds', label: 'seconds' },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(site.dateISO));
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(site.dateISO));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft === null) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <p className="font-display text-2xl text-brand-700">We did!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[560px] mx-auto" role="status" aria-live="polite" aria-atomic="true">
      {/* Header: Countdown to "I do" with ring icon and decorative line */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="h-px w-6 bg-brand-300/60" aria-hidden />
          {ringIcon}
          <span className="h-px w-6 bg-brand-300/60" aria-hidden />
        </div>
        <h3 className="font-display text-lg md:text-xl text-brand-800 tracking-wide">
          Countdown to &ldquo;I do&rdquo;
        </h3>
        <div className="flex items-center gap-2 w-full max-w-[200px]">
          <span className="h-px flex-1 bg-brand-300/60" aria-hidden />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400/80" aria-hidden />
          <span className="h-px flex-1 bg-brand-300/60" aria-hidden />
        </div>
      </div>

      {/* Four glass-style countdown cards */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {partsConfig.map(({ key, label }) => {
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
              <p className="font-body text-xs md:text-sm text-brand-600 mt-1">{label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
