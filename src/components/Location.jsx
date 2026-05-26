import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';
import { staggerContainer, fadeUpItem } from '../theme/motionVariants';

export default function Location() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <motion.section
      id="location"
      className="py-16 md:py-24 px-4 bg-brand-100/50"
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
          {t('location.heading')}
        </motion.h2>
        <motion.div variants={fadeUpItem} className="card text-center space-y-6">
          <p className="font-display text-xl text-brand-900">{site.venueFullName}</p>
          <p className="text-brand-800">{t('location.address')}</p>

          {site.venueImages && site.venueImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {site.venueImages.map((path, i) => (
                <div key={path} className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] min-h-[240px]">
                  <motion.img
                    src={`${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`}
                    alt={i === 0
                      ? t('location.venueExteriorAlt', { venue: site.venueFullName })
                      : t('location.venueGardenAlt', { venue: site.venueFullName })}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    whileHover={!shouldReduceMotion ? { scale: 1.05 } : undefined}
                    transition={{ duration: duration.motion / 1000, ease: easing.soft }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-brand-700 font-display text-sm font-medium">{t('location.findUs')}</p>
            <div className="rounded-2xl overflow-hidden border border-brand-200 aspect-video w-full max-h-[400px] min-h-[280px]">
              <iframe
                src={site.mapsEmbedUrl}
                title={t('location.mapTitle', { venue: site.venueFullName })}
                className="w-full h-full min-h-[280px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <motion.a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-block"
            whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' } : undefined}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
            transition={{ duration: duration.motion / 1000, ease: easing.soft }}
          >
            {t('location.openMaps')}
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
