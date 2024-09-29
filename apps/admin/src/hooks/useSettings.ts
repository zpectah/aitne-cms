import { SettingsModel } from '@model';
import { useSettingsQuery } from './model';

const SETTINGS_DEFAULT: SettingsModel = {
  'app.language_default': 'en',
  'app.language_active': [],
  'app.language_available': [],
  'app.meta_title': '',
  'app.meta_description': '',
};

export const useSettings = (): { settings: SettingsModel } => {
  const {
    query: { data, isLoading },
  } = useSettingsQuery();

  const settings = !isLoading && data ? data : SETTINGS_DEFAULT;

  return {
    settings,
  };
};
