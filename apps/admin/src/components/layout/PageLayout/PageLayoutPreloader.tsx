import Container from '@mui/material/Container';
import { styled } from '@mui/material';

const PreloaderWrapper = styled('div')(() => ({}));
const PreloaderContainer = styled('div')(() => ({}));

const PageLayoutPreloader = () => (
  <PreloaderWrapper>
    <Container>
      <PreloaderContainer>...preloader...</PreloaderContainer>
    </Container>
  </PreloaderWrapper>
);

export default PageLayoutPreloader;
