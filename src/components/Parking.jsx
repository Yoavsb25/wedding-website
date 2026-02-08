import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { copy } from '../data/copy';
import { SECTION_IDS } from '../constants';
import { duration, easing, layout } from '../theme/tokens';
import { getSectionContainerReveal, sectionItem } from '../theme/motionVariants';

export default function Parking() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={SECTION_IDS.PARKING}
      className={layout.sectionPadding}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: layout.viewportMargin }}
      variants={getSectionContainerReveal({ staggerChildren: 0.08, delayChildren: 0.05 })}
      custom={{ reduced: shouldReduceMotion }}
    >
      <div className={`${layout.contentMaxWidthWide} mx-auto`}>
        <motion.h2
          variants={sectionItem}
          className="font-display text-section uppercase text-brand-900 mb-6 text-center"
        >
          {copy.parking}
        </motion.h2>
        <motion.div variants={sectionItem} className="card text-center space-y-6">
          <p className="font-display text-xl text-brand-900">{site.parkingName}</p>
          <p className="text-brand-800">{site.parkingInstructions}</p>

          <div className="space-y-2">
            <p className="text-brand-700 font-body text-sm font-medium">{copy.findParkingOnMap}</p>
            <div className={`rounded-2xl overflow-hidden border border-brand-200 aspect-video w-full max-h-[400px] ${layout.mapMinHeight}`}>
              <iframe
                src={site.parkingMapsEmbedUrl}
                title={`Map showing ${site.parkingName}`}
                className={`w-full h-full ${layout.mapMinHeight} border-0`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <motion.a
            href={site.parkingMapsUrl}
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
