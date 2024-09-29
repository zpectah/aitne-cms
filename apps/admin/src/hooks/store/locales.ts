import { create } from 'zustand';

import config from '../../../config';
import { STORAGE_LOCALES_KEY } from '../../constants';

interface LocalesStore {
  locale: string;
  setLocale: (locale: string) => void;
}

const useLocalesStore = create<LocalesStore>((set) => {
  const current = window.localStorage.getItem(STORAGE_LOCALES_KEY) ?? config.locales.default;

  const setLocalesHandler = (locale: string) => {
    set({ locale });
    window.localStorage.setItem(STORAGE_LOCALES_KEY, locale);
  };

  return {
    locale: current,
    setLocale: setLocalesHandler,
  };
});

export default useLocalesStore;
