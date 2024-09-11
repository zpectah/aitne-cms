import { styled } from '@mui/material';

import { FOOTER_HEIGHT } from '../../../styles';
import { LayoutContainer } from '../LayoutContainer';

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
    <LayoutContainer>
      <FooterContent>..Footer...</FooterContent>
    </LayoutContainer>
  </FooterWrapper>
);

export default Footer;
