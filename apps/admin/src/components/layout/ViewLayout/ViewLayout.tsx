import { ReactNode, useEffect } from 'react';
import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { WithChildren } from '@common';
import config from '../../../../config';
import { LayoutContainer } from '../LayoutContainer';

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

const ViewLayoutContent = styled('main')(() => ({}));

interface ViewLayoutProps extends WithChildren {
  isCentered?: boolean;
  meta?: {
    title?: string;
    disableTitlePrefix?: boolean;
  };
  title?: ReactNode;
}

const ViewLayout = ({ children, isCentered, meta, title }: ViewLayoutProps) => {
  useEffect(() => {
    if (meta?.title) {
      document.title = `${meta.disableTitlePrefix ? '' : `${config.cms.meta.name} | `}${meta.title}`;
    }
  }, [meta]);

  return (
    <ViewLayoutWrapper isCentered={isCentered}>
      <LayoutContainer>
        <Stack>
          {title && <Typography variant="h2">{title}</Typography>}
          <ViewLayoutContent>{children}</ViewLayoutContent>
        </Stack>
      </LayoutContainer>
    </ViewLayoutWrapper>
  );
};

export default ViewLayout;
