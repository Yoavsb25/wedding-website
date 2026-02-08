import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { SECTION_IDS } from '../constants';
import { duration, easing, layout } from '../theme/tokens';
import { getSectionContainerReveal, sectionItem } from '../theme/motionVariants';

export default function RsvpEmbed() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={SECTION_IDS.RSVP}
      className={layout.sectionPaddingWithBg}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: layout.viewportMargin }}
      variants={getSectionContainerReveal({ staggerChildren: 0.08, delayChildren: 0.05 })}
      custom={{ reduced: shouldReduceMotion }}
    >
      <div className={`${layout.contentMaxWidthNarrow} mx-auto`}>
        <motion.h2
          variants={sectionItem}
          className="font-display text-section uppercase text-brand-900 mb-4 text-center"
        >
          {copy.rsvp}
        </motion.h2>
        <motion.p variants={sectionItem} className="text-center text-brand-800 mb-4">
          {site.rsvpNote}
        </motion.p>
        <motion.p variants={sectionItem} className="text-center mb-6">
          <a
            href={site.rsvpFormEmbedUrl.replace('/viewform?embedded=true', '/viewform')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:text-brand-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded"
          >
            {copy.openFormInNewTab}
          </a>
        </motion.p>
        <motion.div variants={sectionItem} className={`relative ${layout.rsvpMinHeight} rounded-2xl overflow-hidden bg-brand-100`}>
          <AnimatePresence mode="wait">
            {!iframeLoaded && (
              <motion.div
                key="placeholder"
                className="absolute inset-0 flex items-center justify-center text-brand-500"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.motion / 1000, ease: easing.soft }}
              >
                {copy.loadingRsvpForm}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.iframe
            src={site.rsvpFormEmbedUrl}
            title="RSVP form"
            className={`w-full ${layout.rsvpMinHeight} border-0 rounded-2xl`}
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
