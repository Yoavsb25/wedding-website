import { motion } from 'framer-motion';
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
  return (
    <motion.section
      id="parking"
      className="py-16 md:py-24 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      <div className="max-w-[700px] mx-auto">
        <motion.h2
          variants={item}
          className="font-display text-2xl md:text-3xl uppercase tracking-widest text-brand-900 mb-6 text-center"
        >
          Parking
        </motion.h2>
        <motion.div variants={item} className="card">
          <p className="text-brand-800">
            Parking details will be available closer to the date. The venue is located at 48 Rothschild Boulevard with nearby street and garage options.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
