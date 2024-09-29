import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

import { FOOTER_HEIGHT } from '../../../styles';
import { LayoutContainer } from '../LayoutContainer';
import { useFooter } from './useFooter';

const FooterWrapper = styled('footer')(() => ({
  flex: '0 0 auto',
}));

const FooterContent = styled('div')(() => ({
  minHeight: FOOTER_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Footer = () => {
  const { cms, copyrightText } = useFooter();

  return (
    <FooterWrapper>
      <LayoutContainer>
        <FooterContent>
          <Typography variant="body2">
            {cms}&nbsp;|&nbsp;{copyrightText}
          </Typography>
        </FooterContent>
      </LayoutContainer>
    </FooterWrapper>
  );
};

export default Footer;
