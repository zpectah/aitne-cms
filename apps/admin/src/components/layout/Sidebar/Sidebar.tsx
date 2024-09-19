import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { useLayoutStore, useBreakpoint } from '../../../hooks';
import { SidebarNavigationPrimary, SidebarNavigationSecondary } from '../navigation';
import { SIDEBAR_DESKTOP_WIDTH, SIDEBAR_WIDTH_WIDTH, HEADER_DESKTOP_HEIGHT } from '../../../styles';

const SidebarWrapper = styled('aside', {
  shouldForwardProp: (propName) => propName !== 'isOpen' && propName !== 'isMobile',
})<{ readonly isOpen?: boolean; readonly isMobile?: boolean }>(({ isOpen, isMobile }) => {
  const mobileOverrides = isMobile
    ? {
        width: SIDEBAR_WIDTH_WIDTH,
        left: isOpen ? 0 : `calc(${SIDEBAR_WIDTH_WIDTH} * -1)`,
        backgroundColor: 'rgb(200,200,200)',
      }
    : {};

  return {
    width: isOpen ? SIDEBAR_DESKTOP_WIDTH : 0,
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: isOpen ? 'initial' : 'hidden',
    position: 'fixed',
    zIndex: 900,
    backgroundColor: 'rgba(25,25,25,0.125)',
    ...mobileOverrides,
  };
});

const SidebarHeading = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isMobile',
})<{ readonly isMobile?: boolean }>(({ isMobile }) => ({
  width: '100%',
  height: HEADER_DESKTOP_HEIGHT,
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: isMobile ? 'start' : 'space-between',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  flexDirection: isMobile ? 'row-reverse' : 'row',
  gap: 8,
}));

const SidebarContent = styled('div')(() => ({
  width: '100%',
  position: 'relative',
  overflow: 'auto',
  flex: '1 1 0',
}));

const SidebarFooter = styled('div')(() => ({
  width: '100%',
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Sidebar = () => {
  const { sidebarOpen, sidebarToggle } = useLayoutStore();
  const { isMobile } = useBreakpoint();

  return (
    <SidebarWrapper isMobile={isMobile} isOpen={sidebarOpen}>
      <SidebarHeading isMobile={isMobile}>
        <Typography component="h1" variant="h1">
          logo
        </Typography>
        <IconButton onClick={sidebarToggle}>
          <MenuOpenIcon />
        </IconButton>
      </SidebarHeading>
      <SidebarContent>
        <SidebarNavigationPrimary />
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavigationSecondary />
      </SidebarFooter>
    </SidebarWrapper>
  );
};

export default Sidebar;
