import { useTranslation } from 'react-i18next';

import config from '../../config';
import { useLocalesStore } from './store';
import { STORAGE_LOCALES_KEY } from '../constants';

export const useLocales = () => {
  const { i18n } = useTranslation();
  const { locale, setLocale } = useLocalesStore();

  const setLocalesHandler = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      setLocale(lang);
    });
  };

  const initHandler = () => {
    const current = window.localStorage.getItem(STORAGE_LOCALES_KEY) ?? config.locales.default;

    setLocalesHandler(current);
  };

  return {
    locale,
    setLocales: setLocalesHandler,
    init: initHandler,
  };
};
