import { useEffect, useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { duration, easing } from './theme/tokens';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Parking from './components/Parking';
import Photos from './components/Photos';
import EventSchema from './components/EventSchema';
import { site } from './data/site';
import LanguageSwitcher from './components/LanguageSwitcher';


function App() {
  const shouldReduceMotion = useReducedMotion();
  const { t, i18n } = useTranslation();

  const footerDate = new Date(site.dateISO).toLocaleDateString(
    i18n.language === 'he' ? 'he-IL' : i18n.language === 'es' ? 'es-ES' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  // Set scrollRestoration before paint so the browser can't restore a prior
  // scroll position before our hash-scroll effect runs.
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const scroll = () => {
      const el = (() => {
        try { return document.getElementById(decodeURIComponent(id)); } catch { return document.getElementById(id); }
      })();
      if (!el) return;
      // Inline style beats CSS scroll-behavior:smooth — Safari ignores
      // behavior:'instant' on the JS API when the CSS property is set.
      const html = document.documentElement;
      html.style.scrollBehavior = 'auto';
      el.scrollIntoView({ block: 'start', behavior: 'instant' });
      requestAnimationFrame(() => { html.style.scrollBehavior = ''; });
    };

    if (document.readyState === 'complete') {
      scroll();
    } else {
      window.addEventListener('load', scroll, { once: true });
      return () => window.removeEventListener('load', scroll);
    }
  }, []);

  // Skip the y-shift on hash navigation — the entry transform causes scrollIntoView
  // to overshoot by the transform amount, leaving the section misaligned.
  const hasHash = Boolean(window.location.hash);

  return (
    <>
      <EventSchema />
      <LanguageSwitcher />
    <motion.div
      initial={shouldReduceMotion ? false : hasHash ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.motion / 1000,
        ease: easing.weddingRing,
      }}
      className="min-h-screen font-display text-brand-900 bg-brand-50 overflow-x-hidden"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-20 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-xl"
      >
        {t('footer.skipLink')}
      </a>
      <main id="main-content" className="mx-auto max-w-full" tabIndex={-1}>
        <Hero />
        <div className="section-divider mx-auto max-w-[700px]" aria-hidden="true" />
        <Schedule />
        <div className="section-divider mx-auto max-w-[700px]" aria-hidden="true" />
        <Location />
        <div className="section-divider mx-auto max-w-[700px]" aria-hidden="true" />
        <Parking />
        <div className="section-divider mx-auto max-w-[700px]" aria-hidden="true" />
        <Photos />
      </main>
      <footer className="py-12 md:py-16 text-center bg-brand-900 text-brand-100 mt-16">
        <p className="font-display text-2xl md:text-3xl uppercase tracking-widest">{t('hero.coupleNames')}</p>
        <p className="text-brand-200 mt-2 text-sm md:text-base">{footerDate}</p>
        {site.socialUrl && (
          <a
            href={site.socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 rounded px-2 py-2"
            aria-label={t('footer.instagramLabel')}
          >
            Instagram
          </a>
        )}
        <nav className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm" aria-label="Footer navigation">
          <a href="#hero" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">{t('nav.home')}</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#schedule" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">{t('nav.schedule')}</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#location" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">{t('nav.location')}</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#parking" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">{t('nav.parking')}</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#photos" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">{t('nav.photos')}</a>
        </nav>
        <p className="mt-8 text-brand-500 text-xs">{t('footer.love', { year: new Date().getFullYear() })}</p>
      </footer>
    </motion.div>
    </>
  );
}

export default App;
