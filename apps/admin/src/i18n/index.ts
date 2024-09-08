import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from './resources';
import config from '../../config';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: config.locales.supported,
    lng: config.locales.default,
    fallbackLng: config.locales.fallback,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });
