import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Location() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="location"
      className="py-16 md:py-24 px-4 bg-brand-100/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      <div className="max-w-[900px] mx-auto">
        <motion.h2
          variants={item}
          className="font-display text-2xl md:text-3xl uppercase tracking-widest text-brand-900 mb-6 text-center"
        >
          Location
        </motion.h2>
        <motion.div variants={item} className="card text-center space-y-6">
          <p className="font-display text-xl text-brand-900">{site.venueFullName}</p>
          <p className="text-brand-800">{site.address}</p>

          {site.venueImages && site.venueImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {site.venueImages.map((path, i) => (
                <div key={path} className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] min-h-[240px]">
                  <img
                    src={`${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`}
                    alt={i === 0 ? `${site.venueFullName} – exterior` : `${site.venueFullName} – garden`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-brand-700 font-body text-sm font-medium">Find us on the map</p>
            <div className="rounded-2xl overflow-hidden border border-brand-200 aspect-video w-full max-h-[400px] min-h-[280px]">
              <iframe
                src={site.mapsEmbedUrl}
                title={`Map showing ${site.venueFullName} location`}
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
            Open in Google Maps
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
