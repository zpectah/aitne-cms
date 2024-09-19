import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';

import { useLayoutStore, useBreakpoint } from '../../../hooks';
import { SIDEBAR_DESKTOP_WIDTH, SIDEBAR_WIDTH_WIDTH } from '../../../styles';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from '../Sidebar';

const PageLayoutWrapper = styled('div')({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
});

const PageLayoutContent = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isMinimal' && propName !== 'isOpen' && propName !== 'isMobile',
})<{ readonly isMinimal?: boolean; readonly isOpen?: boolean; readonly isMobile?: boolean }>(
  ({ isMinimal, isOpen, isMobile }) => {
    const mobileOverrides = isMobile
      ? {
          width: '100%',
          left: 0,
        }
      : {};

    return {
      width: isMinimal || !isOpen ? SIDEBAR_WIDTH_WIDTH : `calc(100% - ${SIDEBAR_DESKTOP_WIDTH})`,
      height: '100%',
      position: 'fixed',
      top: 0,
      left: isMinimal || !isOpen ? 0 : SIDEBAR_DESKTOP_WIDTH,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      ...mobileOverrides,
    };
  }
);

interface PageLayoutProps {
  isMinimal?: boolean;
}

const PageLayout = ({ isMinimal }: PageLayoutProps) => {
  const { sidebarOpen } = useLayoutStore();
  const { isMobile } = useBreakpoint();

  return (
    <PageLayoutWrapper>
      {!isMinimal && <Sidebar />}
      <PageLayoutContent isMinimal={isMinimal} isMobile={isMobile} isOpen={sidebarOpen}>
        {!isMinimal && <Header />}
        <Outlet />
        {!isMinimal && <Footer />}
      </PageLayoutContent>
    </PageLayoutWrapper>
  );
};

export default PageLayout;
