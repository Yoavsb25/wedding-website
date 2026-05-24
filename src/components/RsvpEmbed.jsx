import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';
import { staggerContainer, fadeUpItem } from '../theme/motionVariants';

export default function RsvpEmbed() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <motion.section
      id="rsvp"
      className="py-16 md:py-24 px-4 bg-brand-100/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-[700px] mx-auto">
        <motion.h2
          variants={fadeUpItem}
          className="font-display text-section uppercase text-brand-900 mb-4 text-center"
        >
          {t('rsvp.heading')}
        </motion.h2>
        <motion.p variants={fadeUpItem} className="text-center text-brand-800 mb-4">
          {t('rsvp.note')}
        </motion.p>
        <motion.p variants={fadeUpItem} className="text-center mb-6">
          <a
            href={site.rsvpFormEmbedUrl.replace('/viewform?embedded=true', '/viewform')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:text-brand-800 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded"
          >
            {t('rsvp.openTab')}
          </a>
        </motion.p>
        <motion.div variants={fadeUpItem} className="relative min-h-[400px] rounded-2xl overflow-hidden bg-brand-100">
          <AnimatePresence mode="wait">
            {!iframeLoaded && (
              <motion.div
                key="placeholder"
                className="absolute inset-0 flex items-center justify-center text-brand-500"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.motion / 1000, ease: easing.soft }}
              >
                {t('rsvp.loading')}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.iframe
            src={site.rsvpFormEmbedUrl}
            title={t('rsvp.formTitle')}
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
