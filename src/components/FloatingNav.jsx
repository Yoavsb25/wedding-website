import { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { duration, easing } from '../theme/tokens';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'location', label: 'Location' },
  { id: 'parking', label: 'Parking' },
  { id: 'rsvp', label: 'RSVP' },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom < 80);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!visible) return null;

  return (
    <motion.nav
      initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: duration.motion / 1000, ease: easing.soft }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 rounded-full bg-white/95 shadow-lg border border-brand-200 px-2 py-1.5 backdrop-blur-sm"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollTo(id);
          }}
          className={`min-h-[36px] min-w-[36px] inline-flex items-center justify-center rounded-full text-xs font-medium px-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
            activeId === id
              ? 'bg-brand-600 text-white'
              : 'text-brand-700 hover:bg-brand-100'
          }`}
          aria-current={activeId === id ? 'true' : undefined}
        >
          {label}
        </a>
      ))}
    </motion.nav>
  );
}
