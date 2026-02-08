import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { duration, easing } from '../theme/tokens';
import { buildIcsContent, buildGoogleCalendarUrl, downloadIcs } from '../utils/calendar';
import { AppleCalendarIcon, GoogleCalendarIcon } from './Icons';

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
        className="btn-secondary"
        aria-label={copy.addToAppleCalendarAria}
        whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
        transition={{ duration: duration.motion / 1000, ease: easing.soft }}
      >
        <span className="inline-flex shrink-0 w-4 h-4 items-center justify-center" aria-hidden="true">
          <AppleCalendarIcon />
        </span>
        {copy.appleCalendar}
      </motion.button>
      <motion.a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
        aria-label={copy.addToGoogleCalendarAria}
        whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
        transition={{ duration: duration.motion / 1000, ease: easing.soft }}
      >
        <span className="inline-flex shrink-0 w-4 h-4 items-center justify-center rounded-sm overflow-hidden" aria-hidden="true">
          <GoogleCalendarIcon />
        </span>
        {copy.googleCalendar}
      </motion.a>
    </div>
  );
}
