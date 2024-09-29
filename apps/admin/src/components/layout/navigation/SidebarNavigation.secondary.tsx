import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import List from '@mui/material/List';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

import config from '../../../../config';
import SidebarNavigationItem from './SidebarNavigationItem';

const NavigationWrapper = styled('nav')(() => ({
  width: '100%',
  paddingBottom: '1rem',
}));

const SidebarNavigationSecondary = () => {
  const { t } = useTranslation('modules');
  const { pathname } = useLocation();
  const { routes } = config;

  const navItems = [
    {
      key: 0,
      path: routes.users.path,
      label: t('users.label'),
      icon: <GroupIcon />,
    },
    {
      key: 1,
      path: routes.settings.path,
      label: t('settings.label'),
      icon: <SettingsIcon />,
    },
  ];

  return (
    <NavigationWrapper>
      <List disablePadding>
        {navItems.map(({ path, label, key, ...rest }) => (
          <SidebarNavigationItem key={key} selected={pathname.includes(path)} to={path} {...rest}>
            {label}
          </SidebarNavigationItem>
        ))}
      </List>
    </NavigationWrapper>
  );
};

export default SidebarNavigationSecondary;
