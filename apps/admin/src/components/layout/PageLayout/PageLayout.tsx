import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';

import { SIDEBAR_DESKTOP_WIDTH } from '../../../styles';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

const PageLayoutWrapper = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isMinimal',
})<{ readonly isMinimal?: boolean }>(({ isMinimal }) => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
}));

const PageLayoutContent = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isMinimal',
})<{ readonly isMinimal?: boolean }>(({ isMinimal }) => ({
  width: isMinimal ? '100%' : `calc(100% - ${SIDEBAR_DESKTOP_WIDTH})`,
  height: '100%',
  position: 'fixed',
  top: 0,
  left: isMinimal ? 0 : SIDEBAR_DESKTOP_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
}));

interface PageLayoutProps {
  isMinimal?: boolean;
}

const PageLayout = ({ isMinimal }: PageLayoutProps) => (
  <PageLayoutWrapper isMinimal={isMinimal}>
    {!isMinimal && <Sidebar />}
    <PageLayoutContent isMinimal={isMinimal}>
      {!isMinimal && <Header />}
      <Outlet />
      {!isMinimal && <Footer />}
    </PageLayoutContent>
  </PageLayoutWrapper>
);

export default PageLayout;
