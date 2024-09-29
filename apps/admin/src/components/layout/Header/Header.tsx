import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';

import { useLayoutStore } from '../../../hooks';
import { HEADER_DESKTOP_HEIGHT } from '../../../styles';
import { LayoutContainer } from '../LayoutContainer';
import HeaderNotifications from './HeaderNotifications';
import HeaderUser from './HeaderUser';
import HeaderSearch from './HeaderSearch';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import HeaderLocales from './HeaderLocales';
import HeaderTheme from './HeaderTheme';

const HeaderWrapper = styled('header')(({ theme }) => ({
  width: '100%',
  flex: '0 0 auto',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: theme.palette.background.default,
}));

const HeaderContent = styled('div')(() => ({
  width: '100%',
  height: HEADER_DESKTOP_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Header = () => {
  const { sidebarOpen, sidebarToggle } = useLayoutStore();

  return (
    <HeaderWrapper>
      <LayoutContainer>
        <HeaderContent>
          <Stack alignItems="center" direction="row" gap={2} justifyContent="start">
            {!sidebarOpen && (
              <IconButton onClick={sidebarToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <HeaderBreadcrumbs />
          </Stack>
          <Stack direction="row" gap={2}>
            <HeaderSearch />
            <HeaderNotifications />
            <HeaderTheme />
            <HeaderLocales />
            <HeaderUser />
          </Stack>
        </HeaderContent>
      </LayoutContainer>
    </HeaderWrapper>
  );
};

export default Header;
