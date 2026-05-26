import { useLayoutEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { duration, easing } from './theme/tokens';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Parking from './components/Parking';
import Gifts from './components/Gifts';
import EventSchema from './components/EventSchema';
import { site } from './data/site';
import LanguageSwitcher from './components/LanguageSwitcher';

const HASH_SCROLL_SETTLE_MS = 2500;
const HASH_SCROLL_MAX_WAIT_MS = 10000;
const HASH_SCROLL_TOLERANCE_PX = 1;

function getHashTarget() {
  const id = window.location.hash.slice(1);
  if (!id) return null;

  try {
    return document.getElementById(decodeURIComponent(id));
  } catch {
    return document.getElementById(id);
  }
}

function waitForHashLayoutInputs(target) {
  const imagesBeforeTarget = Array.from(document.images).filter((img) => {
    if (img.complete || img.loading === 'lazy') return false;
    return Boolean(img.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
  });

  const imagesReady = Promise.all(
    imagesBeforeTarget.map((img) => new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    }))
  );

  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  return Promise.allSettled([imagesReady, fontsReady]);
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);
}

function App() {
  const shouldReduceMotion = useReducedMotion();
  const { t, i18n } = useTranslation();

  const footerDate = new Date(site.dateISO).toLocaleDateString(
    i18n.language === 'he' ? 'he-IL' : i18n.language === 'es' ? 'es-ES' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (!window.location.hash) return undefined;

    let frameId;
    let cancelled = false;
    const root = document.documentElement;

    const scrollToTarget = (target) => {
      const top = target.getBoundingClientRect().top + window.scrollY;
      if (Math.abs(target.getBoundingClientRect().top) > HASH_SCROLL_TOLERANCE_PX) {
        window.scrollTo({ top, left: 0, behavior: 'auto' });
      }
    };

    const keepTargetAligned = () => {
      const target = getHashTarget();
      if (!target || cancelled) return;

      root.classList.add('hash-scroll-active');

      const tick = (stopAt) => {
        if (cancelled) return;

        scrollToTarget(target);

        if (performance.now() < stopAt) {
          frameId = requestAnimationFrame(() => tick(stopAt));
        } else {
          root.classList.remove('hash-scroll-active');
        }
      };

      withTimeout(waitForHashLayoutInputs(target), HASH_SCROLL_MAX_WAIT_MS).then(() => {
        if (cancelled) return;
        const stopAt = performance.now() + HASH_SCROLL_SETTLE_MS;
        frameId = requestAnimationFrame(() => tick(stopAt));
      });
    };

    frameId = requestAnimationFrame(keepTargetAligned);

    return () => {
      cancelled = true;
      root.classList.remove('hash-scroll-active');
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <EventSchema />
      <LanguageSwitcher />
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
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
        <Gifts />
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
          <a href="#gifts" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">{t('nav.gift')}</a>
        </nav>
        <p className="mt-8 text-brand-500 text-xs">{t('footer.love', { year: new Date().getFullYear() })}</p>
      </footer>
    </motion.div>
    </>
  );
}

export default App;
