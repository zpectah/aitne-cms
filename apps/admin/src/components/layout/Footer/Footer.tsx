import { styled } from '@mui/material';

import { FOOTER_HEIGHT } from '../../../styles';

const FooterWrapper = styled('footer')(() => ({
  minHeight: FOOTER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
}));

const Footer = () => {
  return <FooterWrapper>..Footer...</FooterWrapper>;
};

export default Footer;
