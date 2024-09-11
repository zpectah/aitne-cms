import { styled } from '@mui/material';
import { WithChildren } from '@common';

const ViewLayoutWrapper = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isCentered',
})<{ readonly isCentered?: boolean }>(({ isCentered }) => ({
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',

  alignItems: isCentered ? 'center' : 'initial',
  justifyContent: isCentered ? 'center' : 'initial',
}));

const ViewLayoutContent = styled('main')(() => ({
  // flex: '1 1 auto',
}));

interface ViewLayoutProps extends WithChildren {
  isCentered?: boolean;
  meta?: {
    title?: string;
    description?: string;
  };
}

const ViewLayout = ({ children, isCentered, meta = {} }: ViewLayoutProps) => {
  // TODO - meta ...

  return (
    <ViewLayoutWrapper isCentered={isCentered}>
      <ViewLayoutContent>{children}</ViewLayoutContent>
    </ViewLayoutWrapper>
  );
};

export default ViewLayout;
