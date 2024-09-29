import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import config from '../../../config';
import SettingsPanelGlobal from './SettingsPanel.global';
import SettingsPanelSystem from './SettingsPanel.system';
import SettingsPanelLocales from './SettingsPanel.locales';
import SettingsMaintenance from './SettingsPanel.maintenance';

const TABS_PANEL_PFX = 'settings-panel-';
const TABS_TAB_PFX = 'settings-tab-';

const SettingsTabs = () => {
  const [selectedPanel, setSelectedPanel] = useState('');
  const { panel } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'modules']);

  const renderPanel = useMemo(() => {
    switch (selectedPanel) {
      case 'system':
        return (
          <Box aria-labelledby={`${TABS_TAB_PFX}system`} id={`${TABS_PANEL_PFX}system`} role="tabpanel">
            <SettingsPanelSystem />
          </Box>
        );
      case 'locales':
        return (
          <Box aria-labelledby={`${TABS_TAB_PFX}locales`} id={`${TABS_PANEL_PFX}locales`} role="tabpanel">
            <SettingsPanelLocales />
          </Box>
        );
      case 'maintenance':
        return (
          <Box aria-labelledby={`${TABS_TAB_PFX}maintenance`} id={`${TABS_PANEL_PFX}maintenance`} role="tabpanel">
            <SettingsMaintenance />
          </Box>
        );
      case '':
      default:
        return (
          <Box aria-labelledby={`${TABS_TAB_PFX}global`} id={`${TABS_PANEL_PFX}global`} role="tabpanel">
            <SettingsPanelGlobal />
          </Box>
        );
    }
  }, [selectedPanel]);

  useEffect(() => setSelectedPanel(panel ?? ''), [panel]);

  return (
    <Box>
      <Box>
        <Tabs value={selectedPanel}>
          <Tab
            aria-controls={`${TABS_PANEL_PFX}global`}
            id={`${TABS_TAB_PFX}global`}
            label={t('modules:settings.panel.global')}
            onClick={() => navigate(config.routes.settings.path)}
            value=""
          />
          <Tab
            aria-controls={`${TABS_PANEL_PFX}system`}
            id={`${TABS_TAB_PFX}system`}
            label={t('modules:settings.panel.system')}
            onClick={() => navigate(config.routes.settings.routes.system.path)}
            value="system"
          />
          <Tab
            aria-controls={`${TABS_PANEL_PFX}locales`}
            id={`${TABS_TAB_PFX}locales`}
            label={t('modules:settings.panel.locales')}
            onClick={() => navigate(config.routes.settings.routes.locales.path)}
            value="locales"
          />
          <Tab
            aria-controls={`${TABS_PANEL_PFX}maintenance`}
            id={`${TABS_TAB_PFX}maintenance`}
            label={t('modules:settings.panel.maintenance')}
            onClick={() => navigate(config.routes.settings.routes.maintenance.path)}
            value="maintenance"
          />
        </Tabs>
      </Box>
      {renderPanel}
    </Box>
  );
};

export default SettingsTabs;
