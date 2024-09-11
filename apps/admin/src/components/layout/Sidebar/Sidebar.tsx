import { styled } from '@mui/material';
import Button from '@mui/material/Button';

import { useLayoutStore, useBreakpoint } from '../../../hooks';
import { SidebarNavigationPrimary, SidebarNavigationSecondary } from '../navigation';
import { SIDEBAR_DESKTOP_WIDTH, HEADER_DESKTOP_HEIGHT } from '../../../styles';

const SidebarWrapper = styled('aside', {
  shouldForwardProp: (propName) => propName !== 'isOpen' && propName !== 'isMobile',
})<{ readonly isOpen?: boolean; readonly isMobile?: boolean }>(({ isOpen, isMobile }) => {
  const mobileOverrides = isMobile
    ? {
        width: '100%',
        left: isOpen ? 0 : `-100%`,
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
  justifyContent: 'space-between',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  flexDirection: isMobile ? 'row-reverse' : 'row',
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
        Sidebar heading
        <Button onClick={sidebarToggle} size="small" variant="outlined">
          menu
        </Button>
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
