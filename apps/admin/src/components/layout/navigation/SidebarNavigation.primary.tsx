import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material';
import List from '@mui/material/List';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import TagIcon from '@mui/icons-material/Tag';
import CategoryIcon from '@mui/icons-material/Category';
import TranslateIcon from '@mui/icons-material/Translate';

import config from '../../../../config';
import SidebarNavigationItem from './SidebarNavigationItem';

const NavigationWrapper = styled('nav')(() => ({
  width: '100%',
}));

const SidebarNavigationPrimary = () => {
  const { pathname } = useLocation();
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
      label: 'Articles',
      icon: <ArticleIcon />,
    },
    {
      key: 2,
      path: routes.tags.path,
      label: 'Tags',
      icon: <TagIcon />,
    },
    {
      key: 3,
      path: routes.categories.path,
      label: 'Categories',
      icon: <CategoryIcon />,
    },
    {
      key: 4,
      path: routes.translations.path,
      label: 'Translations',
      icon: <TranslateIcon />,
    },
    {
      key: 100,
      path: routes.login.path,
      label: 'Login *',
      icon: <QuestionMarkIcon />,
    },
    {
      key: 101,
      path: routes.passwordRecovery.path,
      label: 'Password recovery *',
      icon: <QuestionMarkIcon />,
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

export default SidebarNavigationPrimary;
