import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';
import { buildIcsContent, buildGoogleCalendarUrl, downloadIcs } from '../utils/calendar';

export default function AddToCalendar() {
  const shouldReduceMotion = useReducedMotion();

  const handleAddToCalendar = () => {
    const content = buildIcsContent(site);
    downloadIcs(content);
  };

  const googleUrl = buildGoogleCalendarUrl(site);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <motion.button
        type="button"
        onClick={handleAddToCalendar}
        className="btn text-sm"
        whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
        transition={{ duration: duration.motion / 1000, ease: easing.soft }}
      >
        Add to calendar (.ics)
      </motion.button>
      <motion.a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-xl px-4 py-2.5 border border-brand-400 text-brand-800 text-sm font-medium hover:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
        transition={{ duration: duration.motion / 1000, ease: easing.soft }}
      >
        Google Calendar
      </motion.a>
    </div>
  );
}
