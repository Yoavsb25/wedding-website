import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { duration, easing } from '../theme/tokens';

export default function Lightbox({ src, alt, albumUrl, onClose }) {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const el = dialogRef.current;
      if (!el) return;
      const focusable = Array.from(
        el.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      ).filter((n) => !n.hasAttribute('disabled'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.motion / 1000, ease: easing.weddingRing }}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label={t('photos.close')}
      >
        ✕
      </button>
      <motion.img
        src={src}
        alt={alt}
        className="max-h-[85vh] object-contain rounded-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: duration.motion / 1000, ease: easing.weddingRing }}
        onClick={(e) => e.stopPropagation()}
      />
      {albumUrl && (
        <a
          href={albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-white/80 hover:text-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {t('photos.viewFullAlbum')}
        </a>
      )}
    </motion.div>
  );
}
