import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { duration, easing } from '../theme/tokens';
import { fadeUp } from '../theme/motionVariants';
import { site } from '../data/site';
import Lightbox from './Lightbox';

function EventBlock({ eventKey, titleKey, data }) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState(null);
  const base = import.meta.env.BASE_URL;

  const ext = data.format || 'jpg';
  const featuredSrc = `${base}${data.images.featured.replace(/^\//, '')}.${ext}`;
  const thumbSrcs = data.images.thumbs.map((p) => `${base}${p.replace(/^\//, '')}.${ext}`);

  const featuredAltKey = eventKey === 'wedding' ? 'photos.weddingFeaturedAlt' : 'photos.poolPartyFeaturedAlt';
  const thumbAltKey = eventKey === 'wedding' ? 'photos.weddingThumbAlt' : 'photos.poolPartyThumbAlt';

  return (
    <div>
      <div className="flex items-center gap-3 mb-6 md:mb-8" aria-hidden="true">
        <span className="h-px flex-1 bg-brand-300/60" />
        <h3 className="font-display text-section uppercase text-brand-900 tracking-widest">
          {t(titleKey)}
        </h3>
        <span className="h-px flex-1 bg-brand-300/60" />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-[55%]">
          <motion.img
            src={featuredSrc}
            alt={t(featuredAltKey)}
            className="w-full h-full object-cover rounded-2xl cursor-pointer"
            whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
            transition={{ duration: duration.motion / 1000, ease: easing.weddingRing }}
            onClick={() => setLightbox({ src: featuredSrc, alt: t(featuredAltKey) })}
          />
        </div>
        <div className="md:w-[45%] grid grid-cols-2 gap-3">
          {thumbSrcs.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={t(thumbAltKey, { n: i + 1 })}
              className="w-full aspect-square object-cover rounded-2xl cursor-pointer"
              whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
              transition={{ duration: duration.motion / 1000, ease: easing.weddingRing }}
              onClick={() => setLightbox({ src, alt: t(thumbAltKey, { n: i + 1 }) })}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href={data.albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          {t('photos.viewAll')}
        </a>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            albumUrl={data.albumUrl}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Photos() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="photos" aria-labelledby="photos-title" className="py-8 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-6" aria-hidden="true">
            <span className="h-px flex-1 max-w-[60px] bg-brand-300/60" />
            <span className="w-2 h-2 rounded-full bg-brand-400/80" />
            <span className="h-px flex-1 max-w-[60px] bg-brand-300/60" />
          </div>
          <h2
            id="photos-title"
            className="font-display text-section uppercase text-brand-900 tracking-widest mb-3"
          >
            {t('photos.heading')}
          </h2>
        </motion.div>

        <EventBlock eventKey="wedding" titleKey="photos.wedding" data={site.photos.wedding} />
        <div className="section-divider mx-auto max-w-[700px] my-12" aria-hidden="true" />
        <EventBlock eventKey="poolParty" titleKey="photos.poolParty" data={site.photos.poolParty} />
      </div>
    </section>
  );
}
