import { ReactNode, useEffect } from 'react';
import { styled } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { WithChildren } from '@common';
import config from '../../../../config';
import { LayoutContainer, LayoutContainerProps } from '../LayoutContainer';

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
  titleSlot?: ReactNode;
  layoutContainerProps?: Partial<LayoutContainerProps>;
  layoutStackProps?: StackProps;
}

const ViewLayout = ({
  children,
  isCentered,
  meta,
  title,
  titleSlot,
  layoutContainerProps,
  layoutStackProps,
}: ViewLayoutProps) => {
  useEffect(() => {
    if (meta?.title) {
      document.title = `${meta.disableTitlePrefix ? '' : `${config.cms.meta.name} | `}${meta.title}`;
    }
  }, [meta]);

  return (
    <ViewLayoutWrapper isCentered={isCentered}>
      <LayoutContainer {...layoutContainerProps}>
        <Stack gap={2} {...layoutStackProps}>
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            {title && <Typography variant="h2">{title}</Typography>}
            {titleSlot && titleSlot}
          </Stack>
          <ViewLayoutContent>
            <Stack gap={2}>{children}</Stack>
          </ViewLayoutContent>
        </Stack>
      </LayoutContainer>
    </ViewLayoutWrapper>
  );
};

export default ViewLayout;
