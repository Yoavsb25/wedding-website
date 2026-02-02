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
      <p className="text-lg text-brand-700 font-display" role="status" aria-live="polite">
        We did!
      </p>
    );
  }

  const { days, hours, minutes, seconds } = timeLeft;
  const parts = [
    { value: days, label: 'days' },
    { value: hours, label: 'hours' },
    { value: minutes, label: 'minutes' },
    { value: seconds, label: 'seconds' },
  ];

  return (
    <div className="text-center space-y-2" role="status" aria-live="polite" aria-atomic="true">
      <p className="text-lg text-brand-700 font-display">
        {parts.map(({ value, label }, i) => (
          <span key={label}>
            {i > 0 && <span className="text-brand-400 mx-1" aria-hidden="true">·</span>}
            <span className="tabular-nums">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${label}-${value}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: duration.countdown / 1000, ease: easing.petal }}
                  className="inline-block"
                >
                  {label === 'days' ? value : pad(value)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-brand-600 font-body text-sm ml-0.5">{label}</span>
          </span>
        ))}
      </p>
      <p className="text-brand-600 font-body text-sm">
        until we say &ldquo;I do&rdquo;
      </p>
    </div>
  );
}
