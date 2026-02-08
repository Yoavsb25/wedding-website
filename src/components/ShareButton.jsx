import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { SHARE_COPY_RESET_MS } from '../constants';
import { duration, easing } from '../theme/tokens';
import { ShareIcon } from './Icons';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleShare = useCallback(async () => {
    setError(false);
    const url = window.location.href;
    const title = document.title || site.title;

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
      setTimeout(() => setCopied(false), SHARE_COPY_RESET_MS);
    } catch {
      setError(true);
    }
  }, []);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={handleShare}
        className="btn-secondary"
        whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
        whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
        transition={{ duration: duration.motion / 1000, ease: easing.soft }}
        aria-label={copy.sharePageAria}
      >
        <ShareIcon />
        {copy.share}
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
          {copy.linkCopied}
        </motion.span>
      )}
      {error && (
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs whitespace-nowrap z-10">
          {copy.couldNotShare}
        </span>
      )}
    </div>
  );
}
