import { styled } from '@mui/material';
import Container from '@mui/material/Container';

import { FOOTER_HEIGHT } from '../../../styles';

const FooterWrapper = styled('footer')(() => ({
  flex: '0 0 auto',
}));

const FooterContent = styled('div')(() => ({
  minHeight: FOOTER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Footer = () => (
  <FooterWrapper>
    <Container>
      <FooterContent>..Footer...</FooterContent>
    </Container>
  </FooterWrapper>
);

export default Footer;
