import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'he', label: 'עב' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const prefersReduced = useReducedMotion();
  const active = i18n.language;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full shadow-md p-1 gap-0.5">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={active === code}
          className={`relative px-3 py-1.5 text-xs font-sans font-medium rounded-full transition-colors ${
            active === code ? 'text-brand-900' : 'text-white/70 hover:text-white'
          }`}
        >
          {active === code && (
            prefersReduced ? (
              <span className="bg-brand-500 rounded-full absolute inset-0" />
            ) : (
              <motion.span
                layoutId="lang-indicator"
                className="bg-brand-500 rounded-full absolute inset-0"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )
          )}
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
}
