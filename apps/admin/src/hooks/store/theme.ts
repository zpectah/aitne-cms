import { create } from 'zustand';

import config from '../../../config';
import { ThemeMode } from '../../types';
import { STORAGE_THEME_MODE_KEY } from '../../constants';

interface ThemeStore {
  mode: ThemeMode;
  setMode: (locale: ThemeMode) => void;
}

const useThemeStore = create<ThemeStore>((set) => {
  const current = window.localStorage.getItem(STORAGE_THEME_MODE_KEY) ?? config.theme.mode;

  const setModeHandler = (mode: ThemeMode) => {
    set({ mode });
    window.localStorage.setItem(STORAGE_THEME_MODE_KEY, mode);
  };

  return {
    mode: current as ThemeMode,
    setMode: setModeHandler,
  };
});

export default useThemeStore;
