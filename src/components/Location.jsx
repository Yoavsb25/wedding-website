import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { SECTION_IDS } from '../constants';
import { duration, easing, layout } from '../theme/tokens';
import { getSectionContainerReveal, sectionItem } from '../theme/motionVariants';

export default function Location() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={SECTION_IDS.LOCATION}
      className={layout.sectionPaddingWithBg}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: layout.viewportMargin }}
      variants={getSectionContainerReveal()}
      custom={{ reduced: shouldReduceMotion }}
    >
      <div className={`${layout.contentMaxWidthWide} mx-auto`}>
        <motion.h2
          variants={sectionItem}
          className="font-display text-section uppercase text-brand-900 mb-6 text-center"
        >
          {copy.location}
        </motion.h2>
        <motion.div variants={sectionItem} className="card text-center space-y-6">
          <p className="font-display text-xl text-brand-900">{site.venueFullName}</p>
          <p className="text-brand-800">{site.address}</p>

          {site.venueImages && site.venueImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {site.venueImages.map((path, i) => (
                <div key={path} className={`rounded-2xl overflow-hidden shadow-md aspect-[4/3] ${layout.venueImageMinHeight}`}>
                  <motion.img
                    src={`${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`}
                    alt={i === 0 ? `${site.venueFullName} – exterior` : `${site.venueFullName} – garden`}
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
            <p className="text-brand-700 font-body text-sm font-medium">{copy.findUsOnMap}</p>
            <div className={`rounded-2xl overflow-hidden border border-brand-200 aspect-video w-full max-h-[400px] ${layout.mapMinHeight}`}>
              <iframe
                src={site.mapsEmbedUrl}
                title={`Map showing ${site.venueFullName} location`}
                className={`w-full h-full ${layout.mapMinHeight} border-0`}
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
            {copy.openInGoogleMaps}
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
