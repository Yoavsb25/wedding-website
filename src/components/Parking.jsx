import { motion, useReducedMotion } from 'framer-motion';
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

export default function Parking() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="parking"
      className="py-16 md:py-24 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      <div className="max-w-[900px] mx-auto">
        <motion.h2
          variants={item}
          className="font-display text-section uppercase text-brand-900 mb-6 text-center"
        >
          Parking
        </motion.h2>
        <motion.div variants={item} className="card text-center space-y-6">
          <p className="font-display text-xl text-brand-900">{site.parkingName}</p>
          <p className="text-brand-800">{site.parkingInstructions}</p>

          <motion.a
            href={site.parkingMapsUrl}
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
