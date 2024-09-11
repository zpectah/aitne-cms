import { styled } from '@mui/material';
import List from '@mui/material/List';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

import config from '../../../../config';
import SidebarNavigationItem from './SidebarNavigationItem';

const NavigationWrapper = styled('nav')(() => ({
  width: '100%',
}));

const SidebarNavigationPrimary = () => {
  const { routes } = config;

  const navItems = [
    {
      key: 0,
      path: routes.dashboard.path,
      label: 'Home',
      icon: <HomeIcon />,
    },
    {
      key: 1,
      path: routes.articles.path,
      label: 'Article',
      icon: <ArticleIcon />,
    },
    {
      key: 2,
      path: routes.login.path,
      label: 'Login *',
      icon: <QuestionMarkIcon />,
    },
    {
      key: 3,
      path: routes.passwordRecovery.path,
      label: 'Password recovery *',
      icon: <QuestionMarkIcon />,
    },
  ];

  return (
    <NavigationWrapper>
      <List disablePadding>
        {navItems.map(({ path, label, key, ...rest }) => (
          <SidebarNavigationItem key={key} to={path} {...rest}>
            {label}
          </SidebarNavigationItem>
        ))}
      </List>
    </NavigationWrapper>
  );
};

export default SidebarNavigationPrimary;
