import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';
import { staggerContainer, fadeUpItem } from '../theme/motionVariants';

export default function Parking() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <motion.section
      id="parking"
      className="py-16 md:py-24 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-[900px] mx-auto">
        <motion.h2
          variants={fadeUpItem}
          className="font-display text-section uppercase text-brand-900 mb-6 text-center"
        >
          {t('parking.heading')}
        </motion.h2>
        <motion.div variants={fadeUpItem} className="card text-center space-y-6">
          <p className="font-display text-xl text-brand-900">{t('parking.name')}</p>
          <p className="text-brand-800">{t('parking.instructions')}</p>

          <motion.a
            href={site.parkingMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-block"
            whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
            transition={{ duration: duration.motion / 1000, ease: easing.soft }}
          >
            {t('parking.openMaps')}
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
