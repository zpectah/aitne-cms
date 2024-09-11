import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

import config from '../../../../config';

const NavigationWrapper = styled('nav')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const NavigationItem = styled(Link)(() => ({
  width: '100%',
  display: 'flex',
}));

const SidebarNavigation = () => {
  const { routes } = config;

  return (
    <NavigationWrapper>
      <NavigationItem to={routes.dashboard.path}>Home</NavigationItem>
      <NavigationItem to={routes.articles.path}>Articles</NavigationItem>
      <NavigationItem to={routes.login.path}>Login</NavigationItem>
      <NavigationItem to={routes.passwordRecovery.path}>Password recovery</NavigationItem>
    </NavigationWrapper>
  );
};

export default SidebarNavigation;
