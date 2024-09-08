import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';

import { Header } from '../Header';
import { Footer } from '../Footer';

const PageLayoutWrapper = styled('div')(() => ({}));
const PageLayoutContent = styled('div')(() => ({}));

interface PageLayoutProps {
  withoutHeader?: boolean;
  withoutFooter?: boolean;
}

const PageLayout = ({ withoutHeader, withoutFooter }: PageLayoutProps) => (
  <PageLayoutWrapper>
    {!withoutHeader && <Header />}
    <PageLayoutContent>
      <Outlet />
      {!withoutFooter && <Footer />}
    </PageLayoutContent>
  </PageLayoutWrapper>
);

export default PageLayout;
