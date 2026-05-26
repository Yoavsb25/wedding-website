import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import he from './locales/he.json';
import es from './locales/es.json';

const savedLng = typeof localStorage !== 'undefined' ? (localStorage.getItem('lang') || 'he') : 'he';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
    es: { translation: es },
  },
  lng: savedLng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

const applyDir = (lng) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  document.title = i18n.t('hero.pageTitle');
  localStorage.setItem('lang', lng);
};

i18n.on('languageChanged', applyDir);
applyDir(i18n.language);

export default i18n;
