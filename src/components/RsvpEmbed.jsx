import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.petal },
  },
};

export default function RsvpEmbed() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="rsvp"
      className="py-16 md:py-24 px-4 bg-brand-100/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      <div className="max-w-[700px] mx-auto">
        <motion.h2
          variants={item}
          className="font-display text-2xl md:text-3xl uppercase tracking-widest text-brand-900 mb-4 text-center"
        >
          RSVP
        </motion.h2>
        <motion.p variants={item} className="text-center text-brand-800 mb-8">
          {site.rsvpNote}
        </motion.p>
        <motion.div variants={item} className="relative min-h-[400px] rounded-2xl overflow-hidden bg-brand-100">
          <AnimatePresence mode="wait">
            {!iframeLoaded && (
              <motion.div
                key="placeholder"
                className="absolute inset-0 flex items-center justify-center text-brand-500"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.motion / 1000, ease: easing.soft }}
              >
                Loading RSVP form…
              </motion.div>
            )}
          </AnimatePresence>
          <motion.iframe
            src={site.rsvpFormEmbedUrl}
            title="RSVP form"
            className="w-full min-h-[400px] border-0 rounded-2xl"
            onLoad={() => setIframeLoaded(true)}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: iframeLoaded ? 1 : 0 }}
            transition={{ duration: duration.motion / 1000, ease: easing.soft }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
