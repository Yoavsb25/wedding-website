import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { fadeUp } from '../theme/motionVariants';
import { CopyIcon, CheckIcon } from './icons';

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

function SideSelector({ value, onChange }) {
  return (
    <div className="mb-4">
      <p className="text-xs text-brand-400 uppercase tracking-wider mb-2">
        Whose guest are you?
      </p>
      <div className="flex gap-2">
        {['maya', 'yoav'].map((side) => (
          <button
            key={side}
            onClick={() => onChange(side)}
            className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500
              ${value === side
                ? 'border-brand-500 bg-brand-500/10 text-brand-700'
                : 'border-brand-200 bg-white/80 text-brand-500 hover:border-brand-400'
              }`}
          >
            {side === 'maya' ? "Maya's guest" : "Yoav's guest"}
          </button>
        ))}
      </div>
    </div>
  );
}

function AccordionRow({ label, open, onToggle, children }) {
  return (
    <div className="rounded-2xl border border-brand-200 bg-white/80 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-brand-100 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}

function PayLink({ entry }) {
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-white hover:border-brand-500 hover:bg-white px-4 py-3.5 text-sm font-medium text-brand-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      aria-label={entry.label}
    >
      <img
        src={APP_LOGOS[entry.app]}
        alt=""
        aria-hidden="true"
        className="w-8 h-8 rounded-xl object-cover shrink-0"
      />
      <span>{entry.label}</span>
    </a>
  );
}

export default function Gifts() {
  const shouldReduceMotion = useReducedMotion();
  const { gifts, copy } = site;

  const [sideSelection, setSideSelection] = useState(null);
  const [payboxOpen, setPayboxOpen] = useState(false);
  const [bitOpen, setBitOpen] = useState(false);

  const payboxEntry = gifts.quickPay.find(
    (e) => e.app === 'paybox' && e.side === sideSelection
  );
  const bitEntry = gifts.quickPay.find(
    (e) => e.app === 'bit' && e.side === sideSelection
  );

  return (
    <section id="gifts" aria-labelledby="gifts-title" className="py-8 md:py-24 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-6 md:mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-6" aria-hidden="true">
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
            {copy.gifts.tagline}<br />
            <span dangerouslySetInnerHTML={{ __html: copy.gifts.note }} />
          </p>
        </motion.div>

        {/* Bank transfer card */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-4 md:mb-8"
        >
          <div className="rounded-2xl overflow-hidden border border-brand-200 ring-1 ring-brand-300/40 border-t-[3px] border-t-brand-500 shadow-[0_4px_24px_rgba(44,31,20,0.10)]">
            <div className="bg-brand-100 px-5 py-4 flex items-center justify-between border-b border-brand-200">
              <span className="font-display text-brand-700 text-lg tracking-wide">
                Bank Transfer
              </span>
              <span className="flex items-center gap-1.5 text-brand-500 text-xs font-medium uppercase tracking-wider">
                <CheckIcon />
                <strong>Preferred • No Fees</strong>
              </span>
            </div>
            <div className="px-6 py-5 bg-white/80">
              <CopyField label="Bank Name" value={gifts.bankName} />
              <CopyField label="Branch" value={gifts.branchNumber} />
              <CopyField label="Account Number" value={gifts.accountNumber} />
              <CopyField label="Account Holder" value={gifts.accountHolder} />
            </div>
          </div>
        </motion.div>

        {/* Progressive-disclosure quick-pay tiers */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          variants={fadeUp}
          className="flex flex-col gap-3"
        >
          {/* Tier 2 — PayBox */}
          <AccordionRow
            label="Can't do a bank transfer?"
            open={payboxOpen}
            onToggle={() => setPayboxOpen((v) => !v)}
          >
            <SideSelector value={sideSelection} onChange={setSideSelection} />
            {payboxEntry && <PayLink entry={payboxEntry} />}
          </AccordionRow>

          {/* Tier 3 — Bit */}
          <AccordionRow
            label="Last resort — Bit"
            open={bitOpen}
            onToggle={() => setBitOpen((v) => !v)}
          >
            {sideSelection === null && (
              <SideSelector value={sideSelection} onChange={setSideSelection} />
            )}
            {bitEntry && <PayLink entry={bitEntry} />}
          </AccordionRow>
        </motion.div>
      </div>
    </section>
  );
}
