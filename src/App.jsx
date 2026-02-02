import { motion, useReducedMotion } from 'framer-motion';
import { duration, easing } from './theme/tokens';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Parking from './components/Parking';
import RsvpEmbed from './components/RsvpEmbed';
import FloatingNav from './components/FloatingNav';
import EventSchema from './components/EventSchema';
import { site } from './data/site';

function App() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <EventSchema />
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.motion / 1000,
        ease: easing.weddingRing,
      }}
      className="min-h-screen font-body text-brand-900 bg-brand-50 overflow-x-hidden"
    >
      <FloatingNav />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-20 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-xl"
      >
        Skip to main content
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
        <RsvpEmbed />
      </main>
      <footer className="py-12 md:py-16 text-center bg-brand-900 text-brand-100 mt-16">
        <p className="font-display text-2xl md:text-3xl uppercase tracking-widest">{site.coupleNames}</p>
        <p className="text-brand-200 mt-2 text-sm md:text-base">{site.footerDate}</p>
        {site.socialUrl && (
          <a
            href={site.socialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 rounded px-2 py-2"
            aria-label="Instagram or wedding album"
          >
            Instagram
          </a>
        )}
        <nav className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm" aria-label="Footer navigation">
          <a href="#hero" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">Home</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#schedule" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">Schedule</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#location" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">Location</a>
          <span className="text-brand-600" aria-hidden="true">|</span>
          <a href="#rsvp" className="text-brand-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded px-2 py-2 min-h-[44px] inline-flex items-center">RSVP</a>
        </nav>
        <p className="mt-8 text-brand-500 text-xs">© {new Date().getFullYear()} – With love</p>
      </footer>
    </motion.div>
    </>
  );
}

export default App;
