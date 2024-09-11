import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { WithChildren } from '@common';

const ViewLayoutWrapper = styled('div', {
  shouldForwardProp: (propName) => propName !== 'isCentered',
})<{ readonly isCentered?: boolean }>(({ isCentered }) => ({
  width: '100%',
  flex: '1 1 auto',

  display: 'flex',
  flexDirection: 'column',
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
      <Container>
        <Stack>
          <ViewLayoutContent>{children}</ViewLayoutContent>
        </Stack>
      </Container>
    </ViewLayoutWrapper>
  );
};

export default ViewLayout;
