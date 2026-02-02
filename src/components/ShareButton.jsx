import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { duration, easing } from '../theme/tokens';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleShare = useCallback(async () => {
    setError(false);
    const url = window.location.href;
    const title = document.title || 'Maya & Yoav\'s Wedding';

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title,
          url,
          text: title,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(true);
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
    }
  }, []);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 border border-brand-400 text-brand-800 text-sm font-medium hover:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
        transition={{ duration: duration.motion / 1000, ease: easing.soft }}
        aria-label="Share this page"
      >
        Share
      </motion.button>
      {copied && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg bg-brand-800 text-white text-xs font-medium whitespace-nowrap shadow-lg z-10"
          role="status"
          aria-live="polite"
        >
          Link copied!
        </motion.span>
      )}
      {error && (
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs whitespace-nowrap z-10">
          Could not share or copy
        </span>
      )}
    </div>
  );
}
