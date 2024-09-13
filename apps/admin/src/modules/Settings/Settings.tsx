import { ViewLayout } from '../../components';
import SettingsGlobal from './Settings.global';
import SettingsSystem from './Settings.system';
import SettingsLocales from './Settings.locales';
import SettingsMaintenance from './System.maintenance';

const Settings = () => {
  console.log('page view: Settings');

  return (
    <ViewLayout meta={{ title: 'Settings' }} title="Settings">
      <SettingsGlobal />
      <SettingsSystem />
      <SettingsLocales />
      <SettingsMaintenance />
    </ViewLayout>
  );
};

export default Settings;
