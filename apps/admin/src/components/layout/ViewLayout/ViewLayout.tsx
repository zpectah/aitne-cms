import { styled } from '@mui/material';
import { WithChildren } from '@common';
import { Sidebar } from '../Sidebar';

const ViewLayoutWrapper = styled('div')(() => ({}));
const ViewLayoutContent = styled('main')(() => ({}));

interface ViewLayoutProps extends WithChildren {
  withoutSidebar?: boolean;
  isCentered?: boolean;
  meta?: {
    title?: string;
    description?: string;
  };
}

const ViewLayout = ({ children, withoutSidebar, isCentered, meta = {} }: ViewLayoutProps) => (
  <ViewLayoutWrapper>
    {!withoutSidebar && <Sidebar />}
    <ViewLayoutContent>{children}</ViewLayoutContent>
  </ViewLayoutWrapper>
);

export default ViewLayout;
