import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';
import Countdown from './Countdown';
import AddToCalendar from './AddToCalendar';
import ShareButton from './ShareButton';

const container = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: (i?.reduced ?? false) ? 0 : 0.05,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.motion / 1000,
      ease: easing.weddingRing,
    },
  }),
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { t, i18n } = useTranslation();

  const dateFormatted = new Date(site.dateISO).toLocaleDateString(
    i18n.language === 'he' ? 'he-IL' : i18n.language === 'es' ? 'es-ES' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <motion.section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 py-20 md:py-28"
      variants={container}
      initial="hidden"
      animate="visible"
      custom={{ reduced: shouldReduceMotion }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(90,111,148,0.08),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 min-w-0 max-w-[700px] mx-auto space-y-4 md:space-y-6">
        <motion.h1
          variants={item}
          className="font-display text-hero-sub uppercase text-brand-900 font-normal"
        >
          {t('hero.gettingMarried')}
        </motion.h1>
        <motion.p variants={item} className="font-display text-hero-sub text-brand-900 font-bold">
          {t('hero.coupleNames')}
        </motion.p>
        <motion.p variants={item} className="font-display text-lg text-brand-800">
          {dateFormatted}
        </motion.p>
        <motion.p variants={item} className="font-display text-lg text-brand-800">
          {site.venueFullName}, Tel Aviv
        </motion.p>

        <motion.div variants={item}>
          <Countdown />
        </motion.div>
        <motion.div
          variants={item}
          className="w-full mt-4 flex justify-center"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}images/Cuple.png`}
            alt={t('hero.coupleIllustrationAlt')}
            className="w-full h-auto block object-contain md:max-w-md md:mx-auto"
            width={1408}
            height={3040}
            loading="eager"
            whileHover={!shouldReduceMotion ? { scale: 1.03 } : undefined}
            transition={{ duration: duration.motion / 1000, ease: easing.soft }}
          />
        </motion.div>

        <motion.div variants={item} className="w-full mt-5">
          <div className="flex items-center justify-center gap-3 text-brand-600 text-sm">
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="shrink-0 font-medium">{t('hero.addToCalendar')}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300/80" aria-hidden="true" />
            <span className="flex-1 max-w-12 h-px bg-brand-300/60" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <AddToCalendar />
            <ShareButton />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
