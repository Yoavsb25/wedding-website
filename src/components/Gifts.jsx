import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';
import { duration, easing } from '../theme/tokens';

const BANKS = [
  { id: 'hapoalim',  nameHe: 'הפועלים',    nameEn: 'Hapoalim', scheme: 'hapoalim' },
  { id: 'leumi',     nameHe: 'לאומי',        nameEn: 'Leumi',    scheme: 'leumi' },
  { id: 'mizrahi',   nameHe: 'מזרחי',        nameEn: 'Mizrahi',  scheme: 'mizrahitefahot' },
  { id: 'discount',  nameHe: 'דיסקונט',      nameEn: 'Discount', scheme: 'discount' },
  { id: 'fibi',      nameHe: 'הבינלאומי',    nameEn: 'FIBI',     scheme: 'fibi' },
  { id: 'yahav',     nameHe: 'יהב',          nameEn: 'Yahav',    scheme: 'yahav' },
];

const BankIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="14" height="14" x="8" y="8" rx="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

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

function TransferModal({ onClose }) {
  const { gifts } = site;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="transfer-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: easing.petal }}
        className="card max-w-sm w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-brand-300 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
        >
          <CloseIcon />
        </button>
        <h3 id="transfer-modal-title" className="font-display text-xl text-brand-900 mb-1 pr-8">
          העברה בנקאית
        </h3>
        <p className="text-brand-400 text-sm mb-5">Transfer to {gifts.accountHolder}</p>
        <CopyField label="Bank Code" value={gifts.bankCode} />
        <CopyField label="Branch" value={gifts.branchNumber} />
        <CopyField label="Account Number" value={gifts.accountNumber} />
        <div className="pt-3">
          <p className="text-xs text-brand-400 uppercase tracking-wider">Account Holder</p>
          <p className="text-brand-800 font-medium mt-0.5">{gifts.accountHolder}</p>
        </div>
      </motion.div>
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

const isMobileDevice = () =>
  typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

export default function Gifts() {
  const [modalOpen, setModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { gifts } = site;

  const handleBankClick = useCallback(
    (bank) => {
      if (!isMobileDevice()) {
        setModalOpen(true);
        return;
      }

      const params = new URLSearchParams({
        account: gifts.accountNumber,
        branch: gifts.branchNumber,
        bankCode: gifts.bankCode,
        name: gifts.accountHolder,
      });
      const deepLink = `${bank.scheme}://transfer?${params}`;

      let resolved = false;

      const onHide = () => {
        if (document.visibilityState === 'hidden') {
          resolved = true;
          document.removeEventListener('visibilitychange', onHide);
          clearTimeout(timer);
        }
      };

      const timer = setTimeout(() => {
        document.removeEventListener('visibilitychange', onHide);
        if (!resolved) setModalOpen(true);
      }, 500);

      document.addEventListener('visibilitychange', onHide);
      window.location.href = deepLink;
    },
    [gifts],
  );

  const handleBitClick = () => {
    window.location.href = `bit://send?phone=${encodeURIComponent(gifts.bitPhone)}`;
  };

  const handlePayboxClick = () => {
    window.location.href = `payboxapp://pay?phone=${encodeURIComponent(gifts.payboxPhone)}`;
  };

  return (
    <section id="gifts" aria-labelledby="gifts-title" className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
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
            Your presence is the greatest gift — but if you'd like to celebrate with a contribution,
            tap your bank below.
          </p>
        </motion.div>

        {/* Bank grid */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
          className="mb-10"
        >
          <p className="text-xs text-brand-400 uppercase tracking-widest text-center mb-4">
            Bank Transfer
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {BANKS.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleBankClick(bank)}
                aria-label={`Transfer via ${bank.nameEn}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-brand-200 bg-white/80 hover:border-brand-500 hover:bg-white active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="text-brand-400">
                  <BankIcon />
                </span>
                <span className="text-brand-800 font-medium text-sm leading-tight" dir="rtl">
                  {bank.nameHe}
                </span>
                <span className="text-brand-400 text-xs">{bank.nameEn}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Quick pay */}
        <motion.div
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3 w-full max-w-xs" aria-hidden="true">
            <span className="h-px flex-1 bg-brand-200/80" />
            <span className="text-xs text-brand-400 uppercase tracking-widest whitespace-nowrap">
              or pay quickly with
            </span>
            <span className="h-px flex-1 bg-brand-200/80" />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button onClick={handleBitClick} className="btn flex items-center gap-2 text-sm" aria-label="Pay with Bit">
              <span>Bit</span>
              <span className="text-white/60 text-xs">ביט</span>
            </button>
            <button onClick={handlePayboxClick} className="btn text-sm" aria-label="Pay with PayBox">
              PayBox
            </button>
          </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {modalOpen && <TransferModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
