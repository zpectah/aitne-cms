import { styled } from '@mui/material';

import { SidebarNavigation } from '../navigation';
import { SIDEBAR_DESKTOP_WIDTH, HEADER_DESKTOP_HEIGHT } from '../../../styles';

const SidebarWrapper = styled('aside')(() => ({
  width: SIDEBAR_DESKTOP_WIDTH,
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',

  backgroundColor: 'rgba(25,25,25,0.125)',
}));

const SidebarHeading = styled('div')(() => ({
  width: '100%',
  height: HEADER_DESKTOP_HEIGHT,
  flex: '0 0 auto',
}));

const SidebarContent = styled('div')(() => ({
  position: 'relative',
  overflow: 'auto',
  flex: '1 1 0',
}));

const Sidebar = () => (
  <SidebarWrapper>
    <SidebarHeading>Sidebar heading</SidebarHeading>
    <SidebarContent>
      <SidebarNavigation />
    </SidebarContent>
  </SidebarWrapper>
);

export default Sidebar;
