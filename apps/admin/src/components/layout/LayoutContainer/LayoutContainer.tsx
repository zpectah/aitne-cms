import Container, { ContainerProps } from '@mui/material/Container';

import { WithChildren } from '@common';

interface LayoutContainerProps extends WithChildren {
  containerProps?: Partial<Omit<ContainerProps, 'children'>>;
}

const LayoutContainer = ({ children, containerProps }: LayoutContainerProps) => (
  <Container maxWidth="xl" {...containerProps}>
    {children}
  </Container>
);

export default LayoutContainer;
