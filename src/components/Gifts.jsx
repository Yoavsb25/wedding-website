import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';

const CopyIcon = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const APP_LOGOS = {
  bit: `${import.meta.env.BASE_URL}images/bit-logo.png`,
  paybox: `${import.meta.env.BASE_URL}images/paybox-logo.jpg`,
};

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access denied
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-100 last:border-0">
      <div>
        <p className="text-xs text-brand-400 uppercase tracking-wider">{label}</p>
        <p className="text-brand-800 font-medium mt-0.5 tabular-nums">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className="ml-4 flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg px-2 py-1.5 min-h-[36px]"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="w-10 text-left">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.motion / 1000, ease: easing.soft },
  },
};

export default function Gifts() {
  const shouldReduceMotion = useReducedMotion();
  const { gifts } = site;

  return (
    <section id="gifts" aria-labelledby="gifts-title" className="py-16 md:py-24 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
            <span className="h-px flex-1 max-w-[60px] bg-brand-300/60" />
            <span className="w-2 h-2 rounded-full bg-brand-400/80" />
            <span className="h-px flex-1 max-w-[60px] bg-brand-300/60" />
          </div>
          <h2
            id="gifts-title"
            className="font-display text-section uppercase text-brand-900 tracking-widest mb-3"
          >
            Wedding Gift
          </h2>
          <p className="text-brand-500 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Thank you for celebrating with us ♡<br />
            Gift details are below - <strong>bank transfer is preferred</strong></p>
        </motion.div>

        {/* Bank transfer card — warm cream header + 3px gold top border signals priority */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mb-8"
        >
          <div className="rounded-2xl overflow-hidden border border-brand-200 ring-1 ring-brand-300/40 border-t-[3px] border-t-brand-500 shadow-[0_4px_24px_rgba(44,31,20,0.10)]">
            {/* Warm cream header — gold as text accent, not background */}
            <div className="bg-brand-100 px-5 py-4 flex items-center justify-between border-b border-brand-200">
              <span className="font-display text-brand-700 text-lg tracking-wide">
                Bank Transfer
              </span>
              <span className="flex items-center gap-1.5 text-brand-500 text-xs font-medium uppercase tracking-wider">
                <CheckIcon />
                Preferred · no fees
              </span>
            </div>
            {/* Fields */}
            <div className="px-6 py-5 bg-white/80">
              <CopyField label="Bank Code" value={gifts.bankCode} />
              <CopyField label="Branch" value={gifts.branchNumber} />
              <CopyField label="Account Number" value={gifts.accountNumber} />
              <div className="pt-3">
                <p className="text-xs text-brand-400 uppercase tracking-wider">Account Holder</p>
                <p className="text-brand-800 font-medium mt-0.5">{gifts.accountHolder}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick pay options — clearly secondary */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="flex items-center gap-3 mb-5" aria-hidden="true">
            <span className="h-px flex-1 bg-brand-200/60" />
            <span className="text-xs text-brand-300 uppercase tracking-widest whitespace-nowrap">
              or pay quickly with
            </span>
            <span className="h-px flex-1 bg-brand-200/60" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {gifts.quickPay.map(({ id, label, app, url }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-white/80 hover:border-brand-500 hover:bg-white px-4 py-3.5 text-sm font-medium text-brand-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={label}
              >
                <img
                  src={APP_LOGOS[app]}
                  alt=""
                  aria-hidden="true"
                  className="w-8 h-8 rounded-xl object-cover shrink-0"
                />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
