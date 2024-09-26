import { styled, SxProps } from '@mui/material';
import Container, { ContainerProps } from '@mui/material/Container';

import { WithChildren } from '@common';

const PreloaderWrapper = styled('div')(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PreloaderContent = styled('div')(() => ({}));

export interface PreloaderBaseProps extends WithChildren {
  type?: string; // TODO
  containerProps?: Partial<ContainerProps>;
  wrapperSx?: SxProps;
  contentSx?: SxProps;
}

const PreloaderBase = ({ children, type, containerProps, wrapperSx, contentSx }: PreloaderBaseProps) => (
  <PreloaderWrapper sx={wrapperSx}>
    <PreloaderContent sx={contentSx}>
      <Container maxWidth="md" {...containerProps}>
        {children}
      </Container>
    </PreloaderContent>
  </PreloaderWrapper>
);

export default PreloaderBase;
