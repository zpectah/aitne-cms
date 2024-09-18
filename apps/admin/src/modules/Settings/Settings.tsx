import { useTranslation } from 'react-i18next';

import { ViewLayout } from '../../components';
import SettingsTabs from './SettingsTabs';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <ViewLayout meta={{ title: t('page.settings') }} title={t('page.settings')}>
      <SettingsTabs />
    </ViewLayout>
  );
};

export default Settings;
