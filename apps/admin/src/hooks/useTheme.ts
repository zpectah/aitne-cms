import { useColorScheme } from '@mui/material/styles';

import config from '../../config';
import { useThemeStore } from './store';
import { ThemeMode } from '../types';
import { STORAGE_THEME_MODE_KEY } from '../constants';
import { themeModeKeys } from '../enums';

export const useTheme = () => {
  const { mode, setMode } = useColorScheme();
  const store = useThemeStore();

  const setModeHandler = (m: ThemeMode) => {
    setMode(m);
    store.setMode(m);
  };

  const toggleModeHandler = () => {
    let val;

    switch (mode) {
      case themeModeKeys.dark:
        val = themeModeKeys.system;
        break;
      case themeModeKeys.light:
        val = themeModeKeys.dark;
        break;
      case themeModeKeys.system:
      default:
        val = themeModeKeys.light;
        break;
    }

    setModeHandler(val as ThemeMode);
  };

  const initHandler = () => {
    const current = window.localStorage.getItem(STORAGE_THEME_MODE_KEY) ?? config.theme.mode;

    setModeHandler(current as ThemeMode);
  };

  return {
    mode,
    setMode: setModeHandler,
    toggleMode: toggleModeHandler,
    init: initHandler,
  };
};
