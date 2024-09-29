import { useTranslation } from 'react-i18next';

import { ViewLayout } from '../../components';
import SettingsTabs from './SettingsTabs';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <ViewLayout meta={{ title: t('settings.title') }} title={t('settings.title')}>
      <SettingsTabs />
    </ViewLayout>
  );
};

export default Settings;
