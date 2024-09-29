import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useFooter } from './useFooter';

const FooterWrapper = styled('footer')(() => ({}));

const MiniFooter = () => {
  const { cms } = useFooter();

  return (
    <FooterWrapper>
      <Typography variant="body2">{cms}</Typography>
    </FooterWrapper>
  );
};

export default MiniFooter;
